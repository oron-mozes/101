import { StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";
import { QrIcon } from "../../../components/qr-icon/qr";
import { StatusChip } from "../../../form-components/status-chip";
import { STATUS, StackNavigation } from "../../../interfaces";
import { ROUTES } from "../../../routes";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { usePatientsRecord } from "../../../hooks/usePatientsRecord";
import { useEffect } from "react";

export function StatusTab() {
  const navigation = useNavigation<StackNavigation>();
  const translation = useTranslation();
  const { patientsRecord, loadRecords } = usePatientsRecord();
  useEffect(() => {
    loadRecords();
    return navigation.addListener("focus", loadRecords);
  }, []);
  return (
    <View>
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>{translation("qr")}</DataTable.Title>
          <DataTable.Title>{translation("evacStatus")}</DataTable.Title>
          <DataTable.Title>{translation("idfId")}</DataTable.Title>
          <DataTable.Title>{translation("patientName")}</DataTable.Title>
        </DataTable.Header>
        {patientsRecord.map((patient) => {
          const disable: boolean =
            patient.incident_information.status === STATUS.EVACUATED;
          return (
            <DataTable.Row
              key={patient.id}
              style={[disable ? styles.disableRow : {}]}
            >
              <DataTable.Cell
                disabled={disable}
                onPress={() =>
                  navigation.navigate(ROUTES.EXPORT_PATIENT, { patient })
                }
              >
                <QrIcon />
              </DataTable.Cell>
              <DataTable.Cell>
                <StatusChip
                  label={translation(patient.incident_information.status)}
                  status={patient.incident_information.status}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                {patient.personal_information.idf_id}
              </DataTable.Cell>
              <DataTable.Cell>
                {patient.personal_information.full_name}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  disableRow: {
    opacity: 0.6,
  },
  table: { margin: 4, width: "98%" },
  tableHeader: { backgroundColor: "rgba(229, 241, 255, 1)" },
});
