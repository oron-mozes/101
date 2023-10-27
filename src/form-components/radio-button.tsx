import { StyleSheet, View } from "react-native";
import { RadioButton as RadioButtonPaper, Text } from "react-native-paper";
import { textColor } from "./shared-style";
export interface IRadioButton {
  onSelect(e: any): void;
  label: string;
  value: string;
  disabled?: boolean;
  status?: boolean;
}
export function RadioButton({
  label,
  value,
  onSelect,
  disabled = false,
  status = false,
}: IRadioButton) {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, disabled ? styles.disabled : {}]}
        disabled={disabled}
        onPress={() => onSelect(value)}
      >
        {label}
      </Text>
      <RadioButtonPaper
        disabled={disabled}
        onPress={() => {
          !disabled && onSelect(value);
        }}
        value={value}
        status={status ? "checked" : "unchecked"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  disabled: {
    color: "rgba(157, 183, 200, 1)",
  },
  text: {
    fontSize: 17,
    color: textColor,
  },
  container: {
    backgroundColor: "rgba(222, 231, 237, 1)",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
    margin: 5,
    height: 50,
  },
});
