import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { textColor } from "./shared-style";

export interface IInputField {
  onChange(value: string | number): void;
  label: string;
  disabled?: boolean;
  numeric?: boolean;
  value?: string | number;
}
export function InputField({
  label,
  onChange,
  disabled = false,
  value = "",
  numeric = false,
}: IInputField) {
  return (
    <TextInput
      keyboardType={numeric ? "numeric" : "default"}
      style={[styles.container]}
      disabled={disabled}
      label={label}
      value={value && String(value)}
      textAlign="right"
      mode="outlined"
      textColor="rgba(0, 36, 77, 1)"
      onChangeText={onChange}
      outlineColor="rgba(190, 207, 218, 1)"
      activeOutlineColor="rgba(0, 36, 77, 1)"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(222, 231, 237, 1)",
    borderRadius: 8,
    margin: 8,
    textAlign: "right",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderColor: "rgba(190, 207, 218, 1)",
    color: textColor,
  },
});
