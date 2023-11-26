import React, { useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Icon, Text } from "react-native-paper";
import { inputContainer } from "../shared-config";
export interface IInputField {
  onChange(value: string): void;
  label: string;
  editable?: boolean;
  numeric?: boolean;
  icon?: string;
  numberOfLines?: number;
  maxLength?: number;
  placeholder?: string;
  value: string;
  testID?: string;
  secureTextEntry?: boolean;
}

export const InputField = React.memo(
  ({
    label,
    onChange,
    editable = true,
    value,
    numeric = false,
    numberOfLines = 1,
    maxLength,
    icon,
    placeholder = "",
    testID,
    secureTextEntry = false,
  }: IInputField) => {
    const inputRef = useRef(null);
    const handleInputPress = () => {
      editable && inputRef.current.focus();
    };
    return (
      <TouchableWithoutFeedback
        onPress={handleInputPress}
        testID={`${testID ? `${testID}-` : ""}input-touch`}
      >
        <View style={[styles.container]}>
          {icon && (
            <View style={[styles.icon]}>
              <Icon source={icon} size={20} />
            </View>
          )}
          <Text
            onPress={handleInputPress}
            style={styles.label}
            testID={`${testID ? `${testID}-` : ""}input-label`}
          >
            {label}
          </Text>
          <View>
            <TextInput
              secureTextEntry={secureTextEntry}
              testID={`${testID ? `${testID}-` : ""}input`}
              placeholder={placeholder}
              ref={inputRef}
              maxLength={maxLength}
              numberOfLines={numberOfLines}
              multiline={numberOfLines > 1}
              style={[styles.text]}
              keyboardType={numeric ? "numeric" : "default"}
              editable={editable}
              value={value}
              textAlign="right"
              onChangeText={(value) => {
                onChange(value);
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
  container: {
    flex: 1,
    margin: 4,
  },
  text: inputContainer,
  icon: {
    marginLeft: 4,
  },
});
