import { memo, useRef } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import { Icon, Text } from "react-native-paper";
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
    editable && inputRef.current.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={handleInputPress}>
      <View style={[styles.container]}>
        <View style={[styles.content]}>
          <Text onPress={handleInputPress} style={styles.offset}>
            {label}
          </Text>
          <TextInput
            ref={inputRef}
            style={[styles.text]}
            keyboardType="numeric"
            maxLength={7}
            value={value}
            textAlign="right"
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
    marginTop: -5,
  },
  fixHeight: {
    height: 150,
  },
  container: {
    ...inputContainer,
  },
  text: {
    flex: 1,
    textAlign: "right",
    alignItems: "flex-end",
    marginBottom: gutter,
    marginRight: gutter,
  },
});
