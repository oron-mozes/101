import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import Context from "../context";
import { design } from "./shared-style";
import { useContext } from "react";

export function Prognosis() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update, disabled } = context;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("prognosis")} />
      </Card.Content>

      <Card.Content style={[styles.innerContent]}>
        <InputField
          disabled={disabled}
          numberOfLines={5}
          onChange={(prognosis: string) => {
            update({
              prognosis: prognosis,
            });
          }}
          value={patient?.prognosis}
          label={translation("prognosis")}
        />
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
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
