import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { ECconsciousness } from "../../../../../interfaces";
import { toggleListData } from "./utils";
import { emptyPatient } from "..";

export function Avpu() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const consciousness =
          patient?.consciousness || emptyPatient.consciousness;
        const toggleValue = (value: ECconsciousness) => {
          update({
            consciousness: toggleListData(consciousness, value),
          });
        };

        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("avpu")} />
            </Card.Content>
            <Card.Content style={styles.innerContent}>
              {Object.values(ECconsciousness).map((item) => (
                <ToggleButton
                  label={translation(item)}
                  onSelect={toggleValue}
                  status={consciousness.indexOf(item) !== -1}
                  value={item}
                  key={item}
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
