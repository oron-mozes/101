import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Button, Card, Icon, Text } from "react-native-paper";
import { Autocomplete } from "../../../../../form-components/autocomplete";
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
import Context from "../context";
import { design } from "./shared-style";
import { DropDown } from "../../../../../form-components/dropdown";

const emptyState: IAirWayInformation = {
  action: null,
  time: null,
  successful: null,
};
export function ASection() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const { airway = { actions: [], fulfill: null } } = patient;
        const { actions = [], fulfill } = airway;

        const addRow = () => {
          update({
            airway: { ...airway, actions: [...actions, emptyState] },
          });
        };

        if (fulfill && !Boolean(actions?.length)) {
          addRow();
        }

        const updateInIndex = (
          data: Partial<IAirWayInformation>,
          index: number
        ) => {
          const newData = actions;
          newData[index] = { ...newData[index], ...data };
          update({ airway: { ...airway, actions: newData } });
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
            airway: {
              ...airway,
              actions: newData,
              fulfill: newData.length !== 0,
            },
          });
        };

        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("aSection")} />
            </Card.Content>
            <Card.Content style={[styles.innerContent, styles.airwayView]}>
              <RadioGroup
                horizontal
                label={translation("airWayInjury")}
                onSelect={(id: string) => {
                  if (id === TOGGLE.YES) {
                    update({ airway: { ...airway, fulfill: true } });
                  } else {
                    update({ airway: { ...airway, fulfill: false } });
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
                    key={airWayInfo.action}
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
                        value={airWayInfo.time}
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
                        initialValue={airWayInfo.action}
                        onSelect={(value: TAutocompleteDropdownItem) => {
                          value &&
                            updateInIndex(
                              {
                                action: value.id as TAirWayTreatment,
                              },
                              index
                            );
                        }}
                        options={[
                          {
                            id: EAirWayTreatment.AW,
                            title: translation(EAirWayTreatment.AW),
                          },
                          {
                            id: EAirWayTreatment.INTUBE,
                            title: translation(EAirWayTreatment.INTUBE),
                          },
                          {
                            id: EAirWayTreatment.CONIOTOMY,
                            title: translation(EAirWayTreatment.CONIOTOMY),
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
  airwayView: {
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
