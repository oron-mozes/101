import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import { createPDFWithImage } from "../../utils/create-pdf";

export function YakarScreen() {
  const patients = usePatientRecordsStore((state) => state.patients);
  const p = patients[0];

  return (
    <View>
      <Text>Yakar </Text>

      <Button
        onPress={() => {
          createPDFWithImage(p);
        }}
      >
        generate
      </Button>
    </View>
  );
}

export default YakarScreen;
