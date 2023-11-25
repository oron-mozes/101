import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BloodPressureInputFieldHandler } from "../../../../../../form-components/blood-pressure-input-field";
import { DropDown } from "../../../../../../form-components/dropdown";
import { InputField } from "../../../../../../form-components/input-field";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { IMeasurementsAction } from "../../../../../../interfaces";
import { gutter } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { useStationStore } from "../../../../../../store/station.store";
import { design } from "../shared-style";
import { convertStringToNumber } from "../utils";

export const emptyState: IMeasurementsAction = {
  id: null,
  time: null,
  provider: null,
  puls: null,
  bloodPressure: null,
  breath: null,
  spo2: null,
  etcos: null,
  pain: null,
  prpo: null,
  GCS: null,
  urine: null,
  blood: null,
};

export function MeasurementForm({ formIndex }: { formIndex: number }) {
  const form = usePatientRecordsStore((state) => {
    return (
      state.activePatient.treatmentGuide.measurements.actions?.[formIndex] ?? {
        ...emptyState,
        time: new Date().getTime(),
      }
    );
  });

  const translation = useTranslation();
  const updateAtIndex = usePatientRecordsStore(
    (state) => state.treatmentGuide_handlers.updateAtIndex
  );

  const providers = useStationStore((state) => state.station.care_providers);
  const painRang = [...Array(11).keys()];

  return (
    <View style={[styles.column]}>
      <TimePicker
        value={form.time}
        label={translation("treatment_execution_time")}
        onChange={(time) => {
          time !== form.time && updateAtIndex({ ...form, time }, formIndex);
        }}
      />
      <DropDown
        initialValue={form.provider?.idf_id?.toString()}
        onSelect={(value) => {
          const provider = Object.values(providers).find(
            (p) => p.idf_id.toString() === value.id
          );
          updateAtIndex({ ...form, provider }, formIndex);
          // updateForm({ ...form, provider });
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
        value={form.puls?.toString()}
        onChange={(puls) => {
          updateAtIndex(
            { ...form, puls: convertStringToNumber(puls) },
            formIndex
          );
          // updateForm({ ...form, puls: convertStringToNumber(puls) });
        }}
      />
      <BloodPressureInputFieldHandler
        onChange={(bloodPressure) => {
          updateAtIndex({ ...form, bloodPressure }, formIndex);
          // updateForm({ ...form, bloodPressure });
        }}
        label={translation("treatment_bloodPressure")}
        value={form.bloodPressure}
      />

      <InputField
        numeric
        label={translation("treatment_breath")}
        value={form.breath?.toString()}
        onChange={(breath) => {
          updateAtIndex(
            { ...form, breath: convertStringToNumber(breath) },
            formIndex
          );
          // updateForm({ ...form, breath: convertStringToNumber(breath) });
        }}
      />
      <InputField
        numeric
        label={translation("treatment_spo2")}
        value={form.spo2?.toString()}
        onChange={(spo2) => {
          updateAtIndex(
            { ...form, spo2: convertStringToNumber(spo2) },
            formIndex
          );
          // updateForm({ ...form, spo2: convertStringToNumber(spo2) });
        }}
      />
      <InputField
        numeric
        label={translation("treatment_etcos")}
        value={form.etcos?.toString()}
        onChange={(etcos) => {
          updateAtIndex(
            { ...form, etcos: convertStringToNumber(etcos) },
            formIndex
          );
          // updateForm({ ...form, etcos: convertStringToNumber(etcos) });
        }}
      />
      <DropDown
        initialValue={form.pain?.toString()}
        onSelect={(pain) => {
          updateAtIndex(
            { ...form, pain: convertStringToNumber(pain.id) },
            formIndex
          );
          // updateForm({ ...form, pain: convertStringToNumber(pain.id) });
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
        value={form.prpo?.toString()}
        onChange={(prpo) => {
          updateAtIndex(
            { ...form, prpo: convertStringToNumber(prpo) },
            formIndex
          );
          // updateForm({ ...form, prpo: convertStringToNumber(prpo) });
        }}
      />
      <InputField
        numeric
        label={translation("GCS")}
        value={form.GCS?.toString()}
        onChange={(GCS) => {
          updateAtIndex(
            { ...form, GCS: convertStringToNumber(GCS) },
            formIndex
          );
          // updateForm({ ...form, GCS: convertStringToNumber(GCS) });
        }}
      />
      <InputField
        numeric
        label={translation("treatment_urine")}
        value={form.urine?.toString()}
        onChange={(urine) => {
          updateAtIndex(
            { ...form, urine: convertStringToNumber(urine) },
            formIndex
          );
          // updateForm({ ...form, urine: convertStringToNumber(urine) });
        }}
      />
      <InputField
        numeric
        label={translation("treatment_blood")}
        value={form.blood?.toString()}
        onChange={(blood) => {
          updateAtIndex(
            { ...form, blood: convertStringToNumber(blood) },
            formIndex
          );
          // updateForm({ ...form, blood: convertStringToNumber(blood) });
        }}
      />
      {/* <Button
        icon="check"
        mode="contained"
        style={{ margin: 3 }}
        onPress={() => {
          updateAtIndex(form, formIndex);
        }}
      >
        {translation("done")}
      </Button> */}
    </View>
  );
}
const styles = StyleSheet.create({
  disabled: design.disabled,
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
