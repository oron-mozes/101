import { useEffect, useState } from "react";
import storage, { STORAGE } from "../../storage";
import { ROUTES } from "../routes";
import { initialState } from "../views/user";
import { IPatientRecord } from "../views/patient";

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
