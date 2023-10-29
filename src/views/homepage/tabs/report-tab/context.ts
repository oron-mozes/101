import { createContext } from "react";
import { emptyPatient } from ".";
import { IPatientRecord, ICareProvider } from "../../../../interfaces";

export default createContext<{
  patient: IPatientRecord;
  update(value: Partial<IPatientRecord>): void;
  providers: ICareProvider[];
}>({
  patient: emptyPatient,
  update: (value: Partial<IPatientRecord>) => {},
  providers: [],
});