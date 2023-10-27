import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";

export function Prognosis() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("prognosis")} />
            </Card.Content>

            <Card.Content style={[styles.innerContent]}>
              <InputField
                numberOfLines={5}
                onChange={(prognosis: string) => {
                  update({
                    prognosis: prognosis,
                  });
                }}
                value={patient.prognosis}
                label={translation("prognosis")}
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
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
