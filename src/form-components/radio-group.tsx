import { StyleSheet, Text, View } from "react-native";
import { IOption } from "../interfaces";
import { CheckButton } from "./select-button";

export function RadioGroup({
  label,
  options,
  onSelect,
  selected,
  horizontal = false,
  editable = true,
  testID,
  style = {},
}: {
  style?: Record<string, unknown>;
  editable?: boolean;
  horizontal?: boolean;
  selected: string;
  testID?: string;
  onSelect(id: string): void;
  options: IOption[];
  label: string;
}) {
  return (
    <View style={[horizontal ? styles.horizontal : styles.vertical, style]}>
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
            checked={selected !== undefined ? selected === option.id : null}
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
