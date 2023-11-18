import { StyleSheet, View } from "react-native";
import { Card, Checkbox, Text } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { StatusChip } from "../../../../../form-components/status-chip";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { ETransportation, STATUS } from "../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";

export function Evacuation() {
  const translation = useTranslation();
  const evacuation = usePatientRecordsStore(
    (state) => state.activePatient.evacuation
  );
  const destination = usePatientRecordsStore(
    (state) => state.activePatient.evacuation.destination
  );
  const time = usePatientRecordsStore(
    (state) => state.activePatient.evacuation.time ?? new Date().getTime()
  );
  const transportation = usePatientRecordsStore(
    (state) => state.activePatient.evacuation.transportation
  );
  const special_care = usePatientRecordsStore(
    (state) => state.activePatient.evacuation.special_care
  );
  const handlers = usePatientRecordsStore((state) => state.evacuation_handlers);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("evacuate")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={{ flex: 1 }}>
          <InputField
            value={destination}
            label={translation("destination")}
            onChange={(destination: string) => {
              handlers.setDestination(destination);
            }}
          />
        </View>
        <View style={{ width: 120 }}>
          <TimePicker
            value={time}
            label={translation("actionTime")}
            onChange={(time: number) => {
              handlers.setTime(time);
            }}
          />
        </View>
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={{ flex: 1 }}></View>
      </Card.Content>
      <Card.Content style={styles.innerContent}>
        {Object.values(ETransportation).map((item) => (
          <ToggleButton
            key={item}
            label={translation(item)}
            status={transportation === item}
            onSelect={() => handlers.setTransportation(item)}
          />
        ))}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={special_care ? "checked" : "unchecked"}
            onPress={() => handlers.setSpecialCare(!special_care)}
          />
          <Text>{translation("SPECIAL_CARE")}</Text>
        </View>
      </Card.Content>
      <Card.Content style={styles.innerContent}>
        {Object.values(STATUS).map((item) => (
          <StatusChip
            key={item}
            label={translation(item)}
            status={item}
            allowSelect
            selected={evacuation.status === item}
            onSelect={() => {
              handlers.setStatus(item);
            }}
          />
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  signature: {
    height: 100,
    width: 100,
    flex: 1,
  },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 10,
  },
});
