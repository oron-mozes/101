import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { CheckButton } from "./select-button";
import { IOption } from "../interfaces";

export function RadioGroup({
  label,
  options,
  onSelect,
  selected,
  horizontal = false,
  editable = true,
  testID,
}: {
  editable?: boolean;
  horizontal?: boolean;
  selected: string;
  testID?: string;
  onSelect(id: string): void;
  options: IOption[];
  label: string;
}) {
  return (
    <View style={[horizontal ? styles.horizontal : styles.vertical]}>
      <Text
        style={{ flex: 1, marginLeft: 4 }}
        testID={`${testID ? `${testID}-` : ""}radio-label`}
      >
        {label}
      </Text>
      <View style={[styles.horizontal, { flex: 1 }]}>
        {options.map((option) => (
          <CheckButton
            testID={`${testID ? `${testID}-` : ""}radio-${option.id}`}
            editable={editable}
            key={option.id}
            label={option.title}
            onSelect={() => {
              onSelect(option.id);
            }}
            checked={selected === option.id}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  vertical: {
    marginTop: 4,
  },
});
