import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useTranslation } from "../../hooks/useMyTranslation";
import { IPatientRecord, STATUS, StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { TAB_STATUS } from "../homepage";
import { decompress } from "compress-json";
import { RNCamera } from "react-native-camera";
import storage, { STORAGE } from "../../../storage";
import { Button, Text } from "react-native-paper";
import _ from "lodash";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCodeScanner,
} from "react-native-vision-camera";

import { Linking } from "react-native";
import DeepLinking from "react-native-deep-linking";

export default function ReceivePatientScreen() {
  const navigation = useNavigation<StackNavigation>();
  const [aggregatedPatient, setPatient] = useState<Partial<IPatientRecord>>({});
  const [scanCount, updateScanCount] = useState<number>(0);
  const [alreadyScanned, toggleAlreadyScanned] = useState<boolean>(false);
  const translation = useTranslation();
  const addPatient = usePatientRecordsStore((state) => state.addPatient);
  const goBackHome = () =>
    navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });
  const codeScanner = useCodeScanner({
    codeTypes: [
      "code-128",
      "code-39",
      "code-93",
      "codabar",
      "ean-13",
      "ean-8",
      "itf",
      "upc-e",
      "qr",
      "pdf-417",
      "aztec",
      "data-matrix",
    ],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  const onLoad = () => {
    DeepLinking.addScheme("yourappname://"); // Change 'yourappname' to your app's scheme
    Linking.addEventListener("url", handleOpenURL);
    DeepLinking.addRoute("/scan-qr-code", (response) => {
      console.log(response);
      // if (response.queryParams.qrCodeData) {
      //   // Handle the scanned QR code data
      //   const qrCodeData = response.queryParams.qrCodeData;
      //   console.log("Scanned QR Code:", qrCodeData);

      //   // You can handle the data as needed, e.g., navigate to a specific screen
      // }
    });
  };
  const handleOpenURL = (event) => {
    DeepLinking.evaluateUrl(event.url);
  };

  const openDeviceCameraToScanQRCode = () => {
    // Use deep linking to open the device's camera app for scanning QR codes
    Linking.openURL("yourappname://scan-qr-code"); // Change 'yourappname' to your app's scheme
  };
  useEffect(() => {
    onLoad();
    return () => {
      Linking.removeAllListeners("url");
    };
  }, []);

  const handleBarcodeRead = (event) => {
    console.log({ event });
    try {
      const parsed = JSON.parse(event.data);
      const patient = decompress(parsed);
      const newKeys = Object.keys(patient.partialData.data);
      if (aggregatedPatient?.[newKeys[0]]) {
        setPatient({ ...aggregatedPatient, ...patient.partialData.data });
        updateScanCount(scanCount + 1);
        toggleAlreadyScanned(false);
      } else {
        toggleAlreadyScanned(true);
      }
    } catch (e) {}
  };
  const device = useCameraDevice("back");
  const format = useCameraFormat(device, [
    { videoStabilizationMode: "cinematic-extended" },
  ]);
  const saveData = () => {
    console.log({ aggregatedPatient });
    // addPatient(aggregatedPatient as IPatientRecord);
    // navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ height: 200 }}>
          <Text>Collected: {scanCount}</Text>
          <Button onPress={openDeviceCameraToScanQRCode}>Test</Button>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button mode="contained" onPress={saveData}>
              {translation("close")}
            </Button>
            <Button
              disabled={!alreadyScanned}
              mode="contained"
              onPress={saveData}
            >
              {translation("saveAndContinue")}
            </Button>
          </View>
          {alreadyScanned && (
            <Text variant="headlineMedium">{translation("qrScanDone")}</Text>
          )}
        </View>
        <View style={styles.camera}>
          <RNCamera
            autoFocus={RNCamera.Constants.AutoFocus.on}
            type={RNCamera.Constants.Type.back}
            onBarCodeRead={handleBarcodeRead}
            captureAudio={false}
            style={styles.camera}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          />
          {/* <Camera
            codeScanner={codeScanner}
            device={device}
            isActive={true}
            style={styles.camera}
           
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 450,
    height: 450,
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
    // marginHorizontal: 20,
  },
});
