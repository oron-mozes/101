import { useRoute, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { List, Text } from "react-native-paper";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import {
  EReactionEyes,
  EReactionMovement,
  EReactionSpeech,
  IPatientRecord,
  RootStackParamList,
} from "../../../../interfaces";
import { colors, gutter, borderSetup } from "../../../../shared-config";
import { usePatientRecordsStore } from "../../../../store/patients.record.store";
import { useTaggadStore } from "../../../../store/taggad.store";
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
import { Measurements } from "./create-components/mesurements";
import { PatientBodyPicker } from "./create-components/patient-body-picker";
import { PatientDetails } from "./create-components/patient-details";
import { Prognosis } from "./create-components/prognosis";
import { TreatmentGuide } from "./create-components/treatment-guide";

export const emptyPatient: IPatientRecord = {
  personal_information: {
    patientId: null,
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
        id: null,
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
  CLOSE = "0",
  FIRST_TAB = "1",
  SECOND_TAB = "2",
}
export function ReportTab() {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const id = usePatientRecordsStore((state) => state.activePatient.id);
  const full_name = usePatientRecordsStore(
    (state) => state.activePatient.personal_information.full_name
  );
  const handlers = usePatientRecordsStore(
    (state) => state.personal_information_handlers
  );

  const patients = usePatientRecordsStore((state) => state.patients);
  const updatePartialPatient = usePatientRecordsStore(
    (state) => state.updatePartialPatient
  );
  const savePatient = usePatientRecordsStore((state) => state.savePatient);
  const setActivePatient = usePatientRecordsStore(
    (state) => state.setActivePatient
  );
  const taggad = useTaggadStore((state) => state.taggad);
  const translation = useTranslation();

  const [selectedAccordionItemId, setSelectedAccordionItemId] =
    useState<ACCORDION_ITEM>(ACCORDION_ITEM.FIRST_TAB);

  useEffect(() => {
    const fallback = `${taggad.unit_name}-${patients.length}`
      .split(" ")
      .join(".");

    updatePartialPatient({
      id: id ?? fallback,
    });
    if (handlers) {
      handlers.setFullName(full_name ?? fallback);
      handlers.setPatientId(id ?? fallback);
    }

    if (route?.params.patient) {
      setActivePatient(route.params.patient);
    }
    return () => {
      savePatient();
    };
  }, [handlers]);

  return (
    <AutocompleteDropdownContextProvider>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <List.AccordionGroup
          expandedId={selectedAccordionItemId}
          onAccordionPress={(expend) => {
            if (selectedAccordionItemId === expend) {
              setSelectedAccordionItemId(ACCORDION_ITEM.CLOSE);
            } else {
              setSelectedAccordionItemId(expend as ACCORDION_ITEM);
            }
          }}
        >
          <List.Accordion
            right={() => (
              <List.Icon
                color={colors.text}
                style={{ marginTop: -5 }}
                icon={
                  selectedAccordionItemId === ACCORDION_ITEM.FIRST_TAB
                    ? "chevron-up"
                    : "chevron-down"
                }
              />
            )}
            title={translation("first-care")}
            style={styles.accordion}
            id={ACCORDION_ITEM.FIRST_TAB}
            titleStyle={{
              color: colors.text,
              textAlign: "right",
            }}
          >
            <PatientDetails />
            <InjuryReason />
            <PatientBodyPicker />
            <Avpu />
            <ASection />
            <BSection />
            <CSection />
            <DSection />
            <ESection />
            <MedicationsAndFluidSection />
            <Prognosis />
            <CareProvider />
            <Evacuation />
          </List.Accordion>
          <List.Accordion
            right={() => (
              <List.Icon
                color={colors.text}
                style={{ marginTop: -5 }}
                icon={
                  selectedAccordionItemId === ACCORDION_ITEM.SECOND_TAB
                    ? "chevron-up"
                    : "chevron-down"
                }
              />
            )}
            titleStyle={{
              color: colors.text,
              textAlign: "right",
            }}
            style={styles.accordion}
            title={translation("treatments")}
            id={ACCORDION_ITEM.SECOND_TAB}
          >
            {/* <TreatmentGuide />
            <Measurements /> */}
            <Text>in progress</Text>
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
    </AutocompleteDropdownContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
    marginTop: -StatusBar.currentHeight,
  },
  accordion: {
    backgroundColor: colors.accordion,
    color: colors.text,
    margin: gutter * 2,
    ...borderSetup,
    borderColor: colors.primary,
    height: 55,
    elevation: 5,
  },
});
