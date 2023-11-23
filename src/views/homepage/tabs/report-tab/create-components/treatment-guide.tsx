import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Icon, Text } from "react-native-paper";
import { DropDown } from "../../../../../form-components/dropdown";
import { InputField } from "../../../../../form-components/input-field";
import { SectionHeader } from "../../../../../form-components/section-header";
import { TimePicker } from "../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { ITreatmentGuide } from "../../../../../interfaces";
import { colors, gutter } from "../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { useStationStore } from "../../../../../store/station.store";
import { design } from "./shared-style";

const emptyState: ITreatmentGuide = {
  id: null,
  care_guide: null,
  order_time: null,
  execution_time: null,
  provider_issuer: null,
  provider_executer: null,
};
export function TreatmentGuide() {
  const translation = useTranslation();
  const providers = useStationStore((state) => state.station.care_providers);
  const guides = usePatientRecordsStore(
    (state) => state.activePatient.treatmentGuide.guides ?? []
  );
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.editable
  );
  const handlers = usePatientRecordsStore(
    (state) => state.treatmentGuide_handlers
  );

  useEffect(() => {
    if (guides.length === 0) {
      addRow();
    }
  }, []);

  const addRow = () => {
    handlers.addGuide({
      ...emptyState,
      execution_time: new Date().getTime(),
      order_time: new Date().getTime(),
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("treatment_guide_title")} />
      </Card.Content>
      {guides.map((guide, index) => (
        <View key={index}>
          <Card.Content style={[styles.innerContent]}>
            <InputField
              editable={disabled}
              label={translation("treatment_care_guide")}
              value={guide.care_guide}
              onChange={(care_guide: string) => {
                handlers.updateGuideAtIndex({ care_guide }, index);
              }}
            />
          </Card.Content>
          <Card.Content style={[styles.innerContent]}>
            <View style={[styles.innerContent, styles.split]}>
              <TimePicker
                editable={true}
                value={guide.order_time}
                label={translation("treatment_order_time")}
                onChange={(order_time) => {
                  handlers.updateGuideAtIndex({ order_time }, index);
                }}
              />
              <DropDown
                editable={true}
                initialValue={guide.provider_issuer?.idf_id?.toString()}
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
            {/* <View style={[styles.innerContent, styles.split]}>
              <TimePicker
                disabled={false}
                value={guide.execution_time}
                label={translation("treatment_execution_time")}
                onChange={(execution_time) => {
                  handlers.updateGuideAtIndex({ execution_time }, index);
                }}
              />
              <DropDown
                disabled={false}
                initialValue={guide.provider_executer?.idf_id?.toString()}
                onSelect={(value) => {
                  const provider_executer = Object.values(providers).find(
                    (p) => p.idf_id.toString() === value.id
                  );
                  handlers.updateGuideAtIndex({ provider_executer }, index);
                }}
                label={translation("treatment_provider_executer")}
                options={Object.values(providers).map((provider) => ({
                  id: provider.idf_id.toString(),
                  title: `${provider.full_name}, ${provider.idf_id}`,
                }))}
              />
            </View> */}
          </Card.Content>
        </View>
      ))}
      <Card.Content style={[styles.innerContent, styles.addItemAction]}>
        <Icon size={20} source="plus" color={colors.primary} />
        <Text
          style={{ color: colors.primary, fontSize: 17 }}
          disabled={false}
          onPress={addRow}
        >
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
    justifyContent: "flex-end",
    margin: gutter,
  },
  split: {
    flex: 1,
  },
  card: design.card,
  content: design.content,
  innerContent: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});
