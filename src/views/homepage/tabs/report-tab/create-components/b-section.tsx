import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Card, Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../form-components/dropdown";
import { RadioGroup } from "../../../../../form-components/radio-group";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import {
  EBreathingTreatment,
  IBreathingInformation,
  TBreathingTreatment,
  TOGGLE,
} from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import Context from "../context";
import { design } from "./shared-style";
import { InputField } from "../../../../../form-components/input-field";

const emptyState: IBreathingInformation = {
  action: null,
  time: null,
  successful: null,
};
export function BSection() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const { breathing = { actions: [], fulfill: null } } = patient;
        const { actions = [], fulfill } = breathing;
        const addRow = () => {
          update({
            breathing: { ...breathing, actions: [...actions, emptyState] },
          });
        };

        if (fulfill && !Boolean(actions?.length)) {
          addRow();
        }

        const updateInIndex = (
          data: Partial<IBreathingInformation>,
          index: number
        ) => {
          const newData = actions;
          newData[index] = { ...newData[index], ...data };
          update({ breathing: { ...breathing, actions: newData } });
        };
        const isLastItemValid = () => {
          return (
            actions.length !== 0 &&
            !Object.values(actions[actions.length - 1]).some((v) => v === null)
          );
        };

        const removeByIndex = (index: number) => {
          const newData = actions.filter((_, i) => i !== index);
          update({
            breathing: {
              ...breathing,
              actions: newData,
              fulfill: newData.length !== 0,
            },
          });
        };

        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("bSection")} />
            </Card.Content>
            <Card.Content style={[styles.innerContent, styles.breathingView]}>
              <RadioGroup
                horizontal
                label={translation("breathingInjury")}
                onSelect={(id: string) => {
                  if (id === TOGGLE.YES) {
                    update({ breathing: { ...breathing, fulfill: true } });
                  } else {
                    update({ breathing: { ...breathing, fulfill: false } });
                  }
                }}
                selected={
                  fulfill !== null ? (fulfill ? TOGGLE.YES : TOGGLE.NO) : null
                }
                options={[
                  { id: TOGGLE.YES, value: translation(TOGGLE.YES) },
                  { id: TOGGLE.NO, value: translation(TOGGLE.NO) },
                ]}
              />
            </Card.Content>
            {fulfill && (
              <Card.Content style={[styles.innerContent]}>
                <InputField
                  label={translation("breathings")}
                  numeric
                  onChange={(breathingCount: number) => {
                    update({
                      breathing: { ...breathing, breathingCount },
                    });
                  }}
                />
                <InputField
                  numeric
                  label={translation("saturation")}
                  onChange={(saturation: number) => {
                    update({ breathing: { ...breathing, saturation } });
                  }}
                />
              </Card.Content>
            )}
            {fulfill &&
              actions?.map((breathingInfo: IBreathingInformation, index) => {
                const isSuccessful =
                  breathingInfo.successful === null
                    ? null
                    : breathingInfo.successful
                    ? TOGGLE.YES
                    : TOGGLE.NO;

                return (
                  <Card.Content
                    style={[styles.innerContent, styles.actionRow]}
                    key={breathingInfo.action}
                  >
                    <View style={[styles.element, styles.actionRow]}>
                      <Text
                        onPress={() => removeByIndex(index)}
                        style={styles.deleteAction}
                      >
                        <Icon
                          size={20}
                          source="delete"
                          color={colors.primary}
                        />
                      </Text>

                      <RadioGroup
                        label={translation("actionResult")}
                        onSelect={(id: string) => {
                          updateInIndex(
                            { successful: id === TOGGLE.YES },
                            index
                          );
                        }}
                        selected={isSuccessful}
                        options={[
                          { id: TOGGLE.YES, value: translation(TOGGLE.YES) },
                          { id: TOGGLE.NO, value: translation(TOGGLE.NO) },
                        ]}
                      />
                      <TimePicker
                        value={breathingInfo.time}
                        label={translation("actionTime")}
                        onChange={(time: number) => {
                          updateInIndex({ time }, index);
                        }}
                      />
                    </View>
                    <View style={styles.element}>
                      <DropDown
                        label={translation("actionTaken")}
                        placeholder={translation("select")}
                        initialValue={breathingInfo.action}
                        onSelect={(value: TAutocompleteDropdownItem) => {
                          value &&
                            updateInIndex(
                              {
                                action: value.id as TBreathingTreatment,
                              },
                              index
                            );
                        }}
                        options={[
                          {
                            id: EBreathingTreatment.OXIGEN,
                            title: translation(EBreathingTreatment.OXIGEN),
                          },
                          {
                            id: EBreathingTreatment.MOUTH,
                            title: translation(EBreathingTreatment.MOUTH),
                          },
                          {
                            id: EBreathingTreatment.NA,
                            title: translation(EBreathingTreatment.NA),
                          },
                          {
                            id: EBreathingTreatment.CHEST_TUBE,
                            title: translation(EBreathingTreatment.CHEST_TUBE),
                          },
                        ]}
                      />
                    </View>
                  </Card.Content>
                );
              })}
            {isLastItemValid() && (
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
      }}
    </Context.Consumer>
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
