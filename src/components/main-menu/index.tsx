import React, { useEffect, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTranslation } from "../../hooks/useMyTranslation";
import { IProps, RootStackParamList } from "../../interfaces";
import { colors } from "../../shared-config";
import { TAB_STATUS } from "../../views/homepage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useNFCReader } from "../../hooks/useNfcReader";
import { useNFCSender } from "../../hooks/useNfcSender";

export default function MainMenu() {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const translation = useTranslation();
  const selected = useMemo(
    () => route.params?.tab || TAB_STATUS.STATUS,
    [route.params?.tab]
  );
  const patient = useMemo(() => route.params?.patient, [route.params?.patient]);
  const { full_name = "", idf_id = "" } = patient?.personal_information ?? {};
  const { logs, readTag } = useNFCReader();
  const { logsWrite, writeNdef } = useNFCSender();
  return (
    <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
      {selected !== TAB_STATUS.CREATE && (
        <Text style={[styles.text]}>{translation("mainMenu")}</Text>
      )}
      {selected === TAB_STATUS.CREATE && (
        <Text style={[styles.text]}>{`${full_name} ${idf_id}`}</Text>
      )}
      <Button onPress={readTag} style={{ backgroundColor: "pink" }}>
        Read NFC
        {logs}
      </Button>
      <Button onPress={() => writeNdef()} style={{ backgroundColor: "pink" }}>
        Send NFC
        {logsWrite}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {},
  text: { color: colors.textInputBG, fontWeight: "bold" },
});
