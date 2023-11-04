import { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { emptyPatient } from "..";
import { DatePicker } from "../../../../../form-components/date-picker";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { convertStringToNumber, mergeData } from "./utils";

export function PatientDetails() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update, disabled } = context;
  const personal_information = useMemo(
    () =>
      mergeData(patient?.personal_information, {
        ...emptyPatient.personal_information,
        full_name: patient.id,
      }),
    [patient?.personal_information, patient.id]
  );

  const incident_information = mergeData(
    patient?.incident_information,
    emptyPatient.incident_information
  );
  useEffect(() => {
    if (personal_information.full_name) {
      console.log("update name", personal_information.full_name);
      update({
        personal_information,
      });
    }
  }, []);
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("accountTitle")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          disabled={disabled}
          label={translation("idf_id")}
          maxLength={7}
          onChange={(idf_id) => {
            update({
              personal_information: {
                ...personal_information,
                idf_id: convertStringToNumber(idf_id),
              },
            });
          }}
          numeric
          value={personal_information?.idf_id?.toString()}
        />
        <InputField
          disabled={disabled}
          label={translation("patientName")}
          onChange={(full_name: string) => {
            update({
              personal_information: {
                ...personal_information,
                full_name,
              },
            });
          }}
          value={personal_information.full_name}
        />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <DatePicker
          disabled={disabled}
          value={incident_information.date}
          label={translation("date")}
          onChange={(date: number) => {
            update({
              incident_information: {
                ...incident_information,
                date,
              },
            });
          }}
        />

        <View style={styles.personalInfo}>
          <TimePicker
            disabled={disabled}
            value={incident_information.care_time}
            label={translation("timeOfTreatment")}
            onChange={(care_time: number) => {
              update({
                incident_information: {
                  ...incident_information,
                  care_time,
                },
              });
            }}
          />
          <TimePicker
            disabled={disabled}
            value={incident_information.injury_time}
            label={translation("timeOfInjury")}
            onChange={(injury_time: number) => {
              update({
                incident_information: {
                  ...incident_information,
                  injury_time,
                },
              });
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
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
