import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { DatePicker } from "../../../../../form-components/date-picker";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";

import { design } from "./shared-style";
import { useEffect } from "react";

export function PatientDetails() {
  const { full_name, idf_id } = usePatientRecordsStore(
    (state) => state.activePatient.personal_information
  );
  const incident_information = usePatientRecordsStore(
    (state) => state.activePatient.incident_information
  );
  const incidentHandlers = usePatientRecordsStore(
    (state) => state.incident_information_handlers
  );
  const handlers = usePatientRecordsStore((state) => {
    return state.personal_information_handlers;
  });

  const updatePartialPatient = usePatientRecordsStore((state) => {
    return state.updatePartialPatient;
  });

  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.editable
  );

  const translation = useTranslation();
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("accountTitle")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          editable={disabled}
          label={translation("patientName")}
          onChange={(full_name: string) => {
            handlers.setFullName(full_name);
          }}
          value={full_name}
        />
        <InputField
          editable={disabled}
          label={translation("idf_id")}
          maxLength={7}
          onChange={(idf_id) => {
            handlers.setIdf(Number(idf_id));
          }}
          numeric
          value={idf_id?.toString()}
        />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <DatePicker
          disabled={disabled}
          value={incident_information.date ?? new Date().getTime()}
          label={translation("date")}
          onChange={(date: number) => {
            incidentHandlers.setDate(date);
          }}
        />

        <View style={styles.personalInfo}>
          <TimePicker
            editable={disabled}
            value={incident_information.care_time ?? new Date().getTime()}
            label={translation("timeOfTreatment")}
            onChange={(care_time: number) => {
              incidentHandlers.setCareTime(care_time);
            }}
          />
          <TimePicker
            editable={disabled}
            value={incident_information.injury_time ?? new Date().getTime()}
            label={translation("timeOfInjury")}
            onChange={(injury_time: number) => {
              incidentHandlers.setTime(injury_time);
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  personalInfo: {
    flex: 1,
    flexDirection: "row",
  },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
