import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Icon, Text } from "react-native-paper";
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
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";
import { convertToOptions } from "../utils";
import { isSuccessful } from "./utils";

export function SavedAAction({
  airWayInfo,
}: {
  airWayInfo: IAirWayInformation;
}) {
  const translation = useTranslation();
  const handlers = usePatientRecordsStore((state) => state.airway_handlers);
  const successful = isSuccessful(airWayInfo.successful);

  return (
    <>
      <View style={styles.element}>
        <DropDown
          label={translation("actionTaken")}
          initialValue={airWayInfo.action}
          onSelect={(value: TAutocompleteDropdownItem) => {
            value &&
              handlers.updateById(
                {
                  action: value.id as EAirWayTreatment,
                },
                airWayInfo.id
              );
          }}
          options={convertToOptions(EAirWayTreatment, translation)}
        />
      </View>
      <View style={[styles.element, styles.actionRow]}>
        <TimePicker
          value={airWayInfo.time}
          label={translation("actionTime")}
          onChange={(time: number) => {
            handlers.updateById({ time }, airWayInfo.id);
          }}
        />
        <RadioGroup
          label={translation("actionResult")}
          onSelect={(id: string) => {
            handlers.updateById(
              { successful: id === TOGGLE.YES },
              airWayInfo.id
            );
          }}
          selected={successful}
          options={convertToOptions(TOGGLE, translation)}
        />
        <Text
          onPress={() => {
            handlers.removeAction(airWayInfo.id);
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
  airwayView: {
    width: "50%",
  },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
