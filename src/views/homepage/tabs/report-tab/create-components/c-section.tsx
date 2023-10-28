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
  EMeasurementsTreatments,
  IMeasurementsInformation,
  TMeasurementsTreatments,
  TOGGLE,
} from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import Context from "../context";
import { design } from "./shared-style";
import { InputField } from "../../../../../form-components/input-field";

const emptyState: IMeasurementsInformation = {
  action: null,
  time: null,
  successful: null,
};
export function CSection() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const {
          measurements = {
            actions: [],
            fulfill: null,
            puls: null,
            shock: null,
            palpated: null,
            bloodPressure: { diastolic: null, systolic: null },
          },
        } = patient;
        const { actions = [], fulfill } = measurements;
        const addRow = () => {
          update({
            measurements: {
              ...measurements,
              actions: [...actions, emptyState],
            },
          });
        };

        if (fulfill && !Boolean(actions?.length)) {
          addRow();
        }

        const updateInIndex = (
          data: Partial<IMeasurementsInformation>,
          index: number
        ) => {
          const newData = actions;
          newData[index] = { ...newData[index], ...data };
          update({ measurements: { ...measurements, actions: newData } });
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
            measurements: {
              ...measurements,
              actions: newData,
              fulfill: newData.length !== 0,
            },
          });
        };

        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("cSection")} />
            </Card.Content>
            <Card.Content
              style={[styles.innerContent, styles.measurementsView]}
            >
              <RadioGroup
                horizontal
                label={translation("shock")}
                onSelect={(id: string) => {
                  update({
                    measurements: {
                      ...measurements,
                      shock: id === TOGGLE.YES,
                    },
                  });
                }}
                selected={
                  measurements.shock !== null
                    ? measurements.shock
                      ? TOGGLE.YES
                      : TOGGLE.NO
                    : null
                }
                options={[
                  { id: TOGGLE.YES, value: translation(TOGGLE.YES) },
                  { id: TOGGLE.NO, value: translation(TOGGLE.NO) },
                ]}
              />
              <RadioGroup
                horizontal
                label={translation("palpated")}
                onSelect={(id: string) => {
                  update({
                    measurements: {
                      ...measurements,
                      palpated: id === TOGGLE.YES,
                    },
                  });
                }}
                selected={
                  measurements.palpated !== null
                    ? measurements.palpated
                      ? TOGGLE.YES
                      : TOGGLE.NO
                    : null
                }
                options={[
                  { id: TOGGLE.YES, value: translation(TOGGLE.YES) },
                  { id: TOGGLE.NO, value: translation(TOGGLE.NO) },
                ]}
              />
            </Card.Content>

            <Card.Content style={[styles.innerContent]}>
              <InputField
                value={measurements.puls}
                numeric
                label={translation("puls")}
                onChange={(puls: number) => {
                  update({
                    measurements: {
                      ...measurements,
                      puls,
                    },
                  });
                }}
              />
              {/* <View style={{ flex: 1, flexDirection: "row-reverse" }}> */}
              <InputField
                numeric
                value={measurements.bloodPressure.diastolic}
                label={translation("bloodPressureDiastolic")}
                onChange={(diastolic: number) => {
                  update({
                    measurements: {
                      ...measurements,
                      bloodPressure: {
                        ...measurements.bloodPressure,
                        diastolic,
                      },
                    },
                  });
                }}
              />
              <InputField
                value={measurements.bloodPressure.systolic}
                label={translation("bloodPressureSystolic")}
                numeric
                onChange={(systolic: number) => {
                  update({
                    measurements: {
                      ...measurements,
                      bloodPressure: {
                        ...measurements.bloodPressure,
                        systolic,
                      },
                    },
                  });
                }}
              />
              {/* </View> */}
            </Card.Content>

            {actions?.map((measurements: IMeasurementsInformation, index) => {
              const isSuccessful =
                measurements.successful === null
                  ? null
                  : measurements.successful
                  ? TOGGLE.YES
                  : TOGGLE.NO;

              return (
                <Card.Content
                  style={[styles.innerContent, styles.actionRow]}
                  key={measurements.action}
                >
                  <View style={[styles.element, styles.actionRow]}>
                    <Text
                      onPress={() => removeByIndex(index)}
                      style={styles.deleteAction}
                    >
                      <Icon size={20} source="delete" color={colors.primary} />
                    </Text>

                    <RadioGroup
                      label={translation("actionResult")}
                      onSelect={(id: string) => {
                        updateInIndex({ successful: id === TOGGLE.YES }, index);
                      }}
                      selected={isSuccessful}
                      options={[
                        { id: TOGGLE.YES, value: translation(TOGGLE.YES) },
                        { id: TOGGLE.NO, value: translation(TOGGLE.NO) },
                      ]}
                    />
                    <TimePicker
                      value={measurements.time}
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
                      initialValue={measurements.action}
                      onSelect={(value: TAutocompleteDropdownItem) => {
                        value &&
                          updateInIndex(
                            {
                              action: value.id as TMeasurementsTreatments,
                            },
                            index
                          );
                      }}
                      options={[
                        {
                          id: EMeasurementsTreatments.PERIPHERAL_VAIN,
                          title: translation(
                            EMeasurementsTreatments.PERIPHERAL_VAIN
                          ),
                        },
                        {
                          id: EMeasurementsTreatments.CENTRAL_VAIN,
                          title: translation(
                            EMeasurementsTreatments.CENTRAL_VAIN
                          ),
                        },
                        {
                          id: EMeasurementsTreatments.STOP_BLEEDING,
                          title: translation(
                            EMeasurementsTreatments.STOP_BLEEDING
                          ),
                        },
                        {
                          id: EMeasurementsTreatments.IO,
                          title: translation(EMeasurementsTreatments.IO),
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
  measurementsView: {
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
