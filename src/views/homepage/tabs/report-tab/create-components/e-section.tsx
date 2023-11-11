import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { EEsectionChips } from "../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";
import { isSelectedHandler } from "./utils";
import { useState } from "react";

export function ESection() {
  const eSection = usePatientRecordsStore(
    (state) => state.activePatient.eSection
  );
  const handlers = usePatientRecordsStore((state) => state.esection_handlers);

  const [selected, forceUpdate] = useState<EEsectionChips[]>([]);

  const translation = useTranslation();
  const isSelected = isSelectedHandler(eSection);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("eSection")} />
      </Card.Content>
      <Card.Content style={styles.innerContent}>
        {Object.values(EEsectionChips).map((item) => (
          <ToggleButton
            key={item}
            label={translation(item)}
            status={isSelected(item)}
            onSelect={() => {
              forceUpdate([item]);
              handlers.toggleSelection(item);
            }}
          />
        ))}
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
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 10,
  },
});
