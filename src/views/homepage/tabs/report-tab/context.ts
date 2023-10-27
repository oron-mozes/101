import { createContext } from "react";
import { emptyPatient } from ".";
import { IPatientRecord } from "../../interfaces";

export default createContext({
  patient: emptyPatient,
  update: (value: Partial<IPatientRecord>) => {},
});
