import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { TE } from "../../../../../interfaces";

export function ESection() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const toggleValue = (value: TE) => {
          const hasValue = patient.e.find((c) => c === value);
          let newList: TE[] = patient.e;
          if (hasValue) {
            newList = newList.filter((c) => c !== value);
          } else {
            newList.push(value);
          }

          update({ e: newList });
        };
        const isSelected = (value) => patient.e?.indexOf(value) !== -1;

        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("eSection")} />
            </Card.Content>
            <Card.Content style={styles.innerContent}>
              <ToggleButton
                label={translation("undressing")}
                status={isSelected("undressing")}
                onSelect={toggleValue}
                value="undressing"
              />
              <ToggleButton
                label={translation("flipping")}
                onSelect={toggleValue}
                status={isSelected("flipping")}
                value="flipping"
              />
              <ToggleButton
                label={translation("splinting")}
                onSelect={toggleValue}
                status={isSelected("splinting")}
                value="splinting"
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
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
