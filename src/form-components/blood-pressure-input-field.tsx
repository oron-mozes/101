import React, { memo, useRef } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { inputContainer } from "../shared-config";
import { calcBloodPressureValue } from "./utils";
export interface IBloodPressureInputFieldHandler {
  onChange(value: string): void;
  label: string;
  editable?: boolean;
  numeric?: boolean;
  icon?: string;
  numberOfLines?: number;
  maxLength?: number;
  value: string;
}

export const BloodPressureInputFieldHandler = memo(
  function BloodPressureInputFieldHandler({
    label,
    onChange,
    editable = true,
    value,
  }: IBloodPressureInputFieldHandler) {
    const inputRef = useRef(null);
    const handleInputPress = () => {
      editable && inputRef.current.focus();
    };

    return (
      <TouchableWithoutFeedback onPress={() => handleInputPress}>
        <View style={{ flex: 1, margin: 4 }}>
          <Text onPress={() => handleInputPress} style={styles.label}>
            {label}
          </Text>

          <View>
            <TextInput
              testID="blood-pressure-input"
              disabled={!editable}
              underlineColor="transparent"
              ref={inputRef}
              keyboardType="numeric"
              maxLength={7}
              value={value}
              textAlign="right"
              style={{ backgroundColor: "transparent" }}
              contentStyle={[styles.text]}
              onChangeText={(newValue) => {
                onChange(calcBloodPressureValue(value, newValue));
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
  },
  content: {
    ...inputContainer,
    flex: 0,
    // flexDirection: "column",
    // justifyContent: "space-around",
    // height: inputHeight - 10,

    width: "100%",
  },

  text: inputContainer,
});
