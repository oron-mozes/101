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
}: {
  editable?: boolean;
  horizontal?: boolean;
  selected: string;
  onSelect(id: string): void;
  options: IOption[];
  label: string;
}) {
  return (
    <View style={[horizontal ? styles.horizontal : styles.vertical]}>
      <Text style={{ marginRight: horizontal ? 0 : 10 }}>{label}</Text>
      <View style={[styles.horizontal]}>
        {options.map((option) => (
          <CheckButton
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
  vertical: {},
});
