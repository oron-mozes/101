import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Card, Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../form-components/dropdown";
import { InputField } from "../../../../../form-components/input-field";
import { RadioGroup } from "../../../../../form-components/radio-group";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import {
  EBreathingTreatment,
  IBreathingInformation,
  TOGGLE,
} from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";
import { convertToOptions, validateLastItem } from "./utils";
import { useEffect } from "react";

const emptyState: IBreathingInformation = {
  action: null,
  time: null,
  successful: null,
};
export function BSection() {
  const translation = useTranslation();

  const { saturation, breathingCount, fulfill } = usePatientRecordsStore(
    (state) => state.activePatient.breathing
  );

  const actions = usePatientRecordsStore(
    (state) => state.activePatient.breathing.actions ?? []
  );
  const handlers = usePatientRecordsStore((state) => state.breathing_handlers);

  const addRow = () => {
    handlers.addAction({ ...emptyState, time: new Date().getTime() });
  };

  useEffect(() => {
    fulfill && actions.length === 0 && addRow();
  }, [fulfill]);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("bSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          label={translation("breathings")}
          numeric
          value={breathingCount?.toString()}
          onChange={(breathingCount) => {
            handlers.setBreathingCount(Number(breathingCount));
          }}
        />
        <InputField
          numeric
          value={saturation?.toString()}
          label={translation("saturation")}
          onChange={(saturation) => {
            handlers.setSaturation(Number(saturation));
          }}
        />
      </Card.Content>

      <Card.Content style={[styles.innerContent, styles.breathingView]}>
        <RadioGroup
          horizontal
          label={translation("breathingInjury")}
          onSelect={(id: string) => {
            handlers.toggleFulfill(id === TOGGLE.YES);
          }}
          selected={fulfill ? TOGGLE.YES : TOGGLE.NO}
          options={convertToOptions(TOGGLE, translation)}
        />
      </Card.Content>

      {fulfill &&
        actions.map((breathingInfo: IBreathingInformation, index) => {
          const isSuccessful =
            breathingInfo.successful === null
              ? null
              : breathingInfo.successful
              ? TOGGLE.YES
              : TOGGLE.NO;

          return (
            <Card.Content
              style={[styles.innerContent, styles.actionRow]}
              key={`${breathingInfo.action}-${index}`}
            >
              <View style={styles.element}>
                <DropDown
                  label={translation("actionTaken")}
                  initialValue={breathingInfo.action}
                  onSelect={(value: TAutocompleteDropdownItem) => {
                    value &&
                      handlers.updateAtIndex(
                        {
                          action: value.id as EBreathingTreatment,
                        },
                        index
                      );
                  }}
                  options={convertToOptions(EBreathingTreatment, translation)}
                />
              </View>
              <View style={[styles.element, styles.actionRow]}>
                <TimePicker
                  value={breathingInfo.time}
                  label={translation("actionTime")}
                  onChange={(time: number) => {
                    handlers.updateAtIndex({ time }, index);
                  }}
                />
                <RadioGroup
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
    justifyContent: "flex-end",
    margin: gutter,
  },
  breathingView: {
    justifyContent: "flex-start",
  },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
