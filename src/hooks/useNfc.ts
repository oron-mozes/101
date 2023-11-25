import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";
import { NfcTransferStatus, useNfcStore } from "../store/nfc.store";
import { HCESession, NFCTagType4, NFCTagType4NDEFContentType } from "dorch-hce";
import { polyfill } from "react-native-polyfill-globals/src/encoding";
import { usePatientRecordsStore } from "../store/patients.record.store";

polyfill();

export function useNfc() {
  const { setTransferStatus } = useNfcStore();
  const { addPatient } = usePatientRecordsStore();

  async function readTag() {
    polyfill();

    NfcManager.setEventListener(NfcEvents.DiscoverTag, () => {
      console.log("READING STARTED")
    });

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
      console.log("DECODED", typeof decodedString);

      const parsedData = JSON.parse(JSON.parse(JSON.stringify(decodedString)));
      console.log("PARSED DATA", typeof parsedData);

      console.log("PATIENT", parsedData["records"][0])
      addPatient(parsedData["records"][0]);

      console.log("READING SUCCESSFULL")
      setTransferStatus(NfcTransferStatus.Success({ result: '' }));
    } catch (error) {
      console.log("READING FAILED", error);
      setTransferStatus(NfcTransferStatus.Error({ errorMessage: JSON.stringify(error) }));
    } finally {
      NfcManager.cancelTechnologyRequest();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      console.log("READING PROCESS CLOSED");
    };
  };

  async function writeNdef(content: string) {
    console.log("WRITING CONTENT", content);
    let session: HCESession;
    const tag = new NFCTagType4({
      type: NFCTagType4NDEFContentType.Text,
      writable: false,
      content,
    });

    try {
      session = await HCESession.getInstance();
      session.setApplication(tag);
      await session.setEnabled(true);

      const removeConnectionListener = session.on(HCESession.Events.HCE_STATE_CONNECTED, () => {
        console.log("WRITING CONNECTED");
        setTransferStatus(NfcTransferStatus.Loading());
      });

      const removeReadListener = session.on(HCESession.Events.HCE_STATE_READ, (data) => {
        // console.log("WRITING SUCCESSFULL", { data });
      });

      removeReadListener();
      removeConnectionListener();
    } catch (error) {
      console.log("WRITING FAILED", error);
      setTransferStatus(NfcTransferStatus.Error({ errorMessage: JSON.stringify(error) }));
    }
  };

  return { readTag, writeNdef };
};
