import { View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { ToggleButton } from "../../../../../../form-components/ToggleButton";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { ETransportation } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";

export function EvacBy() {
  const translation = useTranslation();

  const transportation = usePatientRecordsStore(
    (state) => state.activePatient.evacuation.transportation
  );
  const special_care = usePatientRecordsStore(
    (state) => state.activePatient.evacuation.special_care
  );
  const handlers = usePatientRecordsStore((state) => state.evacuation_handlers);

  return (
    <>
      {Object.values(ETransportation).map((item) => (
        <ToggleButton
          testID={`transportation-${item}`}
          key={item}
          label={translation(item)}
          status={transportation === item}
          onSelect={() => handlers.setTransportation(item)}
        />
      ))}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          testID="special-care"
          status={special_care ? "checked" : "unchecked"}
          onPress={() => handlers.setSpecialCare(!special_care)}
        />
        <Text>{translation("SPECIAL_CARE")}</Text>
      </View>
    </>
  );
}
