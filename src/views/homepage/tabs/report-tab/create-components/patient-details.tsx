import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { DatePicker } from "../../../../../form-components/date-picker";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { mergeData } from "./utils";
import { emptyPatient } from "..";
import { useContext } from "react";

export function PatientDetails() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update } = context;
  const personal_information = mergeData(
    patient?.personal_information,
    emptyPatient.personal_information
  );
  const incident_information = mergeData(
    patient?.incident_information,
    emptyPatient.incident_information
  );

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("accountTitle")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          label={translation("idf_id")}
          maxLength={7}
          onChange={(idf_id: number) => {
            update({
              personal_information: {
                ...personal_information,
                idf_id,
              },
            });
          }}
          numeric
          value={personal_information?.idf_id?.toString()}
        />
        <InputField
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
