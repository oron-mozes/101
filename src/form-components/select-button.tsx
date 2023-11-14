import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { textColor } from "./shared-style";
import { colors } from "../shared-config";

export interface ICheckButton {
  onSelect(e: any): void;
  label: string;
  editable?: boolean;
  checked?: boolean;
  style?: object;
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
      mode="contained"
      onPress={(e) => {
        onSelect(e);
      }}
      disabled={!editable}
      style={[styles.container, checked ? styles.checked : {}, style]}
      textColor={checked ? "#fff" : textColor}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  checked: {
    backgroundColor: colors.active,
    color: colors.textInputBG,
  },
  container: {
    backgroundColor: colors.radio,
    borderRadius: 20,
    margin: 4,
    height: 40,
  },
});
