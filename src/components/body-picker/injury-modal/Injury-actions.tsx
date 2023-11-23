import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { TimePicker } from "../../../form-components/time-picker";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { colors, inputHeight } from "../../../shared-config";

export function InjuryActions({ onChange }: { onChange(value): void }) {
  const translation = useTranslation();

  return (
    <View style={{ flexDirection: "column" }}>
      <Text>{translation("injuryType")}</Text>

      <View>
        <Text>{translation("TH")}</Text>
        <Checkbox status={true ? "checked" : "unchecked"} onPress={() => {}} />
      </View>
      <TimePicker
        label={translation("actionTime")}
        onChange={(time: number) => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  checked: {
    backgroundColor: colors.active,
    color: colors.textInputBG,
  },
  container: {
    backgroundColor: colors.radio,
    borderRadius: 20,
    margin: 4,
    height: 40,
  },
});
