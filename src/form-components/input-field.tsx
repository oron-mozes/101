import { StyleSheet, View } from "react-native";
import { Icon, TextInput } from "react-native-paper";
import { textColor } from "./shared-style";
import { borderRadius, colors } from "../shared-config";

export interface IInputField {
  onChange(value: string | number): void;
  label: string;
  disabled?: boolean;
  numeric?: boolean;
  icon?: string;
  value?: string | number;
}
export function InputField({
  label,
  onChange,
  disabled = false,
  value = "",
  numeric = false,
  icon,
}: IInputField) {
  return (
    <View style={[styles.container]}>
      {icon && (
        <View style={[styles.icon]}>
          <Icon source={icon} size={20} />
        </View>
      )}
      <TextInput
        style={[styles.text]}
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
  container: {
    flexDirection: "row",
    alignContent: "center",
    flex: 1,
    margin: 4,
    backgroundColor: colors.textInputBG,
    borderRadius: borderRadius,
    textAlign: "right",
    alignItems: "center",
    borderColor: colors.textInputBorderColor,
    borderWidth: 1,
    color: textColor,
  },
  text: {
    flex: 1,
    textAlign: "right",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  icon: {
    marginLeft: 4,
  },
});
