import { useState } from "react";
import storage, { STORAGE } from "../../storage";
import { IPatientRecord } from "../interfaces";

export function usePatientsRecord() {
  const [patientsRecord, setPatients] = useState<IPatientRecord[]>([]);

  const loadRecords = () => {
    storage
      .getAllDataForKey(STORAGE.PATIENTS_RECORD)
      .then((data) => {
        setPatients(data);
      })
      .catch(() => {});
  };

  return { patientsRecord, loadRecords };
}
