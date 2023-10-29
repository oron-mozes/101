import { StyleSheet, View } from "react-native";
import { Icon, TextInput } from "react-native-paper";
import { textColor } from "./shared-style";
import { borderRadius, colors, inputContainer } from "../shared-config";

export interface IInputField {
  onChange(value: string | number): void;
  label: string;
  disabled?: boolean;
  numeric?: boolean;
  icon?: string;
  numberOfLines?: number;
  maxLength?: number;
  value?: string | number;
}
export function InputField({
  label,
  onChange,
  disabled = false,
  value = "",
  numeric = false,
  numberOfLines = 1,
  maxLength,
  icon,
}: IInputField) {
  return (
    <View style={[styles.container, numberOfLines > 1 ? styles.fixHeight : {}]}>
      {icon && (
        <View style={[styles.icon]}>
          <Icon source={icon} size={20} />
        </View>
      )}
      <TextInput
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={numberOfLines > 1}
        style={[styles.text, numberOfLines > 1 ? styles.fixHeight : {}]}
        keyboardType={numeric ? "numeric" : "default"}
        disabled={disabled}
        label={label}
        value={value && String(value)}
        textAlign="right"
        mode="outlined"
        textColor={colors.text}
        onChangeText={onChange}
        outlineColor={"transparent"}
        activeOutlineColor={colors.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fixHeight: {
    height: 100,
  },
  container: inputContainer,
  text: {
    flex: 1,
    textAlign: "right",
    alignItems: "flex-end",
    marginBottom: 4,
    width: "100%",
  },
  icon: {
    marginLeft: 4,
  },
});
