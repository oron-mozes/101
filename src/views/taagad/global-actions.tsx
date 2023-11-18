import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "../../hooks/useMyTranslation";
import { StackNavigation } from "../../interfaces";
import { ROUTES } from "../../routes";
import { usePatientRecordsStore } from "../../store/patients.record.store";

export function GlobalActions() {
  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();

  const deletePatients = usePatientRecordsStore(
    (state) => state.deletePatients
  );
  const patients = usePatientRecordsStore((state) => state.patients);
  const setActivePatient = usePatientRecordsStore(
    (state) => state.setActivePatient
  );
  const confirmDelete = () => {
    Alert.alert(
      "מחיקת תיקים רפואיים",
      "הינך עומד.ת למחוק את כל התיקים הרפואיים ששמורים במכשיר. אנא וודא.י ייצוא ושמירה של המידע לפני המשך הפעולה.",
      [
        {
          text: "ביטול",
          style: "cancel",
        },
        {
          text: "אני מאשר.ת",
          onPress: async () => {
            await deletePatients();

            navigation.navigate(ROUTES.HOME);
          },
        },
      ]
    );
  };

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
        onPress={confirmDelete}
      >
        {translation("delete")}
      </Button>

      {/* <Button
        mode="contained"
        textColor="#fff"
        style={{ backgroundColor: "blue", marginTop: 100 }}
        onPress={async () => {
          changeCurrentPatientIndex(0);
          setActivePatient(patients[0]);
        }}
      >
        {translation("share")}
      </Button> */}
    </View>
  );
}
