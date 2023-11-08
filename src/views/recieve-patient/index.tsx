import { useNavigation } from "@react-navigation/native";
import { decompress } from "compress-json";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { RNCamera } from "react-native-camera";
import { useTranslation } from "../../hooks/useMyTranslation";
import { StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { TAB_STATUS } from "../homepage";

export default function ReceivePatientScreen() {
  const navigation = useNavigation<StackNavigation>();
  const translation = useTranslation();

  const goBackHome = () =>
    navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });

  const handleBarcodeRead = (event) => {
    if (event.data) {
      const { patient } = decompress(JSON.parse(event.data));
      console.log(patient);
      // storage.save({
      //   key: STORAGE.PATIENTS_RECORD,
      //   id: patient.id,
      //   data: {
      //     ...patient,
      //     evacuation: {
      //       ...patient.evacuation,
      //       status: STATUS.ACTIVE,
      //     },
      //   },
      // });
      navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <RNCamera
            style={styles.camera}
            onBarCodeRead={handleBarcodeRead}
            captureAudio={false}
          />
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
