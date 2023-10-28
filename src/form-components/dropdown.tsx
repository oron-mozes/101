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
  onSelect(value: TAutocompleteDropdownItem): void;
  options: IOption[];
}) {
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const translation = useTranslation();

  return (
    <View>
      <Modal
        onTouchCancel={hideModal}
        style={styles.modalView}
        animationType="slide"
        visible={visible}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <View>
                <Text
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    hideModal();
                  }}
                >
                  {translation(item.title.toLowerCase())}
                </Text>
                <Divider />
              </View>
            )}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={hideModal}
          >
            <Text style={styles.textStyle}>{translation("close")}</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.selectedOption} onPress={showModal}>
          {initialValue || placeholder}
        </Text>
      </View>
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
