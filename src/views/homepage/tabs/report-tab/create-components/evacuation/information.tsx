import { InputField } from "../../../../../../form-components/input-field";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { View } from "react-native";

export function EvacInformation() {
  const translation = useTranslation();

  const destination = usePatientRecordsStore(
    (state) => state.activePatient.evacuation.destination
  );
  const time = usePatientRecordsStore(
    (state) => state.activePatient.evacuation.time 
  );
  const handlers = usePatientRecordsStore((state) => state.evacuation_handlers);

  return (
    <>
      <View style={{ width: 120 }}>
        <TimePicker
          value={time}
          label={translation("actionTime")}
          onChange={(newTime: number) => {
            time !== newTime && handlers.setTime(newTime);
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <InputField
          testID="destination"
          value={destination}
          label={translation("destination")}
          onChange={(destination: string) => {
            handlers.setDestination(destination);
          }}
        />
      </View>
    </>
  );
}
