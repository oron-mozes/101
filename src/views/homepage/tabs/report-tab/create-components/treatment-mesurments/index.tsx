import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../../form-components/dropdown";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { IMeasurementsAction } from "../../../../../../interfaces";
import { colors, gutter } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { useTaggadStore } from "../../../../../../store/taggad.store";
import { design } from "../shared-style";
import { convertStringToNumber } from "../utils";
import { MeasurementForm } from "./measurments-form";
import { Dimensions } from "react-native";

export const columnWidth = 30;

const emptyState: IMeasurementsAction = {
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
export function Measurements() {
  const screenWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);

  const translation = useTranslation();
  const period = usePatientRecordsStore(
    (state) => state.activePatient.treatmentGuide.measurements.period
  );
  const actions = usePatientRecordsStore((state) => {
    return state.activePatient.treatmentGuide.measurements.actions ?? [];
  });
  const scrollWidth =
    ((screenWidth * columnWidth) / 100) * Math.max(actions.length, 3);
  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: -scrollWidth, animated: true });
  }, [scrollWidth]);
  const handlers = usePatientRecordsStore(
    (state) => state.treatmentGuide_handlers
  );
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.editable
  );

  useEffect(() => {
    if (actions.length === 0) {
      addRow();
    }
  }, []);

  const addRow = () => {
    handlers.addMeasurementsAction({
      ...emptyState,
      time: new Date().getTime(),
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("treatment_measurements_title")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={[styles.innerContent, { flex: 1 }]}>
          <DropDown
            editable={disabled}
            label={translation("treatment_period")}
            initialValue={period?.toString()}
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
        <ScrollView
          horizontal={true}
          style={{ width: scrollWidth }}
          ref={scrollViewRef}
        >
          {actions.map((measurement, index) => (
            <MeasurementForm
              onComplete={addRow}
              editable={index === actions.length - 1}
              index={index}
              measurement={measurement}
              key={measurement.id + index}
            />
          ))}
          {actions.length < 2 && (
            <View style={{ flex: 1 }}>
              <MeasurementForm
                onComplete={() => {}}
                editable={false}
                index={-1}
                measurement={{
                  ...emptyState,
                  time: new Date().getTime(),
                }}
              />
            </View>
          )}
          {actions.length < 3 && (
            <View style={{ flex: 1 }}>
              <MeasurementForm
                onComplete={() => {}}
                editable={false}
                index={-1}
                measurement={{
                  ...emptyState,
                  time: new Date().getTime(),
                }}
              />
            </View>
          )}
        </ScrollView>
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
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
