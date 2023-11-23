import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { design } from "../shared-style";
import { MedicationActions } from "./medication-actions";
import { NewMedication } from "./new-medication";

export function MedicationsAndFluidSection() {
  const translation = useTranslation();

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("medicationsAndFluid")} />
      </Card.Content>
      <MedicationActions />
      <NewMedication />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    ...design.card,
  },
  content: { ...design.content },
});
