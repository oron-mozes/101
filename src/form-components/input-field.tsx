import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Icon, TextInput } from "react-native-paper";
import { colors, gutter, inputContainer } from "../shared-config";
import { memo, useEffect, useRef, useState } from "react";
import _ from "lodash";
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
  const [text, setText] = useState<string>(value);
  useEffect(() => {
    if (!value) {
      setText(value);
    }
  }, [value]);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(value);

  const onEndTyping = _.debounce((searchText) => {
    onChange(numeric ? Number(searchText) : searchText);
  }, 500);

  const inputRef = useRef(null);
  const handleInputPress = () => {
    // Focus the input when it's pressed
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
        <TextInput
          ref={inputRef}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          multiline={numberOfLines > 1}
          style={[styles.text, numberOfLines > 1 ? styles.fixHeight : {}]}
          keyboardType={numeric ? "numeric" : "default"}
          disabled={disabled}
          label={label}
          value={text ?? ""}
          textAlign="right"
          mode="outlined"
          textColor={colors.text}
          onChangeText={(value) => {
            setText(value);
            setDebouncedSearch(value);
            onEndTyping(value);
            // onChange(numeric ? Number(value) : value);
          }}
          outlineColor="transparent"
          activeOutlineColor={colors.text}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  fixHeight: {
    height: 100,
  },
  container: inputContainer,
  text: {
    flex: 1,
    textAlign: "right",
    alignItems: "flex-end",
    marginBottom: gutter,
  },
  icon: {
    marginLeft: 4,
  },
});

export const InputField = memo(InputFieldHandler);
