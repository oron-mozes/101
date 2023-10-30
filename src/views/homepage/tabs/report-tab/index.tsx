import { useEffect, useMemo, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import storage, { STORAGE } from "../../../../../storage";
import {
  EReactionEyes,
  EReactionMovement,
  EReactionSpeech,
  ICareProvider,
  IPatientRecord,
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
import { List, Text } from "react-native-paper";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { colors } from "../../../../shared-config";
import { TreatmentGuide } from "./create-components/treatment-guide";
import { Measurements } from "./create-components/mesurements";

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
  injuries: {},
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
  treatmentGuide: {
    guides: [],
    measurements: {
      period: null,
      actions: [],
    },
  },
};

enum ACCORDION_ITEM {
  FIRST_TAB = "1",
  SECOND_TAB = "2",
}
export function ReportTab({ patient }: { patient?: IPatientRecord }) {
  const translation = useTranslation();
  const [patientRecord, setPatientRecord] = useState<IPatientRecord>(
    patient || emptyPatient
  );

  const [selectedAccordionItemId, setSelectedAccordionItemId] =
    useState<ACCORDION_ITEM>(ACCORDION_ITEM.FIRST_TAB);
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
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.container}
        >
          <List.AccordionGroup
            expandedId={selectedAccordionItemId}
            onAccordionPress={(expend) => {
              setSelectedAccordionItemId(expend as ACCORDION_ITEM);
            }}
          >
            <List.Accordion
              title={translation("first-care")}
              style={styles.accordion}
              id={ACCORDION_ITEM.FIRST_TAB}
              titleStyle={{
                color: colors.textInputBG,
                textAlign: "right",
              }}
            >
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
            </List.Accordion>
            <List.Accordion
              titleStyle={{
                color: colors.textInputBG,
                textAlign: "right",
              }}
              style={styles.accordion}
              title={translation("treatments")}
              id={ACCORDION_ITEM.SECOND_TAB}
            >
              <TreatmentGuide />
              <Measurements />
            </List.Accordion>
          </List.AccordionGroup>
        </ScrollView>
      </Context.Provider>
    </AutocompleteDropdownContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    marginTop: -StatusBar.currentHeight,
  },
  accordion: {
    backgroundColor: colors.accordion,
    color: colors.textInputBG,
  },
});
