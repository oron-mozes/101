import { View } from "react-native";
import { RadioGroup } from "../../../../../../form-components/radio-group";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { TOGGLE } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { convertToOptions } from "../utils";

export function RadAndShock() {
  const translation = useTranslation();
  const handlers = usePatientRecordsStore(
    (state) => state.measurements_handlers
  );
  const shock = usePatientRecordsStore(
    (state) => state.activePatient.measurements.shock
  );
  const palpated = usePatientRecordsStore(
    (state) => state.activePatient.measurements.palpated
  );
  return (
    <>
      <View style={{ flex: 1, width: "50%" }}>
        <RadioGroup
          style={{ width: "70%" }}
          horizontal
          label={translation("palpated")}
          onSelect={(id: string) => {
            handlers.togglePalpated(id === TOGGLE.YES);
          }}
          selected={
            palpated !== null ? (palpated ? TOGGLE.YES : TOGGLE.NO) : null
          }
          options={convertToOptions(TOGGLE, translation)}
        />
      </View>
      <View style={{ flex: 1, width: "50%", margin: 8 }}>
        <RadioGroup
          style={{ width: "40%" }}
          horizontal
          label={translation("shock")}
          onSelect={(id: string) => {
            handlers.toggleShock(id === TOGGLE.YES);
          }}
          selected={shock !== null ? (shock ? TOGGLE.YES : TOGGLE.NO) : null}
          options={convertToOptions(TOGGLE, translation)}
        />
      </View>
    </>
  );
}
