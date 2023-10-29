import { StyleSheet, Text, View } from "react-native";
import { CheckButton } from "./select-button";

export function RadioGroup({
  label,
  options,
  onSelect,
  selected,
  horizontal = false,
}: {
  horizontal?: boolean;
  selected: string;
  onSelect(id: string): void;
  options: { id: string; value: string }[];
  label: string;
}) {
  return (
    <View style={[horizontal ? styles.horizontal : styles.vertical]}>
      <Text style={{ marginRight: horizontal ? 0 : 10 }}>{label}</Text>
      <View style={[styles.horizontal]}>
        {options.map((option) => (
          <CheckButton
            key={option.id}
            label={option.value}
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
    flexDirection: "row-reverse",
    alignItems: "center",
    flex: 1,
  },
  vertical: {},
});