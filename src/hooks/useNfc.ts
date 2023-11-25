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
  useEffect(() => {
    NfcManager.start();
  }, []);

  const close = async () => {
    NfcManager.cancelTechnologyRequest();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    await session?.setEnabled(false);
    closeNfcDialog();
  };
  async function readTag() {
    polyfill();
    try {
      await NfcManager.requestTechnology([
        NfcTech.IsoDep,
        NfcTech.NfcA,
        NfcTech.Ndef,
      ]);

      const tag = await NfcManager.getTag();
      console.log("TAG", JSON.stringify(tag));

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
      console.log("READING FAILED", error);
      setTransferStatus(
        NfcTransferStatus.Error({ errorMessage: JSON.stringify(error) })
      );
    } finally {
      close();
    }
  }

  const writeNdef = async (content: string) => {
    try {
      const tag = new NFCTagType4({
        type: NFCTagType4NDEFContentType.Text,
        writable: false,
        content,
      });
      session = await HCESession.getInstance();
      session.setApplication(tag);
      await session.setEnabled(true);

      session.on(HCESession.Events.HCE_STATE_CONNECTED, () => {
        setTransferStatus(NfcTransferStatus.Loading());
      });

      session.on(HCESession.Events.HCE_STATE_DISCONNECTED, (...args) => {
        close();
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
