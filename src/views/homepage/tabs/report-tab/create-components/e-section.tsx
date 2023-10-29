import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { EEsectionChips, TE } from "../../../../../interfaces";
import { isSelectedHandler, toggleListData } from "./utils";

export function ESection() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const toggleValue = (value: TE) => {
          update({ e: toggleListData(patient.e, value) });
        };
        const isSelected = isSelectedHandler(patient.e);

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
                  onSelect={toggleValue}
                  value={item}
                />
              ))}
            </Card.Content>
          </Card>
        );
      }}
    </Context.Consumer>
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
