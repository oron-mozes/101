import { useState } from "react";
import { ToastAndroid } from "react-native";
import { HCESession, NFCTagType4, NFCTagType4NDEFContentType } from "dorch-hce";
import { usePatientRecordsStore } from "../store/patients.record.store";

export function useNFCSender() {
  const [logsWrite, addLog] = useState<string>();
  let session;

  const patients = usePatientRecordsStore((state) => state.patients);

  async function writeNdef(ids: string[]) {
    const records = patients.filter((p) =>
      ids.includes(p.personal_information.patientId)
    );
    console.log({ records: records.length, ids });
    ToastAndroid.show("Write", 1000);
    const tag = new NFCTagType4({
      type: NFCTagType4NDEFContentType.Text,
      content: JSON.stringify({ records }),
      writable: false,
    });
    session = await HCESession.getInstance();
    session.setApplication(tag);
    await session.setEnabled(true);
    session.on(HCESession.Events.HCE_STATE_READ, () => {
      ToastAndroid.show("The tag has been read! Thank You.", ToastAndroid.LONG);
    });
  }
  return { writeNdef, logsWrite };
}
