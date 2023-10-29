import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { EInjuryReason } from "../../../../../interfaces";
import { InputField } from "../../../../../form-components/input-field";
import { isSelectedHandler, toggleListData } from "./utils";

export function InjuryReason() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const toggleValue = (value: EInjuryReason) => {
          update({
            injuryReason: {
              ...patient.injuryReason,
              reasons: toggleListData(patient.injuryReason.reasons, value),
            },
          });
        };

        const isSelected = isSelectedHandler(patient.injuryReason.reasons);

        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("injuryReason")} />
            </Card.Content>
            <Card.Content style={styles.innerContent}>
              {Object.values(EInjuryReason).map((item) => (
                <ToggleButton
                  key={item}
                  label={translation(item)}
                  status={isSelected(item)}
                  onSelect={toggleValue}
                  value={item}
                />
              ))}
            </Card.Content>
            <Card.Content style={[styles.innerContent]}>
              <InputField
                onChange={(circumstance: string) => {
                  update({
                    injuryReason: { ...patient.injuryReason, circumstance },
                  });
                }}
                value={patient.injuryReason.circumstance}
                label={translation("circumstance")}
              />
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
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 10,
  },
});
