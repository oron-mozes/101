import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import storage, { STORAGE } from "../../../../../storage";
import {
  EReactionEyes,
  EReactionMovement,
  EReactionSpeech,
  ICareProvider,
  IPatientRecord,
  STATUS,
} from "../../../../interfaces";
import Context from "./context";
import { ASection } from "./create-components/a-section";
import { Avpu } from "./create-components/avpu";
import { BSection } from "./create-components/b-section";
import { CSection } from "./create-components/c-section";
import { ESection } from "./create-components/e-section";
import { InjuryReason } from "./create-components/injury-reason";
import { PatientDetails } from "./create-components/patient-details";
import { Prognosis } from "./create-components/prognosis";
import { DSection } from "./create-components/d-section";
import { MedicationsAndFluidSection } from "./create-components/medication";
import { CareProvider } from "./create-components/care-provider";
import { Evacuation } from "./create-components/evacuation";
import { PatientBodyPicker } from "./create-components/patient-body-picker";

export const emptyPatient: IPatientRecord = {
  personal_information: {
    full_name: "",
    idf_id: 0,
  },
  incident_information: {
    injury_time: new Date().getTime(),
    care_time: new Date().getTime(),
    date: new Date().getTime(),
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

  useEffect(() => {
    setPatientRecord(patient);
  }, [patient]);

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
