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
      onChangeText={(text) => onChange(text)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(222, 231, 237, 1)",
    borderRadius: 20,
    margin: 4,
  },
});
