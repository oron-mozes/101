import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DropDown } from "../../../../../../form-components/dropdown";
import { InputField } from "../../../../../../form-components/input-field";
import { TimePicker } from "../../../../../../form-components/time-picker";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { IAction, ITreatmentGuide } from "../../../../../../interfaces";
import { gutter } from "../../../../../../shared-config";
import { emptyState } from "./treatment-guide";
import { Card, Icon, Text } from "react-native-paper";
import { design } from "../shared-style";
import { useStationStore } from "../../../../../../store/station.store";

export function AddGuide({
  guide,
  setGuide,
}: {
  guide: ITreatmentGuide;
  setGuide: (guide: ITreatmentGuide) => void;
}) {
  const translation = useTranslation();
  const providers = useStationStore((state) => state.station.care_providers);

  return (
    <View>
      <Card.Content style={[styles.innerContent]}>
        <InputField
          label={translation("treatment_care_guide")}
          value={guide.care_guide}
          onChange={(care_guide: string) => {
            setGuide({ ...guide, care_guide });
          }}
        />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={[styles.innerContent, styles.split]}>
          <View style={{ width: 120 }}>
            <TimePicker
              value={guide.order_time}
              label={translation("treatment_order_time")}
              onChange={(order_time) => {
                order_time !== guide.order_time &&
                  setGuide({ ...guide, order_time });
              }}
            />
          </View>
          <DropDown
            initialValue={guide.provider_issuer?.full_name?.toString()}
            onSelect={(value) => {
              const provider_issuer = Object.values(providers).find(
                (p) => p.idf_id.toString() === value.id
              );
              setGuide({ ...guide, provider_issuer });
            }}
            label={translation("treatment_provider_issuer")}
            options={Object.values(providers).map((provider) => ({
              id: provider.idf_id.toString(),
              title: `${provider.full_name}, ${provider.idf_id}`,
            }))}
          />
        </View>
      </Card.Content>
    </View>
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
