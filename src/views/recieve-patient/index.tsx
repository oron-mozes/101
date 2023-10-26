import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Camera, CameraDevice } from "react-native-vision-camera";
import { useCamera } from "../../hooks/useCamera";

export default function ReceivePatientScreen() {
  const { device, codeScanner, format } = useCamera();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.absoluteFill}>Open camera</Text>
        {device && (
          <Camera
            format={format}
            codeScanner={codeScanner}
            style={styles.absoluteFill}
            device={device as CameraDevice}
            isActive={true}
          />
        )}
      </ScrollView>
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
  absoluteFill: {
    width: 250,
    height: 250,
  },
  scrollView: {
    width: "100%",
    marginHorizontal: 20,
  },
  list: {
    alignContent: "flex-end",
    width: "100%",
  },
});
