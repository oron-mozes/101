import { decompress } from "compress-json";
import {
  HCESession,
  HCESessionContext,
  NFCTagType4,
  NFCTagType4NDEFContentType,
} from "dorch-hce";
import { useContext, useEffect } from "react";
import NfcManager, { Ndef, NfcEvents, NfcTech } from "react-native-nfc-manager";
import { polyfill } from "react-native-polyfill-globals/src/encoding";
import { NfcTransferStatus, useNfcStore } from "../store/nfc.store";

polyfill();
NfcManager.start();
export function useNfc() {
  const { session } = useContext(HCESessionContext);

  const { setTransferStatus, closeNfcDialog } = useNfcStore();
  const close = async () => {
    await Promise.all([
      NfcManager.unregisterTagEvent(),
      NfcManager.cancelTechnologyRequest(),
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null),
      session.setEnabled(false),
    ]);
  };
  async function readTag(callback: (data) => void) {
    if ((await NfcManager.isSupported()) === false) {
      setTransferStatus(
        NfcTransferStatus.Error({
          errorMessage: "NFC is not supported on this device",
        })
      );
      return;
    }

    if ((await NfcManager.isEnabled()) === false) {
      NfcManager.goToNfcSetting();
      close();
      closeNfcDialog();
      return;
    }

    try {
      await NfcManager.registerTagEvent();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        setTransferStatus(NfcTransferStatus.Loading());
      });

      await NfcManager.requestTechnology([
        NfcTech.Ndef,
        NfcTech.NfcA,
        NfcTech.IsoDep,
      ]);

      const tag = await NfcManager.getTag();

      const buffer = new Uint8Array(tag.ndefMessage[0].payload);
      const textDecoder = new TextDecoder("utf-8");
      const decodedString = textDecoder.decode(buffer).substring(3);
      //how can I use crypto with old apps?
      const parsedData = decompress(
        JSON.parse(JSON.parse(JSON.stringify(decodedString)))
      );

      callback(parsedData);

      setTransferStatus(NfcTransferStatus.Success({ result: "" }));
    } catch (error) {
      setTransferStatus(
        NfcTransferStatus.Error({ errorMessage: JSON.stringify(error) })
      );
    } finally {
      await close();
    }
  }
  async function writeNdefToCard(content: string, cb) {
    if ((await NfcManager.isSupported()) === false) {
      setTransferStatus(
        NfcTransferStatus.Error({
          errorMessage: "NFC is not supported on this device",
        })
      );
      return;
    }

    if ((await NfcManager.isEnabled()) === false) {
      NfcManager.goToNfcSetting();
      close();
      closeNfcDialog();
      return;
    }

    NfcManager.requestTechnology(NfcTech.Ndef)
      .then(async () => {
        const bgTag = await NfcManager.getTag();

        const bytes = Ndef.encodeMessage([
          Ndef.textRecord(content, "en", "utf-8"),
        ]);

        NfcManager.ndefHandler
          .writeNdefMessage(bytes)
          .then((data) => {
            setTransferStatus(NfcTransferStatus.Success({ result: "" }));
            cb();
          })
          .catch((err) => {
            close();
          });
      })
      .catch((err) => {
        close();
      });
  }
  const writeNdef = async (content: string, onComplete) => {
    try {
      const tag = new NFCTagType4({
        type: NFCTagType4NDEFContentType.Text,
        writable: false,
        content,
      });

      await session.setApplication(tag);
      await session.setEnabled(true);

      session.on(HCESession.Events.HCE_STATE_CONNECTED, () => {
        setTransferStatus(NfcTransferStatus.Loading());
      });

      session.on(HCESession.Events.HCE_STATE_DISCONNECTED, () => {
        onComplete();
      });
    } catch (error) {
      setTransferStatus(
        NfcTransferStatus.Error({ errorMessage: JSON.stringify(error) })
      );
    }
  };

  useEffect(() => {
    return () => {
      close();
    };
  }, []);
  return { readTag, writeNdef, close, writeNdefToCard };
}
