import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { gutter } from "../../../../../shared-config";
import { design } from "./shared-style";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { useState } from "react";
import {
  IPatientRecord,
  IPersonalInformation,
} from "../../../../../interfaces";
export function PatientDetails() {
  const translation = useTranslation();
  const [patientInfo, updatePatientInfo] = useState<IPersonalInformation>();
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("accountTitle")} />
        <View style={styles.personalInfo}>
          <InputField
            label={translation("idfId")}
            onChange={(idf_id: string) => {}}
            numeric
            value={patientInfo?.idf_id}
          />
          <InputField
            label={translation("patientName")}
            onChange={(full_name: string) => {}}
            value={patientInfo?.full_name}
          />
        </View>
        <View style={styles.personalInfo}>
          <InputField
            label={translation("idfId")}
            onChange={(idf_id: string) => {}}
            numeric
            value={patientInfo?.idf_id}
          />
          <InputField
            label={translation("patientName")}
            onChange={(full_name: string) => {}}
            value={patientInfo?.full_name}
          />
          <InputField
            label={translation("idfId")}
            onChange={(idf_id: string) => {}}
            numeric
            value={patientInfo?.idf_id}
          />
          <InputField
            label={translation("patientName")}
            onChange={(full_name: string) => {}}
            value={patientInfo?.full_name}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  personalInfo: { flexDirection: "row", justifyContent: "space-between" },
  card: {
    ...design.card,
  },
  content: { paddingTop: 0, paddingLeft: 0, paddingRight: 0 },
});
