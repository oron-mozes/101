import React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton as RadioButtonPaper, Text } from "react-native-paper";
import { STATUS } from "../interfaces";
import { chipContainer, chipText, priority } from "./shared-style";

export interface IStatusChipProps {
  status: STATUS;
  label: string;
  allowSelect?: boolean;
  selected?: boolean;
  onSelect?(status: string): void;
  editable?: boolean;
  testID: string;
}
export function StatusChip({
  allowSelect = false,
  selected = false,
  label,
  status,
  onSelect,
  editable = true,
  testID,
}: IStatusChipProps) {
  return (
    <View style={[styles.container, priority[status]]}>
      {allowSelect && (
        <RadioButtonPaper
          testID={`${testID ? `${testID}-` : ""}-chip`}
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
    fontSize: 14,
  },
  container: {
    ...chipContainer,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
});
