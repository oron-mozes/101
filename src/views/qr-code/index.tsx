import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import storage, { STORAGE } from "../../../storage";
import { useTranslation } from "../../hooks/useMyTranslation";
import {
  IPatientRecord,
  RootStackParamList,
  STATUS,
  StackNavigation,
} from "../../interfaces";
import { ROUTES } from "../../routes";

import { trimUndefinedRecursively } from "compress-json";
import { splicePatient } from "./utils";
import { colors } from "../../shared-config";
import StepIndicator from "react-native-step-indicator";

export default function QrCode() {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const patient = useMemo(() => route.params.patient, []);
  const [qrIndex, setQrIndex] = useState<number>(0);
  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();
  const reportEvac = async () => {
    const updatedPatient: IPatientRecord = {
      ...patient,
      evacuation: {
        ...patient.evacuation,
        status: STATUS.CLOSED,
      },
    };
    await storage.save({
      key: STORAGE.PATIENTS_RECORD,
      id: patient.id,
      data: updatedPatient,
    });
    goBackHome();
  };
  const goBackHome = () => navigation.navigate(ROUTES.HOME);
  trimUndefinedRecursively(patient);
  const decodedPatient = splicePatient(patient);

  const labels = decodedPatient.map(
    (_, index) => `${index + 1}/${decodedPatient.length}`
  );
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text
            style={{ textAlign: "center", fontWeight: "bold" }}
            variant="bodyLarge"
          >
            {translation("qrScan", {
              max: labels.length.toString(),
              current: (qrIndex + 1).toString(),
            })}
          </Text>
          <StepIndicator
            stepCount={labels.length}
            customStyles={customStyles}
            currentPosition={qrIndex}
            labels={labels}
          />
        </View>
        <View
          style={[styles.descriptionView, { marginTop: 30, marginBottom: 20 }]}
        >
          <Text style={{ flex: 1, textAlign: "center" }}>
            {translation("patientName")}
          </Text>
          <Text style={{ flex: 1, textAlign: "center" }}>
            {patient.personal_information.full_name}
          </Text>
        </View>
        <View style={styles.descriptionView}>
          <Text>{translation("idf_id")}</Text>
          <Text>{patient.personal_information.idf_id}</Text>
        </View>
        <View style={styles.qrWrapper}>
          <QRCode
            value={JSON.stringify(decodedPatient[qrIndex])}
            logo={require("./Logo.png")}
            size={300}
          />
        </View>
        <View style={styles.buttonsView}>
          <Button
            contentStyle={{ flexDirection: "row" }}
            mode="contained"
            style={styles.button}
            buttonColor={colors.primary}
            icon="check"
            onPress={() => {
              qrIndex < labels.length - 1
                ? setQrIndex(qrIndex + 1)
                : reportEvac();
            }}
          >
            {qrIndex < labels.length - 1
              ? translation("next")
              : translation("approveEvac")}
          </Button>
          <Button
            mode="contained"
            buttonColor="white"
            textColor={colors.primary}
            style={styles.button}
            icon="close"
            contentStyle={{ flexDirection: "row" }}
            onPress={goBackHome}
          >
            {translation("cancel")}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  qrWrapper: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 30,
  },
  descriptionView: {
    marginBottom: 20,
    flexDirection: "row",
    width: 360,
    justifyContent: "space-around",
  },
  buttonsView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
  },
  container: {
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
