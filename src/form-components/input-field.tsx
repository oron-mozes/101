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
  disabled: boolean;
  numeric?: boolean;
  icon?: string;
  numberOfLines?: number;
  maxLength?: number;
  value: string;
}
function InputFieldHandler({
  label,
  onChange,
  disabled,
  value,
  numeric = false,
  numberOfLines = 1,
  maxLength,
  icon,
}: IInputField) {
  const inputRef = useRef(null);
  const handleInputPress = () => {
    inputRef.current.focus();
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
            // disabled={disabled}
            // label={label}
            value={value}
            textAlign="right"
            // mode="outlined"
            // textColor={colors.text}
            onChangeText={(value) => {
              onChange(value);
            }}
            // outlineColor="transparent"
            // activeOutlineColor={colors.text}
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
    marginLeft: -20,
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
  icon: {
    marginLeft: 4,
  },
});

export const InputField = memo(InputFieldHandler);
