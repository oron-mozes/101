import { StyleSheet, View } from "react-native";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Card, Icon, Text } from "react-native-paper";
import { emptyPatient } from "..";
import { DropDown } from "../../../../../form-components/dropdown";
import { RadioGroup } from "../../../../../form-components/radio-group";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import {
  EAirWayTreatment,
  IAirWayInformation,
  ITreatment,
  ITreatmentGuide,
  TAirWayTreatment,
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
import { useContext, useEffect, useMemo } from "react";
import { InputField } from "../../../../../form-components/input-field";

const emptyState: ITreatmentGuide = {
  care_guide: null,
  order_time: null,
  execution_time: null,
  provider_issuer: null,
  provider_executer: null,
};
export function TreatmentGuide() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update, providers } = context;
  const treatmentGuide: ITreatment = useMemo(
    () => mergeData(patient.treatmentGuide, emptyPatient.treatmentGuide),
    [patient.treatmentGuide]
  );
  useEffect(() => {
    if (treatmentGuide.guides.length === 0) {
      update({ treatmentGuide: { ...treatmentGuide, guides: [emptyState] } });
    }
  }, []);

  const addRow = () => {
    update({
      treatmentGuide: {
        ...treatmentGuide,
        guides: [...treatmentGuide.guides, emptyState],
      },
    });
  };

  const updateInIndex = (data: Partial<ITreatmentGuide>, index: number) =>
    update({
      treatmentGuide: {
        ...treatmentGuide,
        guides: updateDataInIndex(
          treatmentGuide.guides,
          data as ITreatmentGuide,
          index
        ),
      },
    });

  const removeByIndex = (index: number) => {
    const newData = removeByIndexHandler(treatmentGuide.guides, index);
    update({
      treatmentGuide: {
        ...treatmentGuide,
        guides: newData,
      },
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("treatment_guide_title")} />
      </Card.Content>
      {treatmentGuide.guides.map((guide, index) => (
        <View key={index}>
          <Card.Content style={[styles.innerContent]}>
            <InputField
              label={translation("treatment_care_guide")}
              value={guide.care_guide}
              onChange={(care_guide: string) => {
                updateInIndex({ care_guide }, index);
              }}
            />
          </Card.Content>
          <Card.Content style={[styles.innerContent]}>
            <View style={[styles.innerContent, styles.split]}>
              <TimePicker
                value={guide.order_time}
                label={translation("treatment_order_time")}
                onChange={(order_time) => {
                  updateInIndex({ order_time }, index);
                }}
              />
              <DropDown
                placeholder={translation("select")}
                initialValue={guide.provider_issuer?.idf_id?.toString()}
                onSelect={(value) => {
                  const provider_issuer = Object.values(providers).find(
                    (p) => p.idf_id.toString() === value.id
                  );
                  updateInIndex({ provider_issuer }, index);
                }}
                label={translation("treatment_provider_issuer")}
                options={Object.values(providers).map((provider) => ({
                  id: provider.idf_id.toString(),
                  title: `${provider.full_name}, ${provider.idf_id}`,
                }))}
              />
            </View>
            <View style={[styles.innerContent, styles.split]}>
              <TimePicker
                value={guide.execution_time}
                label={translation("treatment_execution_time")}
                onChange={(execution_time) => {
                  updateInIndex({ execution_time }, index);
                }}
              />
              <DropDown
                placeholder={translation("select")}
                initialValue={guide.provider_executer?.idf_id?.toString()}
                onSelect={(value) => {
                  const provider_executer = Object.values(providers).find(
                    (p) => p.idf_id.toString() === value.id
                  );
                  updateInIndex({ provider_executer }, index);
                }}
                label={translation("treatment_provider_executer")}
                options={Object.values(providers).map((provider) => ({
                  id: provider.idf_id.toString(),
                  title: `${provider.full_name}, ${provider.idf_id}`,
                }))}
              />
            </View>
          </Card.Content>
        </View>
      ))}
      <Card.Content style={[styles.innerContent, styles.addItemAction]}>
        <Icon size={20} source="plus" color={colors.primary} />
        <Text style={{ color: colors.primary, fontSize: 17 }} onPress={addRow}>
          {translation("treatment_guide_new")}
        </Text>
      </Card.Content>
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
  split: {
    flex: 1,
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
