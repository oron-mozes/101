import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../../form-components/ToggleButton";
import { InputField } from "../../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { EInjuryReason } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";
import { isSelectedHandler } from "../utils";

export function InjuryReason() {
  const translation = useTranslation();
  const reasons = usePatientRecordsStore(
    (state) => state.activePatient.injuryReason.reasons
  );
  const circumstance = usePatientRecordsStore(
    (state) => state.activePatient.injuryReason.circumstance
  );
  const handlers = usePatientRecordsStore(
    (state) => state.injuryReason_handlers
  );

  const isSelected = isSelectedHandler(reasons ?? []);

  return (
    <Card style={styles.card} testID="injury-reason-card">
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("injuryReason")} />
      </Card.Content>
      <Card.Content style={styles.innerContent}>
        {Object.values(EInjuryReason).map((item) => (
          <ToggleButton
            testID={`injury-reason-${item}`}
            key={item}
            label={translation(item)}
            status={isSelected(item)}
            onSelect={() => handlers.toggleReason(item)}
          />
        ))}
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          testID="injury-circumstance"
          placeholder={translation("injuryReasonPlaceholder")}
          onChange={(circumstance: string) => {
            handlers.setCircumstance(circumstance);
          }}
          value={circumstance}
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
