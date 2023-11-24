import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState, lazy, Suspense } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { List } from "react-native-paper";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { RootStackParamList } from "../../../../interfaces";
import { borderSetup, colors, gutter } from "../../../../shared-config";
import { usePatientRecordsStore } from "../../../../store/patients.record.store";
import { useStationStore } from "../../../../store/station.store";
import PatientDetails from "./create-components/patient-details";
import InjuryReason from "./create-components/injury-reason";

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
const Measurements = lazy(
  () => import("./create-components/treatment-mesurments")
);

const TreatmentGuide = lazy(
  () => import("./create-components/treatment-guide")
);

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
  const taggad = useStationStore((state) => state.station);
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
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <AutocompleteDropdownContextProvider>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.container}
        >
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
