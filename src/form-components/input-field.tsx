import { useRef } from "react";
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
}
export function InputField({
  label,
  onChange,
  editable = true,
  value,
  numeric = false,
  numberOfLines = 1,
  maxLength,
  icon,
  placeholder = "",
}: IInputField) {
  const inputRef = useRef(null);
  const handleInputPress = () => {
    editable && inputRef.current.focus();
  };
  return (
    <TouchableWithoutFeedback onPress={handleInputPress}>
      <View style={[styles.container]}>
        {icon && (
          <View style={[styles.icon]}>
            <Icon source={icon} size={20} />
          </View>
        )}
        <Text onPress={handleInputPress} style={styles.label}>
          {label}
        </Text>
        <View>
          <TextInput
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
