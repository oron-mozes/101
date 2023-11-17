import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import { TAB_STATUS } from "../..";
import { QrIcon } from "../../../../components/qr-icon/qr";
import { StatusChip } from "../../../../form-components/status-chip";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { StackNavigation } from "../../../../interfaces";
import { ROUTES } from "../../../../routes";
import { colors, borderSetup } from "../../../../shared-config";
import { sortByPriority } from "./utils";
import { usePatientRecordsStore } from "../../../../store/patients.record.store";
import { useEffect } from "react";
import { PatientCareIcon } from "../../footer/patient-care-icon";

export function StatusTab() {
  const navigation = useNavigation<StackNavigation>();
  const patients = usePatientRecordsStore((state) => state.patients);

  const translation = useTranslation();

  const goToPatientPage = (patient) => {
    navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.CREATE, patient });
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.CREATE })
        }
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
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("patientName")}
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("idf_id")}
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("evacStatus")}
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.titleText}>
            {translation("qr")}
          </DataTable.Title>
        </DataTable.Header>
        {sortByPriority(patients).map((patient, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell
                onPress={() => goToPatientPage(patient)}
                style={[styles.title]}
              >
                <View style={{ flexDirection: "row" }}>
                  {patient.new && (
                    <View style={styles.newLabelWrapper}>
                      <Text style={styles.newLabel}>{translation("new")}</Text>
                    </View>
                  )}

                  <Text>{patient?.personal_information?.full_name}</Text>
                </View>
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
                <StatusChip
                  label={translation(patient?.evacuation?.status ?? "")}
                  status={patient?.evacuation?.status}
                  editable={false}
                />
              </DataTable.Cell>
              <DataTable.Cell
                style={[styles.title]}
                onPress={() =>
                  navigation.navigate(ROUTES.EXPORT_PATIENT, { patient })
                }
              >
                <QrIcon />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
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
