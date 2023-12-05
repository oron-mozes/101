import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { DatePicker } from "../../../../../../form-components/date-picker";
import { InputField } from "../../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";
import { DropDown } from "../../../../../../form-components/dropdown";
import { convertToOptions } from "../utils";
import { EEnvironment } from "../../../../../../interfaces";

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
      {/* <Card.Content style={[styles.innerContent]}>
        <InputField
          testID="unit"
          label={translation("unit")}
          onChange={(unit: string) => {
            handlers.setUnit(unit);
          }}
          value={personal_information.unit}
        />
        <DropDown
          testID="environment"
          label={translation("environment")}
          options={convertToOptions(Object.values(EEnvironment), translation)}
          initialValue={personal_information.environment}
          onSelect={(environment) => {
            handlers.setEnvironment(environment.id as EEnvironment);
          }}
        />
      </Card.Content> */}
      <Card.Content style={[styles.innerContent]}>
        <View style={styles.personalInfo}>
          <TimePicker
            testID="care-time"
            value={incident_information.care_time ?? new Date().getTime()}
            label={translation("timeOfTreatment")}
            onChange={(care_time: number) => {
              care_time !== incident_information.care_time &&
                inc_handlers.setCareTime(care_time);
            }}
          />
          <TimePicker
            testID="injury-time"
            value={incident_information.injury_time ?? new Date().getTime()}
            label={translation("timeOfInjury")}
            onChange={(injury_time: number) => {
              incident_information.injury_time !== injury_time &&
                inc_handlers.setTime(injury_time);
            }}
          />
        </View>
        <DatePicker
          testID="injury"
          value={incident_information.date ?? new Date().getTime()}
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
