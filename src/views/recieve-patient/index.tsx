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

  const [parts, addParts] = useState<number[]>([]);
  const goBackHome = () =>
    navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });

  const handleBarcodeRead = (event) => {
    try {
      const parsed = JSON.parse(event.data);
      const patient = decompress(parsed);
      if (parts.includes(patient.partialData.part)) {
        return;
      }
      const newKeys = Object.keys(patient.partialData.data);

      addParts(patient.partialData.part);
      if (!aggregatedPatient?.[newKeys[0]]) {
        setPatient({ ...aggregatedPatient, ...patient.partialData.data });
        updateScanCount(scanCount + 1);

        patient.partialData.isLast && setDone(true);
      }
    } catch (e) {
      console.log({ event, e });
    }
  };
  const saveData = () => {
    // addPatient(aggregatedPatient as IPatientRecord);
    // navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ height: 100 }}>
          <View>
            <Text
              style={{ textAlign: "center", fontWeight: "bold" }}
              variant="bodyLarge"
            >
              {!doneScanning &&
                parts.length === 0 &&
                translation("waitingForQrCode")}
              {!doneScanning &&
                parts.length !== 0 &&
                translation("gotQrCodeNumber", {
                  current: parts[parts.length - 1].toString(),
                })}
              {doneScanning && translation("patientComplete")}
            </Text>
          </View>
        </View>
        {aggregatedPatient?.personal_information && (
          <>
            <View
              style={[
                styles.descriptionView,
                { marginTop: 30, marginBottom: 20 },
              ]}
            >
              <Text style={{ flex: 1, textAlign: "center" }}>
                {translation("patientName")}
              </Text>
              <Text style={{ flex: 1, textAlign: "center" }}>
                {aggregatedPatient.personal_information.full_name}
              </Text>
            </View>
            <View style={styles.descriptionView}>
              <Text>{translation("idf_id")}</Text>
              <Text>{aggregatedPatient.personal_information.idf_id}</Text>
            </View>
          </>
        )}
        <View>
          <RNCamera
            style={styles.camera}
            onBarCodeRead={handleBarcodeRead}
            captureAudio={false}
          />
        </View>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              disabled={!doneScanning}
              mode="contained"
              onPress={saveData}
            >
              {translation("saveAndContinue")}
            </Button>
            <Button mode="contained" onPress={goBackHome}>
              {translation("cancel")}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 350,
    height: 350,
  },
  qrWrapper: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 30,
    width: 400,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionView: {
    marginBottom: 20,
    textAlign: "center",
    alignItems: "center",
  },
  buttonsView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(0, 107, 229, 1)",
    borderRadius: 6,
  },
  container: {
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
