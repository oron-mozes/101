import { StyleSheet, View } from "react-native";
import { BodyPicker } from "../../../../../components/body-picker";
import Context from "../context";
import { Card } from "react-native-paper";
import { SectionHeader } from "../../../../../form-components/section-header";
import { design } from "./shared-style";
import { useTranslation } from "../../../../../hooks/useMyTranslation";

export function PatientBodyPicker() {
  const translation = useTranslation();
  return (
    <Context.Consumer>
      {({ patient, update }) => {
        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("bodyPicker")} />
            </Card.Content>
            <Card.Content style={[styles.innerContent]}>
              <BodyPicker />
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
