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
export function InputField({
  label,
  onChange,
  editable,
  value,
  numeric = false,
  numberOfLines = 1,
  maxLength,
  icon,
}: IInputField) {
  const inputRef = useRef(null);
  const handleInputPress = () => {
    editable && inputRef.current.focus();
  };
  return (
    <TouchableWithoutFeedback onPress={handleInputPress}>
      <View
        style={[styles.container, numberOfLines > 1 ? styles.fixHeight : {}]}
      >
        {icon && (
          <View style={[styles.icon]}>
            <Icon source={icon} size={20} />
          </View>
        )}
        <View
          style={[
            styles.content,
            numberOfLines > 1 ? styles.fixHeightLabel : {},
          ]}
        >
          <Text onPress={handleInputPress} style={styles.offset}>
            {label}
          </Text>
          <TextInput
            ref={inputRef}
            maxLength={maxLength}
            numberOfLines={numberOfLines}
            multiline={numberOfLines > 1}
            style={[styles.text, numberOfLines > 1 ? styles.fixHeightText : {}]}
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

const styles = StyleSheet.create({
  fixHeightText: {
    marginTop: 10,
    marginBottom: -80,

    height: 150,
  },
  fixHeightLabel: { marginTop: -85 },
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
    // marginLeft: -20,
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
    alignItems: "flex-start",
    marginBottom: gutter,
    marginLeft: gutter,
  },
  icon: {
    marginLeft: 4,
  },
});
