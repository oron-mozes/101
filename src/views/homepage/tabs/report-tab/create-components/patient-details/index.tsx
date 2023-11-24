import _ from "lodash";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { DatePicker } from "../../../../../../form-components/date-picker";
import { InputField } from "../../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { createPDFWithImage } from "../../../../../../utils/create-pdf";
import { design } from "../shared-style";

export function PatientDetails() {
  const patient = usePatientRecordsStore((state) => state.activePatient);

  const personal_information = usePatientRecordsStore(
    (state) => state.activePatient.personal_information
  );
  const [personalInfo, setPersonalInfo] = useState({
    full_name: personal_information.full_name ?? "",
    idf_id: personal_information.idf_id ?? null,
    patientId: personal_information.patientId ?? null,
  });
  const incident_information = usePatientRecordsStore(
    (state) => state.activePatient.incident_information
  );
  const [incidentInfo, setIncident] = useState({
    injury_time: incident_information.injury_time ?? new Date().getTime(),
    care_time: incident_information.care_time ?? new Date().getTime(),
    date: incident_information.date ?? new Date().getTime(),
  });

  const updatePartialPatient = usePatientRecordsStore(
    (state) => state.updatePartialPatient
  );

  const translation = useTranslation();

  useEffect(() => {
    return function () {
      if (!_.isEqual(personalInfo, personal_information)) {
        updatePartialPatient({
          personal_information: _.merge(personalInfo, personal_information),
        });
      }
      if (!_.isEqual(incidentInfo, incident_information)) {
        updatePartialPatient({
          incident_information: _.merge(incidentInfo, incident_information),
        });
      }
    };
  }, [personal_information, incident_information]);
  const image = usePatientRecordsStore(
    (state) => state.injuriesImage?.[patient.personal_information.patientId]
  );
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Button
          onPress={() => {
            createPDFWithImage(image, patient);
          }}
        >
          Click
        </Button>
        <SectionHeader label={translation("accountTitle")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          testID="patient-name"
          label={translation("patientName")}
          onChange={(full_name: string) => {
            setPersonalInfo({ ...personalInfo, full_name });
          }}
          value={personalInfo.full_name ?? personal_information.full_name}
        />
        <InputField
          testID="idf-id"
          label={translation("idf_id")}
          maxLength={9}
          onChange={(idf_id) => {
            setPersonalInfo({ ...personalInfo, idf_id: Number(idf_id) });
          }}
          numeric
          value={
            personalInfo.idf_id?.toString() ??
            personal_information.idf_id?.toString()
          }
        />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={styles.personalInfo}>
          <TimePicker
            testID="care-time"
            value={incidentInfo.care_time ?? incidentInfo.care_time}
            label={translation("timeOfTreatment")}
            onChange={(care_time: number) => {
              setIncident(_.merge(incidentInfo, care_time));
            }}
          />
          <TimePicker
            testID="injury-time"
            value={incidentInfo.injury_time ?? incidentInfo.injury_time}
            label={translation("timeOfInjury")}
            onChange={(injury_time: number) => {
              setIncident(_.merge(incidentInfo, injury_time));
            }}
          />
        </View>
        <DatePicker
          testID="injury"
          value={incidentInfo.date ?? incidentInfo.date}
          label={translation("date")}
          onChange={(date: number) => {
            setIncident(_.merge(incidentInfo, date));
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
