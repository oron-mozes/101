import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { emptyPatient } from "..";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { StatusChip } from "../../../../../form-components/status-chip";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { ETransportation, STATUS } from "../../../../../interfaces";
import Context from "../context";
import { design } from "./shared-style";
import { mergeData } from "./utils";
import { useContext, useMemo } from "react";

export function Evacuation() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update, disabled } = context;
  const evacuation = useMemo(
    () => mergeData(patient?.evacuation, emptyPatient.evacuation),
    [patient?.evacuation]
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
              update({
                evacuation: { ...evacuation, time },
              });
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <InputField
            disabled={disabled}
            value={evacuation.destination}
            label={translation("destination")}
            onChange={(destination: string) => {
              update({
                evacuation: { ...evacuation, destination },
              });
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
            onSelect={() =>
              update({
                evacuation: { ...evacuation, transportation: item },
              })
            }
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
              update({
                evacuation: { ...evacuation, status: item },
              });
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
