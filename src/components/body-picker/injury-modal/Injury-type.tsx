import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { textColor } from "../../../form-components/shared-style";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { colors } from "../../../shared-config";
import { E_InjuryType } from "../../../interfaces";

export function InjuryType({
  onChange,
  options,
  selected,
  title,
}: {
  title: string;
  selected: E_InjuryType;
  options: Partial<E_InjuryType[]>;
  onChange(value): void;
}) {
  const translation = useTranslation();

  return (
    <View>
      <View
        style={{
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Text>{title}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap",
        }}
      >
        {options.map((value) => (
          <Button
            key={value}
            mode="contained"
            onPress={(e) => {
              onChange(value);
            }}
            style={[styles.container, selected === value ? styles.checked : {}]}
            textColor={selected === value ? "#fff" : colors.text}
          >
            {translation(value.toLowerCase())}
          </Button>
        ))}
      </View>
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
