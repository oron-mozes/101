import { useNavigation } from "@react-navigation/native";
import { decompress } from "compress-json";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { Button, Text } from "react-native-paper";
import { useTranslation } from "../../hooks/useMyTranslation";
import { IPatientRecord, StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import { TAB_STATUS } from "../homepage";

export default function ReceivePatientScreen() {
  const navigation = useNavigation<StackNavigation>();
  const translation = useTranslation();
  const [aggregatedPatient, setPatient] = useState<Partial<IPatientRecord>>({
    new: true,
  });
  const [scanCount, updateScanCount] = useState<number>(0);
  const [doneScanning, setDone] = useState<boolean>(false);
  const addPatient = usePatientRecordsStore((state) => state.addPatient);

  const [parts, addParts] = useState<Set<number>>(new Set([]));

  const goBackHome = () =>
    navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });

  const handleBarcodeRead = (event) => {
    try {
      const parsed = JSON.parse(event.data);

      const patient = decompress(parsed);

      if (parts.has(patient.partialData.part)) {
        return;
      }
      const newKeys = Object.keys(patient.partialData.data);

      parts.add(patient.partialData.part);

      addParts(parts);
      if (patient.partialData.data.provider) {
        patient.partialData.data.providers = [
          patient.partialData.data.provider,
        ];
      }
      setPatient({ ...aggregatedPatient, ...patient.partialData.data });
      updateScanCount(scanCount + 1);

      patient.partialData.isLast && setDone(true);
    } catch (e) {
      console.log({ event, e });
    }
  };
  const saveData = () => {
    addPatient(aggregatedPatient as IPatientRecord);
    navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });
  };
  const current = parts?.size.toString();

  return (
    // <SafeAreaView style={styles.container}>
    //   <ScrollView style={styles.scrollView}>
    <View style={styles.content}>
      <Text variant="headlineMedium" style={styles.pageTitle}>
        {translation("waitingForQrCode")}
      </Text>
      {aggregatedPatient?.personal_information && (
        <>
          <View style={styles.user}>
            <Text style={styles.userLabel}>{translation("patientName")}</Text>
            <Text style={styles.userLabel}>
              {aggregatedPatient.personal_information.full_name}
            </Text>
          </View>
          <View style={styles.user}>
            <Text style={styles.userLabel}>{translation("idf_id")}</Text>
            <Text style={styles.userLabel}>
              {aggregatedPatient.personal_information.idf_id}
            </Text>
          </View>
        </>
      )}

      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarcodeRead}
        captureAudio={false}
      />
      <Text variant="bodyLarge" style={styles.statusMessage}>
        {!doneScanning && parts.size === 0 && translation("waitingForScan")}
        {!doneScanning &&
          parts.size !== 0 &&
          translation("gotQrCodeNumber", {
            current,
          })}
        {doneScanning && translation("patientComplete")}
      </Text>

      <View style={styles.action}>
        <Button disabled={!doneScanning} mode="contained" onPress={saveData}>
          {translation("saveAndContinue")}
        </Button>
        <Button mode="outlined" onPress={goBackHome} style={styles.back}>
          {translation("cancel")}
        </Button>
      </View>
    </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userLabel: {
    flex: 1,
  },
  user: {
    flexDirection: "row",
    width: 200,
  },
  back: {
    marginLeft: 8,
  },
  action: {
    marginTop: 20,
    flexDirection: "row",
  },
  statusMessage: {
    marginTop: 20,
  },
  pageTitle: {
    marginBottom: 30,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    // borderWidth: 1,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 10,
    // width: 300,
    // height: 300,
  },
  camera: {
    width: 300, // Set your desired width
    height: 400, // Set your desired height
    borderWidth: 2, // Border width
    borderColor: "white", // Border color
    marginTop: 10,
  },
  qrWrapper: {
    // borderWidth: 1,
    // borderColor: "grey",
    // padding: 30,
    // width: 400,
    // height: 400,
    // justifyContent: "center",
    // alignItems: "center",
  },
  descriptionView: {
    // marginBottom: 20,
    // textAlign: "center",
    // alignItems: "center",
  },
  buttonsView: {
    // justifyContent: "space-between",
    // flexDirection: "row",
    // marginTop: 20,
  },
  button: {
    // borderWidth: 1,
    // borderColor: "rgba(0, 107, 229, 1)",
    // borderRadius: 6,
  },
  container: {
    // alignItems: "center",
    // paddingTop: StatusBar.currentHeight,
    // width: "100%",
    // height: "100%",
  },
  scrollView: {
    // marginHorizontal: 20,
    // flexDirection: "column",
    // alignItems: "center",
  },
});
