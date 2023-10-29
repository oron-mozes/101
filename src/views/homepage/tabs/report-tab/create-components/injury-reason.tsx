import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { TInjuryReason } from "../../../../../interfaces";
import { InputField } from "../../../../../form-components/input-field";

export function InjuryReason() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const toggleValue = (value: TInjuryReason) => {
          const hasValue = patient.injuryReason.reasons.find(
            (c) => c === value
          );
          let newList: TInjuryReason[] = patient.injuryReason.reasons;
          if (hasValue) {
            newList = newList.filter((c) => c !== value);
          } else {
            newList.push(value);
          }

          update({
            injuryReason: { ...patient.injuryReason, injuryReason: newList },
          });
        };

        const isSelected = (value) =>
          patient.injuryReason.reasons?.indexOf(value) !== -1;
        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("injuryReason")} />
            </Card.Content>
            <Card.Content style={styles.innerContent}>
              <ToggleButton
                label={translation("injuryReasonShooting")}
                status={isSelected("shooting")}
                onSelect={toggleValue}
                value="shooting"
              />
              <ToggleButton
                label={translation("injuryReasonGuided")}
                onSelect={toggleValue}
                status={isSelected("guided")}
                value="guided"
              />
              <ToggleButton
                label={translation("injuryReasonCharge")}
                onSelect={toggleValue}
                status={isSelected("charge")}
                value="splichargenting"
              />
              <ToggleButton
                label={translation("injuryReasonFalling")}
                onSelect={toggleValue}
                status={isSelected("falling")}
                value="splintfallinging"
              />
              <ToggleButton
                label={translation("injuryReasonBlunt")}
                onSelect={toggleValue}
                status={isSelected("blunt")}
                value="blunt"
              />
              <ToggleButton
                label={translation("injuryReasonGas")}
                onSelect={toggleValue}
                status={isSelected("gas")}
                value="gas"
              />
              <ToggleButton
                label={translation("injuryReasonBurns")}
                onSelect={toggleValue}
                status={isSelected("burns")}
                value="burns"
              />
              <ToggleButton
                label={translation("injuryReasonSmoke")}
                onSelect={toggleValue}
                status={isSelected("smoke")}
                value="smoke"
              />
              <ToggleButton
                label={translation("injuryReasonAccident")}
                onSelect={toggleValue}
                status={isSelected("accident")}
                value="accident"
              />
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
