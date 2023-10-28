import { createContext } from "react";
import { emptyPatient } from ".";
import { IPatientRecord, ICareProvider } from "../../../../interfaces";

export default createContext({
  patient: emptyPatient,
  update: (value: Partial<IPatientRecord>) => {},
  provider: { idf_id: null },
});
