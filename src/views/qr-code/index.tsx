import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useMemo } from "react";
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
import { encode } from "./decode-encode";

export default function QrCode() {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const patient = useMemo(() => route.params.patient, []);
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
  const decodedPatient = encode(patient);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.descriptionView}>
          <Text>
            {translation("patientName")}
            {"   "}
            {patient.personal_information.full_name}
          </Text>
          <Text>
            {translation("idfId")}
            {"   "}
            {patient.personal_information.idf_id}
          </Text>
        </View>
        <View style={styles.qrWrapper}>
          <QRCode
            
            value={JSON.stringify({ decodedPatient })}
            logo={require("./Logo.png")}
            size={220}
          />
        </View>
        <View style={styles.buttonsView}>
          <Button
            mode="contained"
            buttonColor="white"
            textColor="rgba(0, 107, 229, 1)"
            style={styles.button}
            icon="close"
            contentStyle={{ flexDirection: "row-reverse" }}
            onPress={goBackHome}
          >
            {translation("cancel")}
          </Button>
          <Button
            contentStyle={{ flexDirection: "row-reverse" }}
            mode="contained"
            style={styles.button}
            buttonColor="rgba(0, 107, 229, 1)"
            icon="check"
            onPress={reportEvac}
          >
            {translation("approveEvac")}
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
