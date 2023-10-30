import { useContext, useEffect, useMemo } from "react";
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
  ITreatmentGuideMeasurementsInformation,
} from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import Context from "../context";
import { design } from "./shared-style";
import {
  convertStringToNumber,
  mergeData,
  removeByIndexHandler,
  updateDataInIndex,
} from "./utils";

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
  const measurements: ITreatmentGuideMeasurementsInformation = useMemo(
    () =>
      mergeData(
        patient.treatmentGuide.measurements,
        emptyPatient.treatmentGuide.measurements
      ),
    [patient.treatmentGuide]
  );
  useEffect(() => {
    if (measurements.actions.length === 0) {
      update({
        treatmentGuide: {
          ...patient.treatmentGuide,
          measurements: {
            ...measurements,
            actions: [emptyState, emptyState, emptyState],
          },
        },
      });
    }
  }, []);

  const addRow = () => {
    update({
      treatmentGuide: {
        ...patient.treatmentGuide,
        measurements: {
          ...measurements,

          actions: [...measurements.actions, emptyState],
        },
      },
    });
  };

  const updateInIndex = (data: Partial<IMeasurementsAction>, index: number) =>
    update({
      treatmentGuide: {
        ...patient.treatmentGuide,
        measurements: {
          ...measurements,
          actions: updateDataInIndex(
            measurements.actions,
            data as IMeasurementsAction,
            index
          ),
        },
      },
    });

  const painRang = [...Array(11).keys()];
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("treatment_measurements_title")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={[styles.innerContent, { flex: 1 }]}>
          <DropDown
            label={translation("treatment_period")}
            initialValue={measurements.period?.toString()}
            onSelect={(selected) => {
              update({
                treatmentGuide: {
                  ...patient.treatmentGuide,
                  measurements: {
                    ...measurements,
                    period: convertStringToNumber(selected.id),
                  },
                },
              });
            }}
            options={["15", "30", "60", "120"].map((time) => ({
              id: time,
              title: translation("minutes", { time }),
            }))}
          />
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={[styles.innerContent, styles.addItemAction]}>
          <Icon size={20} source="plus" color={colors.primary} />
          <Text
            style={{ color: colors.primary, fontSize: 17 }}
            onPress={addRow}
          >
            {translation("treatment_new")}
          </Text>
        </View>
      </Card.Content>
      <Divider />
      <Card.Content style={[styles.innerContent]}>
        {measurements.actions.map((measurement, index) => (
          <View style={styles.column} key={index}>
            <TimePicker
              value={measurement.time}
              label={translation("treatment_execution_time")}
              onChange={(time) => {
                updateInIndex({ time }, index);
              }}
            />
            <DropDown
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
              maxLength={3}
              numeric
              label={translation("treatment_puls")}
              value={measurement.puls?.toString()}
              onChange={(puls) => {
                updateInIndex({ puls: convertStringToNumber(puls) }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_systolic")}
              value={measurement.systolic?.toString()}
              onChange={(systolic) => {
                updateInIndex(
                  { systolic: convertStringToNumber(systolic) },
                  index
                );
              }}
            />
            <InputField
              numeric
              label={translation("treatment_diastolic")}
              value={measurement.diastolic?.toString()}
              onChange={(diastolic) => {
                updateInIndex(
                  { diastolic: convertStringToNumber(diastolic) },
                  index
                );
              }}
            />
            <InputField
              numeric
              label={translation("treatment_breath")}
              value={measurement.breath?.toString()}
              onChange={(breath) => {
                updateInIndex({ breath: convertStringToNumber(breath) }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_spo2")}
              value={measurement.spo2?.toString()}
              onChange={(spo2) => {
                updateInIndex({ spo2: convertStringToNumber(spo2) }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_etcos")}
              value={measurement.etcos?.toString()}
              onChange={(etcos) => {
                updateInIndex({ etcos: convertStringToNumber(etcos) }, index);
              }}
            />
            <DropDown
              initialValue={measurement.pain?.toString()}
              onSelect={(pain) => {
                updateInIndex({ pain: convertStringToNumber(pain.id) }, index);
              }}
              label={translation("treatment_pain")}
              options={painRang.map((pain) => ({
                id: pain?.toString(),
                title: `${pain}`,
              }))}
            />
            <InputField
              numeric
              label={translation("treatment_prpo")}
              value={measurement.prpo?.toString()}
              onChange={(prpo) => {
                updateInIndex({ prpo: convertStringToNumber(prpo) }, index);
              }}
            />
            <InputField
              numeric
              label={translation("GCS")}
              value={measurement.GCS?.toString()}
              onChange={(GCS) => {
                updateInIndex({ GCS: convertStringToNumber(GCS) }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_urine")}
              value={measurement.urine?.toString()}
              onChange={(urine) => {
                updateInIndex({ urine: convertStringToNumber(urine) }, index);
              }}
            />
            <InputField
              numeric
              label={translation("treatment_blood")}
              value={measurement.blood?.toString()}
              onChange={(blood) => {
                updateInIndex({ blood: convertStringToNumber(blood) }, index);
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
    flexDirection: "column",
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
