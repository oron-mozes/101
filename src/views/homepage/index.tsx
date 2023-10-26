import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { StackNavigation, ROUTES } from "../../routes";
import { initialState } from "../user";
import storage, { STORAGE } from "../../../storage";
import { IPatientRecord } from "../patient";
import { PatientCard } from "../patient/patient-card";
import { useTranslation } from "../../hooks/useMyTranslation";
import { usePatientsRecord } from "../../hooks/usePatientsRecord";

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

  return (
    <SafeAreaView style={styles.container}>
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
    flexDirection: "row-reverse",
    flex: 1,
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
