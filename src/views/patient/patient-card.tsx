import { Card, Text } from "react-native-paper";
import { IPatientRecord } from ".";
import { useTranslation } from "../../hooks/useMyTranslation";
import { StyleSheet, StatusBar, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES, StackNavigation } from "../../routes";
import { timeToDate } from "../../utils/date-to-time";

export function PatientCard({ patient }: { patient: IPatientRecord }) {
  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();
  return (
    <View style={styles.container}>
      <Card
        onPress={() => navigation.navigate(ROUTES.REPORT, { patient })}
        style={styles.card}
      >
        <Text style={styles.text}>{translation("personalInformation")}</Text>
        <Text style={styles.text}>
          {translation("personalInformationName")}
          <Text> : </Text>
          {patient?.personal_information?.full_name}
        </Text>
        <Text style={styles.text}>
          {translation("treatmentStartingTime")}
          <Text> : </Text>
          {timeToDate(patient?.incident_information?.care_time)}
        </Text>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    paddingBottom: 10,
  },
  card: {
    width: "95%",
    padding: 10,
  },
  text: {
    textAlign: "right",
  },
});
