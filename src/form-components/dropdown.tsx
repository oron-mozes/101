import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Divider, Text } from "react-native-paper";
import { useTranslation } from "../hooks/useMyTranslation";
import { IOption } from "../interfaces";
import {
  borderSetup,
  colors,
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
  console.log(initialValue, options);
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Picker
        mode="dialog"
        selectedValue={initialValue || placeholder}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue) {
            onSelect(options[itemIndex - 1]);
          }
        }}
      >
        <Picker.Item label={translation("select")} value={null} />
        {options.map((option) => (
          <Picker.Item label={option.title} value={option.id} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    fontSize: 17,
    width: 100,
    textAlign: "center",
    margin: 10,
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: colors.primary,
    marginTop: 10,
    width: 150,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView: {
    ...borderSetup,
    width: "50%",
    marginLeft: "25%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
    padding: 20,
  },
  modalView: {},
  container: {
    ...inputContainer,
    flexDirection: "column",
    justifyContent: "center",
  },
  label: {
    ...offset,
    marginRight: 50,
    marginTop: 0,
    width: "100%",
    flex: 1,
  },
  selectedOption: {
    width: "100%",
    textAlign: "right",
    flex: 1,
    height: inputHeight,
    verticalAlign: "middle",
    marginRight: 15,
    marginTop: -40,
    fontSize: 17,
  },
});
