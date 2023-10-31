import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { RadioButton as RadioButtonPaper, Text } from "react-native-paper";
import { textColor } from "./shared-style";
import { colors, gutter } from "../shared-config";
export interface IRadioButton {
  onSelect(e: boolean): void;
  label: string;
  disabled: boolean;
  status?: boolean;
}
export function ToggleButton({
  label,
  onSelect,
  disabled,
  status = false,
}: IRadioButton) {
  return (
    <TouchableWithoutFeedback onPress={() => onSelect(!status)}>
      <View style={styles.container}>
        <Text
          style={[styles.text, disabled ? styles.disabled : {}]}
          disabled={disabled}
        >
          {label}
        </Text>
        <RadioButtonPaper
          disabled={disabled}
          onPress={() => onSelect(!status)}
          value={""}
          status={status ? "checked" : "unchecked"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  disabled: {
    color: colors.disabled,
  },
  text: {
    fontSize: 16,
    color: textColor,
  },
  container: {
    backgroundColor: colors.radio,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
    height: 40,
    marginLeft: gutter,
    marginBottom: gutter,
  },
});
