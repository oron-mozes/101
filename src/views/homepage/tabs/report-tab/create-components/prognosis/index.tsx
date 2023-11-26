import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { InputField } from "../../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { colors, gutter, inputFontSize } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";

export function Prognosis() {
  const translation = useTranslation();
  const prognosis = usePatientRecordsStore((state) => [
    ...state.activePatient.prognosis,
  ]);

  const updatePrognosis = usePatientRecordsStore(
    (state) => state.updatePrognosis
  );
  const removePrognosis = usePatientRecordsStore(
    (state) => state.removePrognosis
  );

  const [newPrognosis, updateNewPrognosis] = useState<string>("");
  const valid = newPrognosis.length > 0;
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("prognosis")} />
      </Card.Content>

      <Card.Content style={[styles.innerContent]}>
        {prognosis.map((prognosis, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="bodyLarge"
              testID={`prognosis-${index}-text`}
              style={{
                flex: 1,
                verticalAlign: "middle",
              }}
              key={index}
            >
              {prognosis}
            </Text>
            <IconButton
              testID={`remove-prognosis-${index}`}
              size={25}
              icon="delete-outline"
              iconColor={colors.primary}
              onPress={() => {
                removePrognosis(index);
              }}
            />
          </View>
        ))}
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          testID="prognosis"
          onChange={(value: string) => {
            updateNewPrognosis(value);
          }}
          value={newPrognosis}
          label={translation("prognosis")}
        />
      </Card.Content>
      <Card.Content
        style={[styles.innerContent, styles.addItemAction]}
        aria-disabled={!valid}
        testID="add-prognosis-button"
      >
        <Button
          mode={valid ? "contained" : "outlined"}
          testID="add-medication-button-handler"
          labelStyle={{ fontSize: inputFontSize }}
          icon="plus"
          onPress={() => {
            updatePrognosis(newPrognosis);
            updateNewPrognosis("");
          }}
          disabled={!valid}
        >
          {valid ? translation("save") : translation("addPrognosis")}
        </Button>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  addItemAction: {
    justifyContent: "flex-start",
    margin: gutter,
    paddingTop: gutter * 2,
    paddingBottom: gutter * 2,
    alignItems: "center",
  },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});

export default Prognosis;
