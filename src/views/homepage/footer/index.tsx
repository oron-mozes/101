import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { TAB_STATUS } from "..";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { colors } from "../../../shared-config";
import { StatusIcon } from "./status-icon";
import { PatientCareIcon } from "./patient-care-icon";

export function HomepageFooter({
  onViewChange,
  selected,
}: {
  selected: TAB_STATUS;
  onViewChange(view: TAB_STATUS): void;
}) {
  const translation = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onViewChange(TAB_STATUS.SCAN)}>
        <View style={styles.textBox}>
          <StatusIcon active={selected === TAB_STATUS.SCAN} />
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
      <TouchableWithoutFeedback onPress={() => onViewChange(TAB_STATUS.CREATE)}>
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
      <TouchableWithoutFeedback onPress={() => onViewChange(TAB_STATUS.STATUS)}>
        <View style={styles.textBox}>
          <PatientCareIcon active={selected === TAB_STATUS.STATUS} />

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
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderColor: colors.textInputBorderColor,
  },
  text: {
    marginRight: 8,
  },
});
