import { Icon, Text } from "react-native-paper";
import { colors, inputFontSize } from "../../../../../../shared-config";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { View } from "react-native";

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
      <Icon
        size={20}
        source="plus"
        color={valid ? colors.primary : colors.disabled}
      />
      <Text
        testID={`${testID}-action-button`}
        style={{
          color: valid ? colors.primary : colors.disabled,
          fontSize: inputFontSize,
        }}
        disabled={!valid}
        onPress={saveNewAction}
      >
        {translation("addAction")}
      </Text>
    </View>
  );
}
