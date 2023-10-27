import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import storage, { STORAGE } from "../../../storage";
import { IPatientRecord, IProps, STATUS } from "../../interfaces";
import Context from "./context";
import { PersonalInformation } from "./partials/personal-information";

export const emptyPatient: IPatientRecord = {
  personal_information: {
    full_name: "",
    idf_id: 0,
  },
  incident_information: {
    injury_time: new Date(),
    care_time: new Date(),
    date: new Date(),
    status: STATUS.ACTIVE,
  },
  care_team: [],
  injuries: [],
  consciousness: [],
};

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

          const updateData: IPatientRecord = {
            ...patientRecord,
            ...value,
            id: selectedId,
          };

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
