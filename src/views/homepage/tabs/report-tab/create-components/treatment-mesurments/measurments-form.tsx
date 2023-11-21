import { StyleSheet, View } from "react-native";
import { DropDown } from "../../../../../../form-components/dropdown";
import { InputField } from "../../../../../../form-components/input-field";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { convertStringToNumber } from "../utils";
import { gutter } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { IMeasurementsAction } from "../../../../../../interfaces";
import { useStationStore } from "../../../../../../store/station.store";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { BloodPressureInputFieldHandler } from "../../../../../../form-components/blood-pressure-input-field";
import { Dimensions } from "react-native";
import { columnWidth } from "./";

export function MeasurementForm({
  measurement,
  index,
  editable,
  onComplete,
}: {
  onComplete(): void;
  editable: boolean;
  index: number;
  measurement: IMeasurementsAction;
}) {
  const screenWidth = Dimensions.get("window").width;
  const widthInVw = (screenWidth * columnWidth) / 100;
  const [lockEdit, toggleEdit] = useState<boolean>(editable);

  const translation = useTranslation();
  const handlers = usePatientRecordsStore(
    (state) => state.treatmentGuide_handlers
  );
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.editable
  );
  const providers = useStationStore((state) => state.station.care_providers);
  const painRang = [...Array(11).keys()];
  useEffect(() => {
    // toggleEdit(!disabled && editable);
  }, [disabled, editable]);
  return (
    <View
      style={[
        styles.column,
        editable ? {} : styles.disabled,
        { width: widthInVw },
      ]}
    >
      <TimePicker
        editable={lockEdit}
        value={measurement.time}
        label={translation("treatment_execution_time")}
        onChange={(time) => {
          handlers.updateAtIndex({ time }, index);
        }}
      />
      <DropDown
        editable={lockEdit}
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
        editable={lockEdit}
        maxLength={3}
        numeric
        label={translation("treatment_puls")}
        value={measurement.puls?.toString()}
        onChange={(puls) => {
          handlers.updateAtIndex({ puls: convertStringToNumber(puls) }, index);
        }}
      />
      <BloodPressureInputFieldHandler
        onChange={(bloodPressure) => {
          handlers.updateAtIndex({ bloodPressure }, index);
        }}
        label={translation("treatment_bloodPressure")}
        editable={lockEdit}
        value={measurement.bloodPressure}
      />

      <InputField
        editable={lockEdit}
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
        editable={lockEdit}
        numeric
        label={translation("treatment_spo2")}
        value={measurement.spo2?.toString()}
        onChange={(spo2) => {
          handlers.updateAtIndex({ spo2: convertStringToNumber(spo2) }, index);
        }}
      />
      <InputField
        editable={lockEdit}
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
        editable={lockEdit}
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
        editable={lockEdit}
        numeric
        label={translation("treatment_prpo")}
        value={measurement.prpo?.toString()}
        onChange={(prpo) => {
          handlers.updateAtIndex({ prpo: convertStringToNumber(prpo) }, index);
        }}
      />
      <InputField
        editable={lockEdit}
        numeric
        label={translation("GCS")}
        value={measurement.GCS?.toString()}
        onChange={(GCS) => {
          handlers.updateAtIndex({ GCS: convertStringToNumber(GCS) }, index);
        }}
      />
      <InputField
        editable={lockEdit}
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
        editable={lockEdit}
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
      <Button
        icon="check"
        disabled={!lockEdit}
        mode="contained"
        style={{ margin: 3 }}
        onPress={onComplete}
      >
        {translation("done")}
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  disabled: {
    ...design.disabled,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    width: "33%",
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
