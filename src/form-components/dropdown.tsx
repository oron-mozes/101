import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Dialog, Icon, Portal, Text } from "react-native-paper";
import { useTranslation } from "../hooks/useMyTranslation";
import { IOption } from "../interfaces";
import { inputContainer, inputHeight } from "../shared-config";

export function DropDown({
  label,
  options,
  initialValue,
  onSelect,
  testId = "",
  editable = true,
}: {
  editable?: boolean;
  label: string;
  testId?: string;
  initialValue?: string;
  onSelect(value: IOption): void;
  options: IOption[];
}) {
  const translation = useTranslation();
  const selected = initialValue;
  const [showOptions, toggleOptions] = useState<boolean>(false);
  const onClose = () => toggleOptions(false);
  console.log({ showOptions });
  return (
    <View style={styles.field}>
      <Portal>
        <Dialog visible={showOptions} onDismiss={onClose}>
          <Dialog.Content>
            {options.map((option) => (
              <TouchableWithoutFeedback
                key={option.id}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text
                  key={option.id}
                  onPress={() => {
                    onSelect(option);
                  }}
                  variant="bodyMedium"
                  style={styles.option}
                  testID={`${testId}${testId ? "-" : ""}option-${option.id}`}
                >
                  {option.title}
                </Text>
              </TouchableWithoutFeedback>
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Text style={styles.label}>{label}</Text>
      <TouchableWithoutFeedback onPress={() => editable && toggleOptions(true)}>
        <View style={styles.picker}>
          <Text style={{ flex: 1, textAlign: "center" }}>
            {selected ?? translation("select")}
          </Text>
          <View style={{ marginRight: 10, transform: "rotate(180deg)" }}>
            <Icon source="triangle" size={10} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    height: inputHeight - 10,
    verticalAlign: "middle",
  },
  picker: {
    ...inputContainer,
    flex: 0,
  },
  field: {
    flex: 1,
    marginTop: 4,
  },
  label: {
    marginBottom: 10,
  },
});
