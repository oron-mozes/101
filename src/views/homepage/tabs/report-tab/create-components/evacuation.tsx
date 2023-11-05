import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
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
  const handlers = usePatientRecordsStore((state) => state.evacuation_handlers);

  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.disabled
  );

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("evacuate")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={{ width: 120 }}>
          <TimePicker
            disabled={disabled}
            label={translation("time")}
            onChange={(time: number) => {
              handlers.setTime(time);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <InputField
            disabled={disabled}
            value={evacuation.destination}
            label={translation("destination")}
            onChange={(destination: string) => {
              handlers.setDestination(destination);
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
            disabled={disabled}
            key={item}
            label={translation(item)}
            status={evacuation.transportation === item}
            onSelect={() => handlers.setTransportation(item)}
          />
        ))}
      </Card.Content>
      <Card.Content style={styles.innerContent}>
        {Object.values(STATUS).map((item) => (
          <StatusChip
            disabled={disabled}
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
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 10,
  },
});
