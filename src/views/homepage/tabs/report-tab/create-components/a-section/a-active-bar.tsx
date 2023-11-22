import { StyleSheet, View } from "react-native";
import { RadioGroup } from "../../../../../../form-components/radio-group";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { TOGGLE } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { convertToOptions } from "../utils";
import { isSuccessful } from "./utils";

export function AActiveBar() {
  const translation = useTranslation();
  const toggleFulfill = usePatientRecordsStore(
    (state) => state.airway_handlers.toggleFulfill
  );
  const fulfill = usePatientRecordsStore(
    (state) => state.activePatient.airway.fulfill
  );

  return (
    <RadioGroup
      testID="airway-fulfill"
      horizontal
      label={translation("airWayInjury")}
      onSelect={(id: string) => {
        toggleFulfill(id === TOGGLE.YES);
      }}
      selected={isSuccessful(fulfill)}
      options={convertToOptions(TOGGLE, translation)}
    />
  );
}

const styles = StyleSheet.create({});
