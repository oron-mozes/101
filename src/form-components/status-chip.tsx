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
  editable?: boolean;
}
export function StatusChip({
  allowSelect = false,
  selected = false,
  label,
  status,
  onSelect,
  editable = true,
}: IStatusChipProps) {
  return (
    <View style={[styles.container, priority[status]]}>
      {allowSelect && (
        <RadioButtonPaper
          disabled={!editable}
          onPress={() => {
            onSelect(label);
          }}
          value={"Test"}
          status={selected ? "checked" : "unchecked"}
        />
      )}
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    ...chipText,
    textAlign: "left",
    fontSize: 17,
  },
  container: {
    ...chipContainer,
    // padding: 10,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
});
