import _ from "lodash";
import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../../form-components/dropdown";
import { RadioGroup } from "../../../../../../form-components/radio-group";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { IAction, TOGGLE } from "../../../../../../interfaces";
import { colors } from "../../../../../../shared-config";
import { convertToOptions } from "../utils";
import { isSuccessful } from "./utils";

export function SavedAction<T>({
  information,
  handlers,
  testID,
  options,
}: {
  testID: string;
  information: IAction<T>;
  handlers;
  options: Record<string, string>;
}) {
  const translation = useTranslation();
  const successful = isSuccessful(information.successful);
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.element}>
        <DropDown
          testID={testID}
          label={translation("actionTaken")}
          initialValue={translation(information.action as string)}
          onSelect={(value: TAutocompleteDropdownItem) => {
            if (_.isEqual(information.action, value.id)) return;
            value &&
              handlers.updateById(
                {
                  action: value.id as T,
                },
                information.id
              );
          }}
          options={convertToOptions<T>(options, translation)}
        />
      </View>
      <View style={[styles.element, styles.actionRow]}>
        <TimePicker
          value={information.time}
          label={translation("actionTime")}
          onChange={(time: number) => {
            if (_.isEqual(information.time, time)) return;
            handlers.updateById({ time }, information.id);
          }}
        />
        <RadioGroup
          label={translation("actionResult")}
          onSelect={(id: string) => {
            handlers.updateById(
              { successful: id === TOGGLE.YES },
              information.id
            );
          }}
          selected={successful}
          options={convertToOptions(TOGGLE, translation)}
        />
        <Text
          onPress={() => {
            handlers.removeAction(information.id);
          }}
          style={styles.deleteAction}
        >
          <Icon size={25} source="delete-outline" color={colors.primary} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    justifyContent: "center",
    marginLeft: 5,
    marginTop: 50,
  },
  element: { flex: 1 },
  actionRow: {
    flexDirection: "row",
  },
});
