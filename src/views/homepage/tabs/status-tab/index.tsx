import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Checkbox, DataTable, Text } from "react-native-paper";
import { TAB_STATUS } from "../..";
import { StatusChip } from "../../../../form-components/status-chip";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { StackNavigation } from "../../../../interfaces";
import { ROUTES } from "../../../../routes";
import { borderSetup, colors } from "../../../../shared-config";
import { useGlobalStore } from "../../../../store/global.store";
import { usePatientRecordsStore } from "../../../../store/patients.record.store";
import { PatientCareIcon } from "../../footer/patient-care-icon";
import { TableActions } from "./table-actions";
import { sortByPriority } from "./utils";
import { usePatientTransfer } from "../../../../hooks/usePatientTransfer";

export function StatusTab() {
  const navigation = useNavigation<StackNavigation>();
  const patients = usePatientRecordsStore((state) => [...state.patients]);

  const translation = useTranslation();

  const goToPatientPage = (patient) => {
    navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.CREATE, patient });
  };
  const { performActionForPatients, setPerformActionForPatients, toggleLoading, togglePatientId } =
    useGlobalStore();
  const { CommunicationIcon, transferPatient } = usePatientTransfer();

  return (
    <GestureHandlerRootView>
      <TouchableWithoutFeedback
        onPress={() => {
          toggleLoading(true);
          setPerformActionForPatients([]);
          navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.CREATE });
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <View style={styles.textBox}>
            <PatientCareIcon active={false} invert={true} />
            <Text style={{ color: colors.textInputBG, marginLeft: 8 }}>
              {translation("addPatient")}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TableActions />

      <DataTable style={styles.table}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title
            style={[styles.title, { flex: 0.5 }]}
            textStyle={styles.titleText}
          >
            {translation("choose")}
          </DataTable.Title>
          <DataTable.Title
            style={[styles.title, { flex: 0.5 }]}
            textStyle={[styles.titleText]}
          >
            {translation("systemStatus")}
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("patientName")}
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("patientChrecteristics")}
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("evacStatus")}
          </DataTable.Title>
          <DataTable.Title
            style={[styles.title, { flex: 0.5 }]}
            textStyle={styles.titleText}
          >
            {translation("transfer")}
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView style={{ height: 600 }}>
          {sortByPriority(patients).map((patient, index) => {
            const mainInjury = patient?.injuries?.find(
              (injury) => injury.isMain
            );
            const mainInjuryName =
              mainInjury &&
              `${translation(
                mainInjury?.data?.toLowerCase() ?? ""
              )} ${translation(mainInjury?.location ?? "")}`;
            return (
              <DataTable.Row key={index} style={{ backgroundColor: "white" }}>
                <DataTable.Cell style={[styles.title, { flex: 0.5 }]}>
                  <Checkbox
                    onPress={() => {
                      togglePatientId(patient.personal_information.patientId);
                    }}
                    status={
                      performActionForPatients.includes(
                        patient.personal_information.patientId
                      )
                        ? "checked"
                        : "unchecked"
                    }
                  />
                </DataTable.Cell>
                <DataTable.Cell
                  onPress={() => goToPatientPage(patient)}
                  style={[styles.title, { flex: 0.5 }]}
                >
                  <View style={styles.newLabelWrapper}>
                    {patient.new && (
                      <Text style={styles.newLabel}>{translation("new")}</Text>
                    )}
                  </View>
                </DataTable.Cell>
                <DataTable.Cell
                  onPress={() => goToPatientPage(patient)}
                  style={[styles.title]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text>{patient?.personal_information?.full_name}</Text>
                  </View>
                </DataTable.Cell>

                <DataTable.Cell
                  onPress={() => goToPatientPage(patient)}
                  style={styles.title}
                >
                  {mainInjuryName}
                </DataTable.Cell>
                <DataTable.Cell
                  onPress={() => goToPatientPage(patient)}
                  style={styles.title}
                >
                  <StatusChip
                    label={translation(patient?.evacuation?.status ?? "")}
                    status={patient?.evacuation?.status}
                    editable={false}
                  />
                </DataTable.Cell>
                <DataTable.Cell
                  style={[styles.title, { flex: 0.5 }]}
                  onPress={() =>
                    transferPatient({
                      patientsIds: [patient.personal_information.patientId],
                    })
                  }
                >
                  <CommunicationIcon color={colors.primary} size={25} />
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </ScrollView>
      </DataTable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  newLabelWrapper: {
    ...borderSetup,
    marginRight: 10,
  },
  newLabel: {
    fontSize: 11,
    padding: 4,
  },
  textBox: {
    height: 50,
    ...borderSetup,
    backgroundColor: colors.primary,
    color: colors.textInputBG,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
  },
  titleText: {
    fontWeight: "bold",
  },
  title: {
    justifyContent: "center",
  },
  disableRow: {
    opacity: 0.6,
  },
  table: { margin: 4, width: "98%" },
  tableHeader: { backgroundColor: colors.surface },
});
export default StatusTab;
