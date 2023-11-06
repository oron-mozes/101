import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { EInjuryReason } from "../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";
import { isSelectedHandler } from "./utils";

export function InjuryReason() {
  const translation = useTranslation();
  const injuryReason = usePatientRecordsStore(
    (state) => state.activePatient.injuryReason
  );
  const handlers = usePatientRecordsStore(
    (state) => state.injuryReason_handlers
  );
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.disabled
  );

  const isSelected = isSelectedHandler(injuryReason?.reasons ?? []);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("injuryReason")} />
      </Card.Content>
      <Card.Content style={styles.innerContent}>
        {Object.values(EInjuryReason).map((item) => (
          <ToggleButton
            disabled={disabled}
            key={item}
            label={translation(item)}
            status={isSelected(item)}
            onSelect={() => handlers.toggleReason(item)}
          />
        ))}
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          editable={disabled}
          onChange={(circumstance: string) => {
            handlers.setCircumstance(circumstance);
          }}
          value={injuryReason?.circumstance}
          label={translation("circumstance")}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
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
