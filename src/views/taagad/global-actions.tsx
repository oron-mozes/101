import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image } from "react-native";
import { Button } from "react-native-paper";
import { BodyPicker } from "../../components/body-picker";
import { useTranslation } from "../../hooks/useMyTranslation";
import { StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import { generateXLSX } from "../../utils/export-to-xlsx";

export function GlobalActions() {
  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();

  const deletePatients = usePatientRecordsStore(
    (state) => state.deletePatients
  );
  const patients = usePatientRecordsStore((state) => state.patients);
  const activePatient = usePatientRecordsStore((state) => state.activePatient);
  const setActivePatient = usePatientRecordsStore(
    (state) => state.setActivePatient
  );
  const [patientsImage, addPatientImage] = useState<string[]>([]);

  const [currentPatientIndex, changeCurrentPatientIndex] = useState<number>();
  useEffect(() => {
    changeCurrentPatientIndex(0);
    setActivePatient(patients[0]);
  }, []);
  return (
    <View style={{ flexDirection: "row" }}>
      <Button
        mode="contained"
        textColor="#fff"
        style={{
          backgroundColor: "red",
          marginTop: 100,
          marginRight: 30,
        }}
        onPress={async () => {
          await deletePatients();

          navigation.navigate(ROUTES.HOME);
        }}
      >
        {translation("delete")}
      </Button>

      <Button
        mode="contained"
        textColor="#fff"
        style={{ backgroundColor: "blue", marginTop: 100 }}
        onPress={async () => {
          changeCurrentPatientIndex(0);
          setActivePatient(patients[0]);
        }}
      >
        {translation("share")}
      </Button>
    </View>
  );
}
