import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Card, Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../form-components/dropdown";
import { RadioGroup } from "../../../../../form-components/radio-group";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import {
  EAirWayTreatment,
  IAirWayInformation,
  TAirWayTreatment,
  TOGGLE,
} from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";
import { convertToOptions, validateLastItem } from "./utils";
import { useEffect } from "react";

export function ASection() {
  const translation = useTranslation();
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.disabled
  );

  const handlers = usePatientRecordsStore((state) => state.airway_handlers);
  const actions = usePatientRecordsStore(
    (state) => state.activePatient.airway.actions ?? []
  );

  const fulfill = usePatientRecordsStore(
    (state) => state.activePatient.airway.fulfill
  );

  const addRow = () => {
    handlers.addAction({
      action: null,
      time: new Date().getTime(),
      id: new Date().getTime(),
      successful: null,
    });
  };
  useEffect(() => {
    fulfill && actions.length === 0 && addRow();
  }, [fulfill]);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("aSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.airwayView]}>
        <RadioGroup
          disabled={disabled || actions.length !== 0}
          horizontal
          label={translation("airWayInjury")}
          onSelect={(id: string) => {
            handlers.toggleFulfill(id === TOGGLE.YES);
          }}
          selected={
            fulfill !== null ? (fulfill ? TOGGLE.YES : TOGGLE.NO) : null
          }
          options={convertToOptions(TOGGLE, translation)}
        />
      </Card.Content>
      {fulfill &&
        actions?.map((airWayInfo: IAirWayInformation, index) => {
          const isSuccessful =
            airWayInfo.successful === null
              ? null
              : airWayInfo.successful
              ? TOGGLE.YES
              : TOGGLE.NO;

          return (
            <Card.Content
              style={[styles.innerContent, styles.actionRow]}
              key={`${airWayInfo.action}-${index}`}
            >
              <View style={styles.element}>
                <DropDown
                  label={translation("actionTaken")}
                  editable={disabled}
                  initialValue={airWayInfo.action}
                  onSelect={(value: TAutocompleteDropdownItem) => {
                    value &&
                      handlers.updateAtIndex(
                        {
                          action: value.id as TAirWayTreatment,
                        },
                        index
                      );
                  }}
                  options={convertToOptions(EAirWayTreatment, translation)}
                />
              </View>
              <View style={[styles.element, styles.actionRow]}>
                <TimePicker
                  editable={disabled}
                  value={airWayInfo.time}
                  label={translation("actionTime")}
                  onChange={(time: number) => {
                    handlers.updateAtIndex({ time }, index);
                  }}
                />
                <RadioGroup
                  disabled={disabled}
                  label={translation("actionResult")}
                  onSelect={(id: string) => {
                    handlers.updateAtIndex(
                      { successful: id === TOGGLE.YES },
                      index
                    );
                  }}
                  selected={isSuccessful}
                  options={convertToOptions(TOGGLE, translation)}
                />
                <Text
                  onPress={() => handlers.removeAction(index)}
                  style={styles.deleteAction}
                >
                  <Icon
                    size={20}
                    source="delete-outline"
                    color={colors.primary}
                  />
                </Text>
              </View>
            </Card.Content>
          );
        })}
      {validateLastItem(actions) && (
        <Card.Content style={[styles.innerContent, styles.addItemAction]}>
          <Icon size={20} source="plus" color={colors.primary} />
          <Text
            disabled={disabled}
            style={{ color: colors.primary, fontSize: 17 }}
            onPress={addRow}
          >
            {translation("addAction")}
          </Text>
        </Card.Content>
      )}
    </Card>
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
    justifyContent: "flex-start",
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
