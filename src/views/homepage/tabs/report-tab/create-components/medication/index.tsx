import { StyleSheet } from "react-native";
import { Card, Icon, Text } from "react-native-paper";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { design } from "../shared-style";
import { MedicationActions } from "./medication-actions";
import { NewMedication } from "./newMedication";
import { useState } from "react";
import { colors, gutter } from "../../../../../../shared-config";

export function MedicationsAndFluidSection() {
  const translation = useTranslation();
  const [showNewMedicationForm, toggleNewMedicationForm] =
    useState<boolean>(false);
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("medicationsAndFluid")} />
      </Card.Content>
      <MedicationActions />
      {showNewMedicationForm && (
        <NewMedication onClose={() => toggleNewMedicationForm(false)} />
      )}

      {!showNewMedicationForm && (
        <Card.Content style={[styles.innerContent, styles.addItemAction]}>
          <Icon size={20} source="plus" color={colors.primary} />
          <Text
            style={{ color: colors.primary, fontSize: 17 }}
            onPress={() => {
              toggleNewMedicationForm(true);
            }}
          >
            {translation("addAction")}
          </Text>
        </Card.Content>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    ...design.card,
  },
  content: { ...design.content },
  addItemAction: {
    justifyContent: "flex-start",
    margin: gutter,
  },
  innerContent: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
