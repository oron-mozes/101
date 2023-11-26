import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";
import { NfcTransferStatus, useNfcStore } from "../store/nfc.store";
import {
  HCESession,
  HCESessionContext,
  NFCTagType4,
  NFCTagType4NDEFContentType,
} from "dorch-hce";
import { polyfill } from "react-native-polyfill-globals/src/encoding";
import { usePatientRecordsStore } from "../store/patients.record.store";
import { decompress } from "compress-json";
import { useContext, useEffect } from "react";

polyfill();
NfcManager.start();
export function useNfc() {
  const { session } = useContext(HCESessionContext);

  const { setTransferStatus, closeNfcDialog } = useNfcStore();
  const { addPatient } = usePatientRecordsStore();
  const close = async () => {
    await Promise.all([
      NfcManager.unregisterTagEvent(),
      NfcManager.cancelTechnologyRequest(),
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null),
      session.setEnabled(false),
    ]);
  };
  async function readTag() {
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

      const parsedData = decompress(
        JSON.parse(JSON.parse(JSON.stringify(decodedString)))
      );

      await Promise.all([
        parsedData.records.map((patient) =>
          addPatient({ ...patient, new: true })
        ),
      ]);

      setTransferStatus(NfcTransferStatus.Success({ result: "" }));
    } catch (error) {
      console.log("READING FAILED", { error });
      setTransferStatus(
        NfcTransferStatus.Error({ errorMessage: JSON.stringify(error) })
      );
    } finally {
      await close();
    }
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
      console.log("WRITING FAILED", error);
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
  return { readTag, writeNdef, close };
}
