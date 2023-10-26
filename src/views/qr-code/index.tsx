import React from "react";
import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
//{ patient }: { patient: IPatientRecord }
export default function QrCode() {
  return (
    <View>
      {/* <Text>{patient.personal_information.full_name}</Text> */}
      <QRCode
        value={JSON.stringify({})}
        logo={require("../../../assets/101.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
