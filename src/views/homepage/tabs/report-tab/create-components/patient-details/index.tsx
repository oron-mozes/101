import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { DatePicker } from "../../../../../../form-components/date-picker";
import { InputField } from "../../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";

export function PatientDetails() {
  const personal_information = usePatientRecordsStore((state) => ({
    ...state.activePatient.personal_information,
  }));

  const patientId = usePatientRecordsStore(
    (state) => state.activePatient.personal_information.patientId
  );

  const incident_information = usePatientRecordsStore((state) => ({
    ...state.activePatient.incident_information,
  }));
  const { injury_time = new Date().getTime() } = usePatientRecordsStore(
    (state) => ({
      ...state.activePatient.incident_information,
    })
  );
  const care_time = usePatientRecordsStore(
    (state) => state.activePatient.incident_information.care_time
  );

  const handlers = usePatientRecordsStore(
    (state) => state.personal_information_handlers
  );
  const inc_handlers = usePatientRecordsStore(
    (state) => state.incident_information_handlers
  );

  const translation = useTranslation();
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("accountTitle")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <Text variant="bodyLarge">
          {patientId
            ? translation("caseNumber", { case: patientId?.split("|").shift() })
            : ""}
        </Text>
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          testID="patient-name"
          label={translation("patientName")}
          onChange={(full_name: string) => {
            handlers.setFullName(full_name);
          }}
          value={
            personal_information.full_name ?? personal_information.full_name
          }
        />
        <InputField
          testID="idf-id"
          label={translation("idf_id")}
          maxLength={9}
          onChange={(idf_id) => {
            const clean = idf_id
              .split("")
              .filter((c) => c.match(/[0-9]/))
              .join("");
            handlers.setIdf(clean);
          }}
          value={personal_information.idf_id?.toString()}
        />
      </Card.Content>

      <Card.Content style={[styles.innerContent]}>
        <View style={styles.personalInfo}>
          <TimePicker
            testID="care-time"
            value={care_time || new Date().getTime()}
            label={translation("timeOfTreatment")}
            onChange={(_care_time: number) => {
              if (_care_time !== care_time) {
                inc_handlers.setCareTime(_care_time);
              }
            }}
          />
          <TimePicker
            testID="injury-time"
            value={injury_time || new Date().getTime()}
            label={translation("timeOfInjury")}
            onChange={(_injury_time: number) => {
              injury_time !== _injury_time &&
                inc_handlers.setTime(_injury_time);
            }}
          />
        </View>
        <DatePicker
          testID="injury"
          value={incident_information.date}
          label={translation("date")}
          onChange={(date: number) => {
            inc_handlers.setDate(date);
          }}
        />
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

export default PatientDetails;
