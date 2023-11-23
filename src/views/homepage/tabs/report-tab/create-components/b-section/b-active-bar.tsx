import { StyleSheet, View } from "react-native";
import { RadioGroup } from "../../../../../../form-components/radio-group";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { TOGGLE } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { convertToOptions } from "../utils";
import { isSuccessful } from "./utils";

export function BActiveBar() {
  const translation = useTranslation();
  const toggleFulfill = usePatientRecordsStore(
    (state) => state.breathing_handlers.toggleFulfill
  );
  const fulfill = usePatientRecordsStore(
    (state) => state.activePatient.breathing.fulfill
  );

  return (
    <RadioGroup
      testID="breathing-fulfill"
      horizontal
      label={translation("breathingInjury")}
      onSelect={(id: string) => {
        toggleFulfill(id === TOGGLE.YES);
      }}
      selected={isSuccessful(fulfill)}
      options={convertToOptions(TOGGLE, translation)}
    />
  );
}

const styles = StyleSheet.create({});
