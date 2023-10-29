import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import storage, { STORAGE } from "../../../../../storage";
import {
  EReactionEyes,
  EReactionMovement,
  EReactionSpeech,
  ICareProvider,
  IPatientRecord
} from "../../../../interfaces";
import Context from "./context";
import { ASection } from "./create-components/a-section";
import { Avpu } from "./create-components/avpu";
import { BSection } from "./create-components/b-section";
import { CSection } from "./create-components/c-section";
import { CareProvider } from "./create-components/care-provider";
import { DSection } from "./create-components/d-section";
import { ESection } from "./create-components/e-section";
import { Evacuation } from "./create-components/evacuation";
import { InjuryReason } from "./create-components/injury-reason";
import { MedicationsAndFluidSection } from "./create-components/medication";
import { PatientBodyPicker } from "./create-components/patient-body-picker";
import { PatientDetails } from "./create-components/patient-details";
import { Prognosis } from "./create-components/prognosis";

export const emptyPatient: IPatientRecord = {
  personal_information: {
    full_name: null,
    idf_id: null,
  },
  incident_information: {
    injury_time: null,
    care_time: null,
    date: null,
  },
  provider: { full_name: null, idf_id: null },
  injuries: [],
  eSection: [],
  airway: {
    actions: [],
    fulfill: null,
  },
  breathing: {
    actions: [],
    breathingCount: null,
    saturation: null,
    fulfill: null,
  },
  consciousness: [],
  injuryReason: {
    reasons: [],
    circumstance: null,
  },
  prognosis: null,
  measurements: {
    fulfill: null,
    shock: null,
    actions: [],
    palpated: null,
    puls: null,
    bloodPressure: {
      diastolic: null,
      systolic: null,
    },
  },
  reaction: {
    general: [],
    eyes: EReactionEyes.NONE,
    speech: EReactionSpeech.NONE,
    movement: EReactionMovement.NONE,
    GCS: null,
  },
  medicationsAndFluids: {
    actions: [
      {
        action: null,
        dose: null,
        time: null,
      },
    ],
  },

  evacuation: {
    status: null,
    time: null,
    transportation: null,
    destination: null,
  },
};
export function ReportTab({ patient }: { patient?: IPatientRecord }) {
  const [patientRecord, setPatientRecord] = useState<IPatientRecord>(
    patient || emptyPatient
  );

  const [providers, setProviders] = useState<ICareProvider[]>();
  const id = useMemo(() => new Date().getTime().toString(), []);
  useEffect(() => {
    storage
      .load({ key: STORAGE.TAAGAD })
      .then((data) => {
        setProviders(data.care_providers);
      })
      .catch(() => {});
  }, []);

  if (!providers && !patientRecord) {
    return <View></View>;
  }
  return (
    <AutocompleteDropdownContextProvider>
      <Context.Provider
        value={{
          providers,
          patient: patientRecord,
          update: (value) => {
            const selectedId = patientRecord?.id || id;

            const updateData: IPatientRecord = {
              ...patientRecord,
              ...value,
              id: selectedId,
            };

            setPatientRecord(updateData);
            updateData.personal_information?.full_name &&
              updateData.personal_information?.idf_id &&
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
          <PatientBodyPicker />
          <Avpu />
          <ASection />
          <BSection />
          <CSection />
          <DSection />
          <ESection />
          <MedicationsAndFluidSection />
          <InjuryReason />
          <Prognosis />
          <CareProvider />
          <Evacuation />
        </ScrollView>
      </Context.Provider>
    </AutocompleteDropdownContextProvider>
  );
}
