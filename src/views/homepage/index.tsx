import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, DataTable, Text } from "react-native-paper";
import storage, { STORAGE } from "../../../storage";
import { InputField } from "../../form-components/input-field";
import { RadioButton } from "../../form-components/radio-button";
import { SectionHeader } from "../../form-components/section-header";
import { CheckButton } from "../../form-components/select-button";
import {
  IStatusChipProps,
  StatusChip,
} from "../../form-components/status-chip";
import { useTranslation } from "../../hooks/useMyTranslation";
import { usePatientsRecord } from "../../hooks/usePatientsRecord";
import { STATUS, StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { initialState } from "../user";
import { QrIcon } from "../../components/qr-icon/qr";

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigation>();
  const translation = useTranslation();
  const [userDetails, setUserDetails] = useState<typeof initialState | null>();
  const { patientsRecord, loadRecords } = usePatientsRecord();
  // storage.clearMapForKey(STORAGE.PATIENTS_RECORD);

  useEffect(() => {
    !userDetails &&
      storage
        .load({
          key: STORAGE.USER,
        })
        .then((data) => {
          setUserDetails(data);
          loadRecords();
        })
        .catch(() => {
          navigation.navigate(ROUTES.ACCOUNT);
        });

    return navigation.addListener("focus", loadRecords);
  }, [userDetails]);

  const chips: IStatusChipProps[] = [
    { label: translation("statusActive"), status: STATUS.ACTIVE },
    { label: translation("statusUrgent"), status: STATUS.URGENT },
    { label: translation("statusNoneUrgent"), status: STATUS.NONE_URGENT },
    { label: translation("evacuated"), status: STATUS.EVACUATED },
    { label: translation("reActive"), status: STATUS.RE_ACTIVE },
    { label: translation("urgentEvac"), status: STATUS.URGENT_EVAC },
    { label: translation("noneUrgentEvac"), status: STATUS.NONE_URGENT_EVAC },
  ];

  const [yesCheck, toggleYesCheck] = useState<boolean>(false);
  const [inputTest, updateInputTest] = useState<string>();
  const [radioCheck, toggleRadioCheck] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          numColumns={3}
          data={chips}
          renderItem={({ item }) => (
            <StatusChip label={item.label} status={item.status} />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <CheckButton
          label={translation("yes")}
          checked={yesCheck}
          onSelect={() => {
            toggleYesCheck(!yesCheck);
          }}
        />
        <CheckButton
          label={translation("no")}
          checked={false}
          disabled={true}
          onSelect={() => {
            toggleYesCheck(!yesCheck);
          }}
        />
      </View>
      <View>
        <InputField
          label={translation("patientName")}
          value={inputTest}
          onChange={updateInputTest}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <RadioButton
          value={"yes"}
          status={radioCheck}
          onSelect={() => {
            toggleRadioCheck(!radioCheck);
          }}
          label={translation("text")}
        />
        <RadioButton
          disabled={true}
          value={"yes"}
          status={false}
          onSelect={() => {}}
          label={translation("text")}
        />
      </View>
      <SectionHeader label={translation("avpu")} />

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
      <View style={styles.scrollView}>
        <Card>
          <Button onPress={() => navigation.navigate(ROUTES.REPORT)}>
            {translation("addPatient")}
          </Button>
        </Card>
        <Card>
          <Button onPress={() => navigation.navigate(ROUTES.IMPORT_PATIENT)}>
            {translation("importPatient")}
          </Button>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  disableRow: {
    opacity: 0.6,
  },
  table: { margin: 4, width: "98%" },
  tableHeader: { backgroundColor: "rgba(229, 241, 255, 1)" },
  container: {
    paddingTop: StatusBar.currentHeight,
    width: "100%",
  },
  header: {
    backgroundColor: "pink",
  },
  scrollView: {
    width: "90%",
  },
  list: {
    alignContent: "flex-end",
    width: "100%",
  },
});
