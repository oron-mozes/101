import React, { useCallback, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import {
  Camera,
  CameraDevice,
  CameraRuntimeError,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { useCamera } from "../../hooks/useCamera";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../../hooks/useMyTranslation";
import { StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { TAB_STATUS } from "../homepage";
import { decode } from "../qr-code/decode-encode";

export default function ReceivePatientScreen() {
  const { device, codeScanner, format, scannedInformation } = useCamera();
  const navigation = useNavigation<StackNavigation>();
  const translation = useTranslation();

  useEffect(() => {
    if (scannedInformation) {
      const decodedPatient = decode(
        JSON.parse(scannedInformation[0].value).decodedPatient
      );
      console.log(decodedPatient);
    }
  }, [scannedInformation]);

  const goBackHome = () =>
    navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });
  const reportEvac = async () => {
    goBackHome();
  };

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar barStyle="light-content" />

        <View style={styles.qrWrapper}>
          <Camera
            format={format}
            codeScanner={codeScanner}
            style={styles.camera}
            device={device as CameraDevice}
            isActive={Boolean(device)}
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
            {translation("scan")}
          </Button>
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
