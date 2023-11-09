import { memo, useRef } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { TextInput, Icon, Text } from "react-native-paper";
import {
  borderSetup,
  offset,
  gutter,
  inputContainer,
  inputHeight,
  colors,
} from "../shared-config";
export interface IInputField {
  onChange(value: string): void;
  label: string;
  editable: boolean;
  numeric?: boolean;
  icon?: string;
  numberOfLines?: number;
  maxLength?: number;
  value: string;
}
export function BloodPressureInputFieldHandler({
  label,
  onChange,
  editable,
  value,
}: IInputField) {
  const inputRef = useRef(null);
  const handleInputPress = () => {
    console.log("????");
    editable && inputRef.current.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleInputPress}>
      <View style={[styles.container]}>
        <View style={[styles.content]}>
          <Text onPress={() => handleInputPress} style={styles.offset}>
            {label}
          </Text>
          <TextInput
            disabled={!editable}
            underlineColor="transparent"
            ref={inputRef}
            keyboardType="numeric"
            maxLength={7}
            value={value}
            textAlign="right"
            style={{ backgroundColor: "transparent" }}
            contentStyle={[styles.text]}
            onChangeText={(value) => {
              let subStrIndex = 2;
              let maxLength = 2;
              if (value.startsWith("1")) {
                subStrIndex = 3;
                maxLength = 3;
              }
              if (value.indexOf("/") === -1 && value.length >= maxLength) {
                value = `${value.substring(0, subStrIndex)}/${value.substring(
                  subStrIndex
                )}`;
              }

              onChange(value);
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: inputHeight - 10,
    backgroundColor: colors.textInputBG,
    width: "100%",
  },
  offset: {
    ...offset,
    marginBottom: 0,
    width: "100%",
    marginTop: 0,
  },
  fixHeight: {
    height: 150,
  },
  container: {
    ...inputContainer,
  },
  text: {
    // flex: 1,
    textAlign: "right",
    alignItems: "flex-start",
    marginBottom: gutter,
    marginRight: gutter,
    width: "100%",
    backgroundColor: "transparent",
  },
});
