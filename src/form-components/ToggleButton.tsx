import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RadioButton as RadioButtonPaper, Text } from "react-native-paper";
import { textColor } from "./shared-style";
import { colors, gutter } from "../shared-config";
export interface IRadioButton {
  onSelect(e: boolean): void;
  label: string;
  editable?: boolean;
  status?: boolean;
}
export function ToggleButton({
  label,
  onSelect,
  editable = true,
  status = false,
}: IRadioButton) {
  return (
    <TouchableOpacity onPress={() => onSelect(!status)}>
      <View style={styles.container}>
        <RadioButtonPaper
          disabled={!editable}
          onPress={() => onSelect(!status)}
          value={""}
          status={status ? "checked" : "unchecked"}
        />
        <Text
          style={[styles.text, !editable ? styles.disabled : {}]}
          disabled={!editable}
          onPress={() => onSelect(!status)}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
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
    paddingRight: 10,
    paddingLeft: 5,
    height: 40,
    marginLeft: gutter,
    marginBottom: gutter,
  },
});
