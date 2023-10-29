import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { TCconsciousness } from "../../../../../interfaces";
import { toggleListData } from "./utils";

export function Avpu() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const toggleValue = (value: TCconsciousness) => {
          update({
            consciousness: toggleListData(patient.consciousness, value),
          });
        };

        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("avpu")} />
            </Card.Content>
            <Card.Content style={styles.innerContent}>
              <ToggleButton
                label={translation("avpuAwake")}
                onSelect={toggleValue}
                status={patient.consciousness.indexOf("awake") !== -1}
                value={"awake"}
              />
              <ToggleButton
                label={translation("avpuVoice")}
                status={patient.consciousness.indexOf("voice") !== -1}
                onSelect={toggleValue}
                value={"voice"}
              />
              <ToggleButton
                label={translation("avpuPain")}
                onSelect={toggleValue}
                status={patient.consciousness.indexOf("pain") !== -1}
                value={"pain"}
              />
              <ToggleButton
                label={translation("avpuUnReponsive")}
                onSelect={toggleValue}
                status={patient.consciousness.indexOf("none") !== -1}
                value={"none"}
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
