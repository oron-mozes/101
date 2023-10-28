import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Divider, Text } from "react-native-paper";
import { useTranslation } from "../hooks/useMyTranslation";
import { IOption } from "../interfaces";
import {
  borderSetup,
  colors,
  gutter,
  inputContainer,
  inputHeight,
  offset,
} from "../shared-config";
import { Picker } from "@react-native-picker/picker";

export function DropDown({
  label,
  options,
  placeholder,
  initialValue,
  onSelect,
}: {
  label: string;
  initialValue?: string;
  placeholder: string;
  onSelect(value: IOption): void;
  options: IOption[];
}) {
  const translation = useTranslation();
  const selected = initialValue || 0;
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        mode="dialog"
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue) {
            onSelect(options[itemIndex - 1]);
          }
        }}
      >
        <Picker.Item label={translation("select")} value={0} />
        {options.map((option) => (
          <Picker.Item label={option.title} value={option.id} key={option.id} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    fontSize: 17,
  },
  field: {
    ...borderSetup,
    height: inputHeight,
    marginTop: gutter,
  },
  label: {
    marginRight: 50,
    textAlign: "right",
    fontSize: 12,
  },
});
