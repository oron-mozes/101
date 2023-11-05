import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";

export function Prognosis() {
  const translation = useTranslation();
  const prognosis = usePatientRecordsStore(
    (state) => state.activePatient.prognosis
  );
  const update = usePatientRecordsStore((state) => state.updatePartialPatient);
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.disabled
  );

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("prognosis")} />
      </Card.Content>

      <Card.Content style={[styles.innerContent]}>
        <InputField
          disabled={disabled}
          numberOfLines={5}
          onChange={(value: string) => {
            update({
              prognosis: value,
            });
          }}
          value={prognosis}
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
