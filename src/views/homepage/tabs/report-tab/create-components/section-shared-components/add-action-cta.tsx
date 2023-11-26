import { View } from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { inputFontSize } from "../../../../../../shared-config";

export function AddActionCTA({
  testID,
  valid,
  saveNewAction,
}: {
  saveNewAction(): void;
  testID: string;
  valid: boolean;
}) {
  const translation = useTranslation();

  return (
    <View style={{ alignItems: "center", flexDirection: "row" }}>
      <Button
        mode={valid ? "contained" : "outlined"}
        testID={`${testID}-action-button`}
        labelStyle={{ fontSize: inputFontSize }}
        icon="plus"
        onPress={saveNewAction}
        disabled={!valid}
      >
        {valid ? translation("save") : translation("addAction")}
      </Button>
    </View>
  );
}
