import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { Icon, Text } from "react-native-paper";
import { IOption } from "../interfaces";
import {
  borderRadius,
  borderSetup,
  colors,
  gutter,
  inputHeight,
  offset,
} from "../shared-config";

export function Autocomplete({
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
  const [loading, setLoading] = useState(false);

  const [filteredOptions, setFilteredOption] = useState<IOption[]>(options);
  //   const getSuggestions = useCallback((searchTerm: string) => {
  //     setFilteredOption(
  //       options.filter((option) => option.title.includes(searchTerm))
  //     );
  //   }, []);

  const onOpenSuggestionsList = useCallback((isOpened) => {}, []);

  return (
    <View>
      <AutocompleteDropdown
        initialValue={initialValue ?? ""}
        dataSet={options}
        onSelectItem={onSelect}
        suggestionsListMaxHeight={400}
        onClear={() => {
          setFilteredOption(options);
        }}
        onOpenSuggestionsList={onOpenSuggestionsList}
        loading={loading}
        useFilter={false}
        textInputProps={{
          placeholder,
          autoCorrect: false,
          autoCapitalize: "none",
          style: styles.textInput,
        }}
        rightButtonsContainerStyle={styles.rightButtonsContainerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        suggestionsListContainerStyle={styles.suggestionsListContainerStyle}
        containerStyle={styles.containerStyle}
        renderItem={(item, text) => (
          <Text style={styles.renderItem}>{item.title}</Text>
        )}
        ChevronIconComponent={<Icon size={20} source="chevron" />}
        //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
        inputHeight={50}
        showChevron={false}
        closeOnBlur={false}
        showClear={false}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...offset,
  },
  textInput: {
    backgroundColor: "transparent",
    color: colors.text,
  },
  rightButtonsContainerStyle: {
    // right: 8,
  },
  inputContainerStyle: {
    backgroundColor: "transparent",
    marginTop: 8,
  },
  containerStyle: {
    width: "100%",
    ...borderSetup,
    margin: gutter,
    marginTop: gutter,
    height: inputHeight,
  },
  suggestionsListContainerStyle: {
    borderRadius: borderRadius,
  },
  renderItem: {
    textAlign: "right",
    color: colors.text,
    padding: 15,
    borderRadius: borderRadius,
  },
});
