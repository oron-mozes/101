import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../form-components/dropdown";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { IMeasurementsAction } from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { useTaggadStore } from "../../../../../store/taggad.store";
import { design } from "./shared-style";
import { convertStringToNumber } from "./utils";

const emptyState: IMeasurementsAction = {
  id: null,
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
  const { measurements } = usePatientRecordsStore(
    (state) => state.activePatient.treatmentGuide
  );
  const providers = useTaggadStore((state) => state.taggad.care_providers);
  const handlers = usePatientRecordsStore(
    (state) => state.treatmentGuide_handlers
  );
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.disabled
  );

  useEffect(() => {
    if (measurements.actions.length === 0) {
      addRow();
    }
  }, []);

  const addRow = () => {
    handlers.addMeasurementsAction(emptyState);
  };

  const painRang = [...Array(11).keys()];
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("treatment_measurements_title")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={[styles.innerContent, { flex: 1 }]}>
          <DropDown
            disabled={disabled}
            label={translation("treatment_period")}
            initialValue={measurements.period?.toString()}
            onSelect={(selected) => {
              handlers.setPeriod(convertStringToNumber(selected.id));
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
              disabled={disabled}
              value={measurement.time}
              label={translation("treatment_execution_time")}
              onChange={(time) => {
                handlers.updateAtIndex({ time }, index);
              }}
            />
            <DropDown
              disabled={disabled}
              initialValue={measurement.provider?.idf_id?.toString()}
              onSelect={(value) => {
                const provider = Object.values(providers).find(
                  (p) => p.idf_id.toString() === value.id
                );
                handlers.updateAtIndex({ provider }, index);
              }}
              label={translation("treatment_provider")}
              options={Object.values(providers).map((provider) => ({
                id: provider.idf_id.toString(),
                title: `${provider.full_name}, ${provider.idf_id}`,
              }))}
            />
            <InputField
              disabled={disabled}
              maxLength={3}
              numeric
              label={translation("treatment_puls")}
              value={measurement.puls?.toString()}
              onChange={(puls) => {
                handlers.updateAtIndex(
                  { puls: convertStringToNumber(puls) },
                  index
                );
              }}
            />
            <InputField
              disabled={disabled}
              numeric
              label={translation("treatment_systolic")}
              value={measurement.systolic?.toString()}
              onChange={(systolic) => {
                handlers.updateAtIndex(
                  { systolic: convertStringToNumber(systolic) },
                  index
                );
              }}
            />
            <InputField
              disabled={disabled}
              numeric
              label={translation("treatment_diastolic")}
              value={measurement.diastolic?.toString()}
              onChange={(diastolic) => {
                handlers.updateAtIndex(
                  { diastolic: convertStringToNumber(diastolic) },
                  index
                );
              }}
            />
            <InputField
              disabled={disabled}
              numeric
              label={translation("treatment_breath")}
              value={measurement.breath?.toString()}
              onChange={(breath) => {
                handlers.updateAtIndex(
                  { breath: convertStringToNumber(breath) },
                  index
                );
              }}
            />
            <InputField
              disabled={disabled}
              numeric
              label={translation("treatment_spo2")}
              value={measurement.spo2?.toString()}
              onChange={(spo2) => {
                handlers.updateAtIndex(
                  { spo2: convertStringToNumber(spo2) },
                  index
                );
              }}
            />
            <InputField
              disabled={disabled}
              numeric
              label={translation("treatment_etcos")}
              value={measurement.etcos?.toString()}
              onChange={(etcos) => {
                handlers.updateAtIndex(
                  { etcos: convertStringToNumber(etcos) },
                  index
                );
              }}
            />
            <DropDown
              disabled={disabled}
              initialValue={measurement.pain?.toString()}
              onSelect={(pain) => {
                handlers.updateAtIndex(
                  { pain: convertStringToNumber(pain.id) },
                  index
                );
              }}
              label={translation("treatment_pain")}
              options={painRang.map((pain) => ({
                id: pain?.toString(),
                title: `${pain}`,
              }))}
            />
            <InputField
              disabled={disabled}
              numeric
              label={translation("treatment_prpo")}
              value={measurement.prpo?.toString()}
              onChange={(prpo) => {
                handlers.updateAtIndex(
                  { prpo: convertStringToNumber(prpo) },
                  index
                );
              }}
            />
            <InputField
              disabled={disabled}
              numeric
              label={translation("GCS")}
              value={measurement.GCS?.toString()}
              onChange={(GCS) => {
                handlers.updateAtIndex(
                  { GCS: convertStringToNumber(GCS) },
                  index
                );
              }}
            />
            <InputField
              disabled={disabled}
              numeric
              label={translation("treatment_urine")}
              value={measurement.urine?.toString()}
              onChange={(urine) => {
                handlers.updateAtIndex(
                  { urine: convertStringToNumber(urine) },
                  index
                );
              }}
            />
            <InputField
              disabled={disabled}
              numeric
              label={translation("treatment_blood")}
              value={measurement.blood?.toString()}
              onChange={(blood) => {
                handlers.updateAtIndex(
                  { blood: convertStringToNumber(blood) },
                  index
                );
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
