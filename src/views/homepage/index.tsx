import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import storage, { STORAGE } from "../../../storage";
import { useTranslation } from "../../hooks/useMyTranslation";
import { usePatientsRecord } from "../../hooks/usePatientsRecord";
import { ROUTES } from "../../routes";
import { PatientCard } from "../patient/patient-card";
import { initialState } from "../user";
import { STATUS, StackNavigation } from "../../interfaces";
import { IStatusChipProps, StatusChip } from "../../components/status-chip";
import { CheckButton } from "../../components/select-button";

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
      <View style={{ flexDirection: "row" }}>
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
      <View style={styles.scrollView}>
        <StatusBar barStyle="light-content" />
        <Text>
          {translation("welcomeMessage", {
            name: userDetails?.fullName || "",
          })}
        </Text>
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
        <FlatList
          style={styles.list}
          //@ts-ignore
          keyExtractor={(item) => item.id}
          numColumns={1}
          renderItem={({ item }) => <PatientCard patient={item} />}
          data={patientsRecord}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
