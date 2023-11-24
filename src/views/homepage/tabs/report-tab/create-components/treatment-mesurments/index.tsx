import { useEffect, useMemo, useRef } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Divider } from "react-native-paper";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { gutter } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { design } from "../shared-style";
import { MeasurementForm, emptyState } from "./measurments-form";

export const columnWidth = 40;

function Measurements() {
  const screenWidth = Dimensions.get("window").width - 60;
  const scrollViewRef = useRef(null);

  const translation = useTranslation();
  const actions = usePatientRecordsStore((state) => {
    return [...state.activePatient.treatmentGuide.measurements.actions];
  });
  const scrollWidth = useMemo(() => {
    if (actions.length < 2) {
      return screenWidth;
    }
    return (screenWidth / 2) * (actions.length + 1);
  }, [actions.length]);
  useEffect(() => {
    scrollViewRef.current.scrollTo({ x: -scrollWidth, animated: true });
  }, [scrollWidth]);
  const handlers = usePatientRecordsStore(
    (state) => state.treatmentGuide_handlers
  );

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
        <View style={[styles.innerContent, styles.addItemAction]}>
          <Button mode="contained" onPress={addRow} icon="plus">
            {translation("treatment_new")}
          </Button>
        </View>
      </Card.Content>
      <Divider />
      <Card.Content style={[styles.innerContent]}>
        <ScrollView
          horizontal={true}
          style={{}}
          contentContainerStyle={{
            justifyContent: "center",
            width: scrollWidth / (actions.length === 0 ? 2 : 1),
          }}
          ref={scrollViewRef}
        >
          {new Array(actions.length + 1).fill(1).map((_, index) => (
            <MeasurementForm formIndex={index} />
          ))}
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
    marginBottom: 20,
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

export default Measurements;
