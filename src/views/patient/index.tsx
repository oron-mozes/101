import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import storage, { STORAGE } from "../../../storage";
import { RootStackParamList } from "../../routes";
import Context from "./context";
import { PersonalInformation } from "./partials/personal-information";
import QrCode from "../qr-code";
import { ICareTeamMember } from "../user";

interface IPersonalInformation {
  full_name: string;
  idf_id: number;
}
interface IIncidentInformation {
  injury_time: Date;
  care_time: Date;
  date: Date;
}

interface IInjury {}
type TCconsciousness = "awake" | "voice" | "pain" | "none";

export interface IPatientRecord {
  id?: string;
  personal_information: IPersonalInformation;
  incident_information: IIncidentInformation;
  care_team: ICareTeamMember[];
  injuries: IInjury[];
  consciousness: TCconsciousness[];
}

export const emptyPatient: IPatientRecord = {
  personal_information: {
    full_name: "",
    idf_id: 0,
  },
  incident_information: {
    injury_time: new Date(),
    care_time: new Date(),
    date: new Date(),
  },
  care_team: [],
  injuries: [],
  consciousness: [],
};
interface IProps extends NativeStackScreenProps<RootStackParamList> {}

export function PatientForm({ route }: IProps) {
  const [patientRecord, setPatientRecord] = useState<IPatientRecord>(
    route?.params?.patient || emptyPatient
  );
  const id = useMemo(() => new Date().getTime().toString(), []);

  useEffect(() => {
    storage.load({ key: STORAGE.USER }).then((user) => {
      if (
        patientRecord.care_team?.[patientRecord.care_team.length - 1]
          ?.idf_id !== user.idf_id
      ) {
        patientRecord.care_team.push(user);
        setPatientRecord(patientRecord);
      }
    });
  }, []);
  return (
    <Context.Provider
      value={{
        patient: patientRecord,
        update: (value) => {
          const selectedId = patientRecord.id || id;

          const updateData = { ...patientRecord, ...value, id: selectedId };

          setPatientRecord(updateData);
          storage.save({
            key: STORAGE.PATIENTS_RECORD,
            id: selectedId,
            data: updateData,
          });
        },
      }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <QrCode />
          <PersonalInformation />
        </ScrollView>
      </SafeAreaView>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    direction: "rtl",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: "100%",
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
