import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Icon, Text } from "react-native-paper";
import { initialEmptyAction } from ".";
import { DropDown } from "../../../../../../form-components/dropdown";
import { RadioGroup } from "../../../../../../form-components/radio-group";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import {
  EAirWayTreatment,
  IAirWayInformation,
  TOGGLE,
} from "../../../../../../interfaces";
import { colors, gutter } from "../../../../../../shared-config";
import { convertToOptions } from "../utils";
import { isSuccessful } from "./utils";

export function AddAAction({
  airWayInfo,
  update,
}: {
  airWayInfo: IAirWayInformation;
  update(airWayInfo: IAirWayInformation): void;
}) {
  const translation = useTranslation();
  const successful = isSuccessful(airWayInfo.successful);
  return (
    <>
      <View style={styles.element}>
        <DropDown
          label={translation("actionTaken")}
          initialValue={airWayInfo.action}
          onSelect={(value: TAutocompleteDropdownItem) => {
            update({ ...airWayInfo, action: value.id as EAirWayTreatment });
          }}
          options={convertToOptions(EAirWayTreatment, translation)}
        />
      </View>
      <View style={[styles.element, styles.actionRow]}>
        <TimePicker
          value={airWayInfo.time}
          label={translation("actionTime")}
          onChange={(time: number) => {
            update({ ...airWayInfo, time });
          }}
        />
        <RadioGroup
          label={translation("actionResult")}
          onSelect={(id: string) => {
            update({ ...airWayInfo, successful: id === TOGGLE.YES });
          }}
          selected={successful}
          options={convertToOptions(TOGGLE, translation)}
        />
        <Text
          onPress={() => {
            update({ ...initialEmptyAction });
          }}
          style={styles.deleteAction}
        >
          <Icon size={20} source="delete-outline" color={colors.primary} />
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    justifyContent: "center",
    marginRight: 3,
    marginTop: 32,
  },
  element: { flex: 1 },
  actionRow: {
    flexDirection: "row",
  },
  addItemAction: {
    justifyContent: "flex-start",
    margin: gutter,
  },
});
