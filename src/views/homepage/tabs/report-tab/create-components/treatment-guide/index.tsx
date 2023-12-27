import _ from "lodash";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Divider } from "react-native-paper";
import { DropDown } from "../../../../../../form-components/dropdown";
import { InputField } from "../../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { ITreatmentGuide } from "../../../../../../interfaces";
import { gutter, inputFontSize } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { useStationStore } from "../../../../../../store/station.store";
import { design } from "../shared-style";
import { AddGuide } from "./add-guide";

export const emptyState: ITreatmentGuide = {
  id: null,
  care_guide: null,
  order_time: null,
  execution_time: null,
  provider_issuer: null,
  provider_executer: null,
};
function TreatmentGuide() {
  const translation = useTranslation();
  const providers = useStationStore((state) => state.station.care_providers);
  const guides = usePatientRecordsStore(
    (state) => state.activePatient.treatmentGuide.guides ?? []
  );

  const handlers = usePatientRecordsStore(
    (state) => state.treatmentGuide_handlers
  );

  const [guide, setGuide] = useState<ITreatmentGuide>({
    ...emptyState,
    order_time: new Date().getTime(),
  });

  const valid =
    (!_.isNull(guide.care_guide) && !_.isNull(guide.provider_issuer)) === true;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("treatment_guide_title")} />
      </Card.Content>
      {guides.map((guide, index) => (
        <View key={guide.id}>
          <>
            <Card.Content style={[styles.innerContent]}>
              <InputField
                editable={false}
                label={translation("treatment_care_guide")}
                value={guide.care_guide}
                onChange={(care_guide: string) => {
                  handlers.updateGuideAtIndex({ care_guide }, index);
                }}
              />
            </Card.Content>
            <Card.Content style={[styles.innerContent]}>
              <View style={[styles.innerContent, styles.split]}>
                <View style={{ width: 120 }}>
                  <TimePicker
                    editable={false}
                    value={guide.order_time}
                    label={translation("treatment_order_time")}
                    onChange={(order_time) => {
                      order_time !== guide.order_time &&
                        handlers.updateGuideAtIndex({ order_time }, index);
                    }}
                  />
                </View>
                <DropDown
                  editable={false}
                  initialValue={guide.provider_issuer?.full_name?.toString()}
                  onSelect={(value) => {
                    const provider_issuer = Object.values(providers).find(
                      (p) => p.idf_id.toString() === value.id
                    );

                    handlers.updateGuideAtIndex({ provider_issuer }, index);
                  }}
                  label={translation("treatment_provider_issuer")}
                  options={Object.values(providers).map((provider) => ({
                    id: provider.idf_id.toString(),
                    title: `${provider.full_name}, ${provider.idf_id}`,
                  }))}
                />
              </View>
            </Card.Content>
          </>
          <Divider style={{ marginTop: 10, marginBottom: 10, width: "100%" }} />
        </View>
      ))}
      <AddGuide guide={guide} setGuide={setGuide} />
      <Card.Content
        style={[styles.innerContent, styles.addItemAction]}
        aria-disabled={!valid}
        testID="add-guide-button"
      >
        <Button
          mode={valid ? "contained" : "outlined"}
          labelStyle={{ fontSize: inputFontSize }}
          icon="plus"
          onPress={() => {
            handlers.addGuide(guide);
            setGuide({ ...emptyState, order_time: new Date().getTime() });
          }}
          disabled={!valid}
        >
          {translation("save")}
        </Button>
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
  card: design.card,
  content: design.content,
  innerContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});

export default TreatmentGuide;
