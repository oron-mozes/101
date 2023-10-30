import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Card, Icon, Text } from "react-native-paper";
import { emptyPatient } from "..";
import { DropDown } from "../../../../../form-components/dropdown";
import { InputField } from "../../../../../form-components/input-field";
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
import {
  convertToOptions,
  mergeData,
  removeByIndexHandler,
  updateDataInIndex,
  validateLastItem,
} from "./utils";
import { useContext } from "react";

const emptyState: IBreathingInformation = {
  action: null,
  time: null,
  successful: null,
};
export function BSection() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update } = context;
  const breathing = mergeData(patient?.breathing, emptyPatient.breathing);
  const { actions, fulfill } = breathing;

  const addRow = () => {
    update({
      breathing: { ...breathing, actions: [...actions, emptyState] },
    });
  };

  if (fulfill && !Boolean(actions?.length)) {
    addRow();
  }

  const updateInIndex = (data: Partial<IBreathingInformation>, index: number) =>
    update({
      breathing: {
        ...breathing,
        actions: updateDataInIndex(
          actions,
          data as IBreathingInformation,
          index
        ),
      },
    });

  const removeByIndex = (index: number) => {
    const newData = removeByIndexHandler(actions, index);
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
          options={convertToOptions(TOGGLE, translation)}
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
                  <Icon size={20} source="delete" color={colors.primary} />
                </Text>

                <RadioGroup
                  label={translation("actionResult")}
                  onSelect={(id: string) => {
                    updateInIndex({ successful: id === TOGGLE.YES }, index);
                  }}
                  selected={isSuccessful}
                  options={convertToOptions(TOGGLE, translation)}
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
                  options={convertToOptions(EBreathingTreatment, translation)}
                />
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
