import { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Icon, Text } from "react-native-paper";
import { emptyPatient } from "..";
import { DropDown } from "../../../../../form-components/dropdown";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import {
  IMeasurementsAction,
  ITreatment,
  ITreatmentGuide,
} from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import Context from "../context";
import { design } from "./shared-style";
import { mergeData, removeByIndexHandler, updateDataInIndex } from "./utils";

const emptyState: IMeasurementsAction = {
  time: null,
  provider: null,
  puls: null,
  systolic: null,
  diastolic: null,
  breath: null,
  spo2: null,
  etcos: null,
  pain: null,
  prpo: null,
  GCS: null,
  urine: null,
  blood: null,
};
export function Measurements() {
  const translation = useTranslation();
  const context = useContext(Context);
  const { patient, update, providers } = context;
  const treatmentGuide: ITreatment = mergeData(
    patient.treatmentGuide,
    emptyPatient.treatmentGuide
  );
  useEffect(() => {
    if (treatmentGuide.measurements.actions.length === 0) {
      update({
        treatmentGuide: {
          ...treatmentGuide,
          measurements: {
            ...treatmentGuide.measurements,
            actions: [emptyState, emptyState, emptyState],
          },
        },
      });
    }
  }, []);

  const addRow = () => {
    update({
      treatmentGuide: {
        ...treatmentGuide,
        measurements: {
          ...treatmentGuide.measurements,
          actions: [...treatmentGuide.measurements.actions, emptyState],
        },
      },
    });
  };

  const updateInIndex = (data: Partial<IMeasurementsAction>, index: number) =>
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

  const periodRang = [15, 30, 60, 120];
  const painRang = [...Array(11).keys()];
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("treatment_measurements_title")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={[styles.innerContent]}>
          <Text>{translation("treatment_period")}</Text>
        </View>
        <View style={[styles.innerContent, styles.addItemAction]}>
          <Icon size={20} source="plus" color={colors.primary} />
          <Text
            style={{ color: colors.primary, fontSize: 17 }}
            onPress={addRow}
          >
            {translation("treatment_guide_new")}
          </Text>
        </View>
      </Card.Content>
      <Divider />
      <Card.Content style={[styles.innerContent]}>
        {treatmentGuide.measurements.actions.map((measurement, index) => (
          <View style={styles.column}>
            <TimePicker
              value={measurement.time}
              label={translation("treatment_execution_time")}
              onChange={(time) => {
                updateInIndex({ time }, index);
              }}
            />
            <DropDown
              placeholder={translation("select")}
              initialValue={measurement.provider?.idf_id?.toString()}
              onSelect={(value) => {
                const provider = Object.values(providers).find(
                  (p) => p.idf_id.toString() === value.id
                );
                updateInIndex({ provider }, index);
              }}
              label={translation("treatment_provider")}
              options={Object.values(providers).map((provider) => ({
                id: provider.idf_id.toString(),
                title: `${provider.full_name}, ${provider.idf_id}`,
              }))}
            />
            <InputField
              numeric
              label={translation("treatment_puls")}
              value={measurement.puls}
              onChange={(puls: number) => {
                updateInIndex({ puls }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_systolic")}
              value={measurement.systolic}
              onChange={(systolic: number) => {
                updateInIndex({ systolic }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_diastolic")}
              value={measurement.diastolic}
              onChange={(diastolic: number) => {
                updateInIndex({ diastolic }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_breath")}
              value={measurement.breath}
              onChange={(breath: number) => {
                updateInIndex({ breath }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_spo2")}
              value={measurement.spo2}
              onChange={(spo2: number) => {
                updateInIndex({ spo2 }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_etcos")}
              value={measurement.etcos}
              onChange={(etcos: number) => {
                updateInIndex({ etcos }, index);
              }}
            />
            <DropDown
              placeholder={translation("select")}
              initialValue={measurement.provider?.idf_id?.toString()}
              onSelect={(value) => {
                const provider = Object.values(providers).find(
                  (p) => p.idf_id.toString() === value.id
                );
                updateInIndex({ provider }, index);
              }}
              label={translation("treatment_pain")}
              options={Object.values(providers).map((provider) => ({
                id: provider.idf_id.toString(),
                title: `${provider.full_name}, ${provider.idf_id}`,
              }))}
            />
            <InputField
              numeric
              label={translation("treatment_prpo")}
              value={measurement.prpo}
              onChange={(prpo: number) => {
                updateInIndex({ prpo }, index);
              }}
            />
            <InputField
              numeric
              label={translation("GCS")}
              value={measurement.GCS}
              onChange={(GCS: number) => {
                updateInIndex({ GCS }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_urine")}
              value={measurement.urine}
              onChange={(urine: number) => {
                updateInIndex({ urine }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_blood")}
              value={measurement.blood}
              onChange={(blood: number) => {
                updateInIndex({ blood }, index);
              }}
            />
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
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
