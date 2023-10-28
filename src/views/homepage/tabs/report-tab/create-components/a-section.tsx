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
  const [hasAirwayInjury, toggleAirWayInjury] = useState<string>(null);
  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const addRow = () => {
          update({ airway: [...patient.airway, emptyState] });
        };
        if (
          hasAirwayInjury === TOGGLE.YES &&
          !Boolean(patient.airway?.length)
        ) {
          addRow();
        }
        if (hasAirwayInjury !== TOGGLE.YES && patient.airway.length !== 0) {
          toggleAirWayInjury(TOGGLE.YES);
        }

        const updateInIndex = (
          data: Partial<IAirWayInformation>,
          index: number
        ) => {
          const newData = patient.airway;
          newData[index] = { ...newData[index], ...data };
          update({ airway: newData });
        };
        const isLastItemValid = () => {
          return (
            patient.airway.length !== 0 &&
            !Object.values(patient.airway[patient.airway.length - 1]).some(
              (v) => v === null
            )
          );
        };

        const removeByIndex = (index: number) => {
          const newData = patient.airway.filter((_, i) => i !== index);
          update({ airway: newData });
          if (newData.length === 0) {
            toggleAirWayInjury(null);
          }
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
                    toggleAirWayInjury(id);
                  } else {
                    toggleAirWayInjury(id);
                  }
                }}
                selected={hasAirwayInjury ?? null}
                options={[
                  { id: TOGGLE.YES, value: translation(TOGGLE.YES) },
                  { id: TOGGLE.NO, value: translation(TOGGLE.NO) },
                ]}
              />
            </Card.Content>
            {hasAirwayInjury === TOGGLE.YES &&
              patient.airway?.map((airWayInfo: IAirWayInformation, index) => {
                const isSuccessful =
                  airWayInfo.successful === null
                    ? null
                    : airWayInfo.successful
                    ? TOGGLE.YES
                    : TOGGLE.NO;

                console.log({ airWayInfo });
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
                        initialValue={
                          airWayInfo.action &&
                          translation(airWayInfo.action.toLowerCase())
                        }
                        onSelect={(value: TAutocompleteDropdownItem) => {
                          value &&
                            updateInIndex(
                              {
                                action:
                                  value.id.toLowerCase() as TAirWayTreatment,
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
                            id: EAirWayTreatment.INTUBE.toLowerCase(),
                            title: translation(
                              EAirWayTreatment.INTUBE.toLowerCase()
                            ),
                          },
                          {
                            id: EAirWayTreatment.CONIOTOMY.toLowerCase(),
                            title: translation(
                              EAirWayTreatment.CONIOTOMY.toLowerCase()
                            ),
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
