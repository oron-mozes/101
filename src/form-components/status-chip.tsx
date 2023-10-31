import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";
import { STATUS } from "../interfaces";
import { chipContainer, chipText, priority } from "./shared-style";
import React from "react";
import { RadioButton as RadioButtonPaper, Text } from "react-native-paper";

export interface IStatusChipProps {
  status: STATUS;
  label: string;
  allowSelect?: boolean;
  selected?: boolean;
  onSelect?(status: string): void;
  disabled: boolean;
}
export function StatusChip({
  allowSelect = false,
  selected = false,
  label,
  status,
  onSelect,
  disabled,
}: IStatusChipProps) {
  return (
    <View
      style={[
        styles.container,
        priority[status],
        allowSelect ? styles.withSelect : {},
      ]}
    >
      <Text>{label}</Text>
      {allowSelect && (
        <RadioButtonPaper
          disabled={disabled}
          onPress={() => {
            onSelect(label);
          }}
          value={"Test"}
          status={selected ? "checked" : "unchecked"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  withSelect: {
    height: 80,
  },
  text: {
    ...chipText,
  },
  container: {
    ...chipContainer,
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 8,
  },
});
