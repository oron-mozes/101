import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { SectionHeader } from "../../../../form-components/section-header";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { gutter } from "../../../../shared-config";
import { InputField } from "../../../../form-components/input-field";
import { PatientDetails } from "./create-components/patient-details";

export function ReportTab() {
  const translation = useTranslation();
  return (
    <View>
      <PatientDetails />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: gutter * 3,
    borderRadius: 8,
  },
  content: { paddingTop: 0, paddingLeft: 0, paddingRight: 0 },
});
