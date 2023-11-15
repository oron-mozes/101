import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { textColor } from "./shared-style";
import { colors } from "../shared-config";

export interface ICheckButton {
  onSelect(e: any): void;
  label: string;
  editable?: boolean;
  checked?: boolean;
  style?: { color?: string; backgroundColor?: string };
}
export function CheckButton({
  label,
  onSelect,
  editable = true,
  checked = false,
  style = {},
}: ICheckButton) {
  return (
    <Button
      // mode="contained"
      onPress={(e) => {
        onSelect(e);
      }}
      disabled={!editable}
      style={[styles.container, checked ? styles.checked : {}, style]}
    >
      <Text style={{ color: checked ? style?.color ?? "#fff" : textColor }}>
        {label}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  checked: {
    backgroundColor: colors.active,
  },
  container: {
    backgroundColor: colors.radio,
    borderRadius: 20,
    margin: 4,
    height: 40,
  },
});
