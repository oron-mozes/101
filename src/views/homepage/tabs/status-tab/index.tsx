import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";
import { TAB_STATUS } from "../..";
import { QrIcon } from "../../../../components/qr-icon/qr";
import { StatusChip } from "../../../../form-components/status-chip";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { StackNavigation } from "../../../../interfaces";
import { ROUTES } from "../../../../routes";
import { colors } from "../../../../shared-config";
import { sortByPriority } from "./utils";
import { usePatientRecordsStore } from "../../../../store/patients.record.store";
import { useEffect } from "react";

export function StatusTab() {
  const navigation = useNavigation<StackNavigation>();
  const patients = usePatientRecordsStore((state) => state.patients);

  const translation = useTranslation();

  const goToPatientPage = (patient) =>
    navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.CREATE, patient });
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <View>
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("qr")}
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("evacStatus")}
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("idf_id")}
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("patientName")}
          </DataTable.Title>
        </DataTable.Header>
        {sortByPriority(patients).map((patient, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell
                style={[styles.title]}
                onPress={() =>
                  navigation.navigate(ROUTES.EXPORT_PATIENT, { patient })
                }
              >
                <QrIcon />
              </DataTable.Cell>
              <DataTable.Cell
                onPress={() => goToPatientPage(patient)}
                style={styles.title}
              >
                <StatusChip
                  label={translation(patient?.evacuation?.status ?? "")}
                  status={patient?.evacuation?.status}
                  disabled={false}
                />
              </DataTable.Cell>
              <DataTable.Cell
                onPress={() => goToPatientPage(patient)}
                style={styles.title}
              >
                {patient?.personal_information?.idf_id}
              </DataTable.Cell>
              <DataTable.Cell
                onPress={() => goToPatientPage(patient)}
                style={styles.title}
              >
                {patient?.personal_information?.full_name}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
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
