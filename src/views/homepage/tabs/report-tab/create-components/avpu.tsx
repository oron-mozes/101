import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { ECconsciousness } from "../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";
import { CheckButton } from "../../../../../form-components/select-button";

export function Avpu() {
  const translation = useTranslation();
  const consciousness = usePatientRecordsStore(
    (state) => state.activePatient.consciousness ?? []
  );

  const handlers = usePatientRecordsStore(
    (state) => state.consciousness_handlers
  );
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.editable
  );

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("avpu")} />
      </Card.Content>
      <Card.Content style={styles.innerContent}>
        {Object.values(ECconsciousness).map((item) => (
          <CheckButton
            label={translation(item)}
            onSelect={() => handlers.toggleConsciousness(item)}
            checked={consciousness.indexOf(item) !== -1}
            key={item}
          />
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: design.card,
  content: design.content,
  innerContent: {
    flexDirection: "row",
    marginTop: 10,
  },
});
