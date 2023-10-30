import { useContext, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { emptyPatient } from "..";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { EEsectionChips } from "../../../../../interfaces";
import Context from "../context";
import { design } from "./shared-style";
import { isSelectedHandler, toggleListData } from "./utils";

export function ESection() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update } = context;
  const eSection = useMemo(
    () => patient?.eSection || emptyPatient.eSection,
    [patient?.eSection]
  );
  const toggleValue = (value: EEsectionChips) => {
    update({ eSection: toggleListData(eSection, value) });
  };
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
            onSelect={() => toggleValue(item)}
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
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
