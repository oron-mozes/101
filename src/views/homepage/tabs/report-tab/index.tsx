import { RouteProp, useRoute } from "@react-navigation/native";
import { Suspense, lazy, useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { List } from "react-native-paper";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { RootStackParamList, STATUS } from "../../../../interfaces";
import { borderSetup, colors, gutter } from "../../../../shared-config";
import { usePatientRecordsStore } from "../../../../store/patients.record.store";
import { useStationStore } from "../../../../store/station.store";
import InjuryReason from "./create-components/injury-reason";
import PatientDetails from "./create-components/patient-details";
import { emptyPatient } from "./empty-patient";
import { generateId } from "./utils";
import TreatmentGuide from "./create-components/treatment-guide";
import Measurements from "./create-components/treatment-mesurments";
// import ASection from "./create-components/a-section";
// import Avpu from "./create-components/avpu";
// import BSection from "./create-components/b-section";
// import CSection from "./create-components/c-section";
// import CareProvider from "./create-components/care-provider";
// import DSection from "./create-components/d-section";
// import ESection from "./create-components/e-section";
// import Evacuation from "./create-components/evacuation";
// import MedicationsAndFluidSection from "./create-components/medication";
// import PatientBodyPicker from "./create-components/patient-body-picker";
// import Prognosis from "./create-components/prognosis";
import { useGlobalStore } from "../../../../store/global.store";

const Avpu = lazy(() => import("./create-components/avpu"));
const ASection = lazy(() => import("./create-components/a-section"));
const BSection = lazy(() => import("./create-components/b-section"));
const CSection = lazy(() => import("./create-components/c-section"));
const ESection = lazy(() => import("./create-components/e-section"));
const DSection = lazy(() => import("./create-components/d-section"));
const CareProvider = lazy(() => import("./create-components/care-provider"));
const Evacuation = lazy(() => import("./create-components/evacuation"));
const MedicationsAndFluidSection = lazy(
  () => import("./create-components/medication")
);
const PatientBodyPicker = lazy(
  () => import("./create-components/patient-body-picker")
);

const Prognosis = lazy(() => import("./create-components/prognosis"));

enum ACCORDION_ITEM {
  CLOSE = "0",
  FIRST_TAB = "1",
  SECOND_TAB = "2",
}
export function ReportTab() {
  const route = useRoute<RouteProp<RootStackParamList>>();

  const handlers = usePatientRecordsStore(
    (state) => state.personal_information_handlers
  );

  const savePatient = usePatientRecordsStore((state) => state.savePatient);
  const patients = usePatientRecordsStore((state) => state.patients);
  const setActivePatient = usePatientRecordsStore(
    (state) => state.setActivePatient
  );
  const taggad = useStationStore((state) => state.station);
  const translation = useTranslation();
  const toggleLoading = useGlobalStore((state) => state.toggleLoading);
  const [selectedAccordionItemId, setSelectedAccordionItemId] =
    useState<ACCORDION_ITEM>(ACCORDION_ITEM.FIRST_TAB);

  useEffect(() => {
    const id = generateId(taggad.unit_name);
    const patient = route.params.patient ?? {
      ...emptyPatient,
      personal_information: {
        ...emptyPatient.personal_information,
        full_name: `${taggad.unit_name} ${patients.length}`,
        patientId: id,
      },
      evacuation: {
        ...emptyPatient.evacuation,
        status: STATUS.NEW_PATIENT,
      },
      id,
    };

    setActivePatient(patient);

    return () => {
      savePatient();
    };
  }, [handlers]);

  useEffect(() => {
    toggleLoading(false);
  }, [selectedAccordionItemId]);

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <AutocompleteDropdownContextProvider>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.container}
        >
          <List.AccordionGroup
            expandedId={selectedAccordionItemId}
            onAccordionPress={(expend) => {
              toggleLoading(true);
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
                textAlign: "left",
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
                textAlign: "left",
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
      </AutocompleteDropdownContextProvider>
    </Suspense>
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
export default ReportTab;
