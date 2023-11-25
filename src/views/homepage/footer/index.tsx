import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import { TAB_STATUS } from "..";
import { QrIcon } from "../../../components/qr-icon/qr";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { RootStackParamList, StackNavigation } from "../../../interfaces";
import { ROUTES } from "../../../routes";
import { colors } from "../../../shared-config";
import { PatientCareIcon } from "./patient-care-icon";
import { PatientStatusIcon } from "./patient-status-icon";
import { ReceivePatientDialog } from "./recive-patient-dialog";
import { useGlobalStore } from "../../../store/global.store";
import { NfcIcon } from "../../../components/nfc-dialog/nfc-icon";

export function HomepageFooter() {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const navigation = useNavigation<StackNavigation>();
  const selected = useMemo(
    () => route.params?.tab ?? TAB_STATUS.STATUS,
    [route.params?.tab]
  );
  const translation = useTranslation();
  const { toggleLoading } = useGlobalStore();
  const [showReceiveDialog, setShowReceiveDialog] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      {showReceiveDialog && (
        <ReceivePatientDialog onClose={() => setShowReceiveDialog(false)} />
      )}
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS })
        }
      >
        <View style={styles.textBox}>
          <PatientStatusIcon active={selected === TAB_STATUS.STATUS} />

          <Text
            style={[
              styles.text,
              selected === TAB_STATUS.STATUS ? styles.bold : {},
            ]}
          >
            {translation("patientsStatus")}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          toggleLoading(true);
          navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.CREATE });
        }}
      >
        <View style={styles.textBox}>
          <PatientCareIcon active={selected === TAB_STATUS.CREATE} />
          <Text
            style={[
              styles.text,
              selected === TAB_STATUS.CREATE ? styles.bold : {},
            ]}
          >
            {translation("addPatient")}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setShowReceiveDialog(true)}>
        <View style={styles.textBox}>
          <NfcIcon size={20} color={selected ? colors.text : colors.text} />
          <Text
            style={[
              styles.text,
              selected === TAB_STATUS.SCAN ? styles.bold : {},
            ]}
          >
            {translation("importPatient")}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 64,
    elevation: 25,
    flexDirection: "row",
    borderTopColor: colors.surface,
    borderTopWidth: 1,
  },
  textBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderColor: colors.textInputBorderColor,
  },
  text: {
    marginLeft: 8,
  },
});
