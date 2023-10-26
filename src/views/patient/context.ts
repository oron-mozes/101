import { Dispatch, SetStateAction, createContext } from "react";
import { IPatientRecord, emptyPatient } from ".";

export default createContext({
  patient: emptyPatient,
  update: (value: Partial<IPatientRecord>) => {},
});
