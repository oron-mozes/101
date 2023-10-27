import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { DatePicker } from "../../../../../form-components/date-picker";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { IPersonalInformation } from "../../../../../interfaces";
import { design } from "./shared-style";
import Context from "../context";

export function PatientDetails() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("accountTitle")} />
            </Card.Content>
            <Card.Content style={styles.innerContent}>
              <View style={styles.personalInfo}>
                <InputField
                  label={translation("idfId")}
                  onChange={(idf_id: number) => {
                    update({
                      personal_information: {
                        ...patient.personal_information,
                        idf_id,
                      },
                    });
                  }}
                  numeric
                  value={patient.personal_information.idf_id}
                />
                <InputField
                  label={translation("patientName")}
                  onChange={(full_name: string) => {
                    update({
                      personal_information: {
                        ...patient.personal_information,
                        full_name,
                      },
                    });
                  }}
                  value={patient.personal_information.full_name}
                />
              </View>
              <View style={styles.personalInfo}>
                <InputField
                  label={translation("providerTeam")}
                  onChange={(idf_id: string) => {}}
                  numeric
                  value={patient.personal_information.idf_id}
                />

                <DatePicker
                  value={patient.incident_information.date}
                  label={translation("date")}
                  onChange={(date: number) => {
                    update({
                      incident_information: {
                        ...patient.incident_information,
                        date,
                      },
                    });
                  }}
                />
                <TimePicker
                  value={patient.incident_information.care_time}
                  label={translation("timeOfTreatment")}
                  onChange={(care_time: number) => {
                    update({
                      incident_information: {
                        ...patient.incident_information,
                        care_time,
                      },
                    });
                  }}
                />
                <TimePicker
                  value={patient.incident_information.injury_time}
                  label={translation("timeOfInjury")}
                  onChange={(injury_time: number) => {
                    update({
                      incident_information: {
                        ...patient.incident_information,
                        injury_time,
                      },
                    });
                  }}
                />
              </View>
            </Card.Content>
          </Card>
        );
      }}
    </Context.Consumer>
  );
}

const styles = StyleSheet.create({
  personalInfo: { flexDirection: "row", justifyContent: "space-between" },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    ...design.content,
    margin: 4,
    justifyContent: "space-between",
  },
});
