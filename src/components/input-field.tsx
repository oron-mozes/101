import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { textColor } from "./shared-style";

export interface IInputField {
  onChange(value: string): void;
  label: string;
  disabled?: boolean;
  value?: string;
}
export function InputField({
  label,
  onChange,
  disabled = false,
  value = "",
}: IInputField) {
  return (
    <TextInput
      style={[styles.container]}
      disabled={disabled}
      label={label}
      value={value}
      textAlign="right"
      mode="outlined"
      onChangeText={(text) => onChange(text)}
      outlineColor="rgba(190, 207, 218, 1)"
      activeOutlineColor="rgba(0, 36, 77, 1)"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(222, 231, 237, 1)",
    borderRadius: 8,
    margin: 4,
    textAlign: "right",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderColor: "rgba(190, 207, 218, 1)",
  },
});
