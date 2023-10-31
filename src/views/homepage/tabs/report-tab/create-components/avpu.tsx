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
import { useContext, useMemo } from "react";

export function Avpu() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update, disabled } = context;
  const consciousness = useMemo(
    () => patient?.consciousness || emptyPatient.consciousness,
    [patient?.consciousness]
  );
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
            disabled={disabled}
            label={translation(item)}
            onSelect={() => toggleValue(item)}
            status={consciousness.indexOf(item) !== -1}
            key={item}
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
