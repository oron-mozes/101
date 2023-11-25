import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";
import { NfcTransferStatus, useNfcStore } from "../store/nfc.store";
import { HCESession, NFCTagType4, NFCTagType4NDEFContentType } from "dorch-hce";
import { polyfill } from "react-native-polyfill-globals/src/encoding";
import { usePatientRecordsStore } from "../store/patients.record.store";
import { decompress } from "compress-json";
import { useEffect } from "react";

polyfill();

export function useNfc() {
  const { setTransferStatus, closeNfcDialog } = useNfcStore();
  const { addPatient } = usePatientRecordsStore();
  let session: HCESession;

  const close = async () => {
    NfcManager.cancelTechnologyRequest();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    await session?.setEnabled(false);
    setTimeout(() => closeNfcDialog(), 2000);
  };
  async function readTag() {
    polyfill();

    try {
      const well = await NfcManager.isEnabled();
      console.log("WELL", well);
      await NfcManager.start();

      await NfcManager.registerTagEvent();

      await NfcManager.requestTechnology([
        NfcTech.IsoDep,
        NfcTech.NfcA,
        NfcTech.Ndef,
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
    console.log("WRITE NDEF");
    if (!session) {
      console.log("INIT");
      await init();
    }
    try {
      const tag = new NFCTagType4({
        type: NFCTagType4NDEFContentType.Text,
        writable: false,
        content,
      });
      console.log("session NDEF", session.enabled, content);
      await session?.setEnabled(true);
      await session?.setApplication(tag);

      console.log("session NDEF");
      session.on(HCESession.Events.HCE_STATE_UPDATE_APPLICATION, () => {
        // setTransferStatus(NfcTransferStatus.Loading());
        console.log("HCE_STATE_UPDATE_APPLICATION");
      });

      session.on(HCESession.Events.HCE_STATE_DISCONNECTED, () => {
        onComplete();
        close();
      });
    } catch (error) {
      console.log("WRITING FAILED", error);
      setTransferStatus(
        NfcTransferStatus.Error({ errorMessage: JSON.stringify(error) })
      );
    }
  };

  const init = async () => {
    session = await HCESession.getInstance();
  };
  useEffect(() => {
    return () => {
      close();
    };
  }, []);
  return { readTag, writeNdef, close };
}
