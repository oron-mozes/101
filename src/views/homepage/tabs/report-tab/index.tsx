import { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import storage, { STORAGE } from "../../../../../storage";
import { IPatientRecord, STATUS } from "../../../../interfaces";
import Context from "./context";
import { Avpu } from "./create-components/avpu";
import { ESection } from "./create-components/e-section";
import { InjuryReason } from "./create-components/injury-reason";
import { PatientDetails } from "./create-components/patient-details";
import { Prognosis } from "./create-components/prognosis";
import { ASection } from "./create-components/a-section";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

export const emptyPatient: IPatientRecord = {
  personal_information: {
    full_name: "",
    idf_id: 0,
  },
  incident_information: {
    injury_time: new Date().getTime(),
    care_time: new Date().getTime(),
    date: new Date().getTime(),
    status: STATUS.ACTIVE,
  },
  care_team: [],
  injuries: [],
  e: [],
  airway: [],
  consciousness: [],
  injuryReason: {
    reasons: [],
    circumstance: null,
  },
  prognosis: null,
};
export function ReportTab({ patient }: { patient?: IPatientRecord }) {
  const [patientRecord, setPatientRecord] = useState<IPatientRecord>(
    patient || emptyPatient
  );
  const id = useMemo(() => new Date().getTime().toString(), []);

  return (
    <AutocompleteDropdownContextProvider>
      <Context.Provider
        value={{
          patient: patientRecord,
          update: (value) => {
            const selectedId = patientRecord.id || id;

            const updateData: IPatientRecord = {
              ...patientRecord,
              ...value,
              id: selectedId,
            };

            setPatientRecord(updateData);
            storage.save({
              key: STORAGE.PATIENTS_RECORD,
              id: selectedId,
              data: updateData,
            });
          },
        }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <PatientDetails />
          <Avpu />
          <ASection />
          <ESection />
          <InjuryReason />
          <Prognosis />
        </ScrollView>
      </Context.Provider>
    </AutocompleteDropdownContextProvider>
  );
}
