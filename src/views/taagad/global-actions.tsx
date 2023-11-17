import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
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

  return (
    <>
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
            generateXLSX(patients);
          }}
        >
          {translation("share")}
        </Button>
        <BodyPicker />
      </View>
    </>
  );
}
