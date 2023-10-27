import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { textColor } from "./shared-style";
import { borderRadius, colors } from "../shared-config";

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
      textColor={colors.text}
      onChangeText={onChange}
      outlineColor={colors.textInputBorderColor}
      activeOutlineColor={colors.text}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textInputBG,
    borderRadius: borderRadius,
    margin: 8,
    textAlign: "right",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderColor: colors.textInputBorderColor,
    color: textColor,
  },
});
