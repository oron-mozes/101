import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTranslation } from "../../hooks/useMyTranslation";
import { RootStackParamList } from "../../interfaces";
import { colors } from "../../shared-config";
import { TAB_STATUS } from "../../views/homepage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NfcStatus, useNfcStore } from "../../store/nfc.store";

export default function MainMenu() {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const translation = useTranslation();
  const selected = useMemo(
    () => route.params?.tab || TAB_STATUS.STATUS,
    [route.params?.tab]
  );
  const patient = useMemo(() => route.params?.patient, [route.params?.patient]);
  const { full_name = "", idf_id = "" } = patient?.personal_information ?? {};
  const { openNfcDialog } = useNfcStore();

  return (
    <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
      {selected !== TAB_STATUS.CREATE && (
        <Text style={[styles.text]}>{translation("mainMenu")}</Text>
      )}
      {selected === TAB_STATUS.CREATE && (
        <Text style={[styles.text]}>{`${full_name} ${idf_id}`}</Text>
      )}
      <Button onPress={() => openNfcDialog(NfcStatus.Receiving())} style={{ backgroundColor: "pink" }}>
        Read NFC
      </Button>
      <Button onPress={() => openNfcDialog(NfcStatus.Sending({ patientsIds: ["דור.פלאפון-0"] }))} style={{ backgroundColor: "pink" }}>
        Send NFC
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {},
  text: { color: colors.textInputBG, fontWeight: "bold" },
});
