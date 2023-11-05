import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import { DropDown } from "../../../../../form-components/dropdown";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import {
  EReactionEyes,
  EReactionGeneral,
  EReactionMovement,
  EReactionSpeech,
  IReaction,
} from "../../../../../interfaces";
import {
  colors,
  gutter,
  inputContainer,
  inputHeight,
} from "../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../store/patients.record.store";
import { design } from "./shared-style";
import { calcGCS, convertToOptions, isSelectedHandler } from "./utils";

const emptyState: IReaction = {
  GCS: null,
  eyes: EReactionEyes.NONE,
  speech: EReactionSpeech.NONE,
  movement: EReactionMovement.NONE,
  general: [],
};
export function DSection() {
  const translation = useTranslation();
  const { general, speech, movement, eyes, GCS } = usePatientRecordsStore(
    (state) => state.activePatient.reaction
  );
  const handlers = usePatientRecordsStore(
    (state) => state.reaction_handlers
  );
  const disabled = usePatientRecordsStore(
    (state) => state.activePatient.disabled
  );
  useEffect(() => {
    handlers.setGCS(calcGCS({ eyes, movement, speech }));
  }, [eyes, movement, speech]);
  const isSelected = isSelectedHandler(general);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("dSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        {Object.values(EReactionGeneral).map((item) => (
          <ToggleButton
            disabled={disabled}
            label={translation(item)}
            status={isSelected(item)}
            onSelect={() => handlers.toggleGeneral(item)}
            key={item}
          />
        ))}
      </Card.Content>
      <Card.Content style={[styles.innerContent]}>
        <View style={[styles.section]}>
          <DropDown
            disabled={disabled}
            initialValue={speech}
            onSelect={(value) => {
              handlers.setSpeech(value.id as EReactionSpeech);
            }}
            label={translation("speech")}
            options={convertToOptions(EReactionSpeech, translation)}
          />
          <DropDown
            disabled={disabled}
            initialValue={eyes}
            onSelect={(value) => {
              handlers.setEyes(value.id as EReactionEyes);
            }}
            label={translation("eys")}
            options={convertToOptions(EReactionEyes, translation)}
          />
        </View>
        <View style={[styles.section]}>
          <DropDown
            disabled={disabled}
            initialValue={movement}
            onSelect={(value) => {
              handlers.setMovement(value.id as EReactionMovement);
            }}
            label={translation("movement")}
            options={convertToOptions(EReactionMovement, translation)}
          />
          <View style={[styles.section, styles.GCS]}>
            <Text style={[styles.gcsTitle]}>{translation("GCS")}</Text>
            <Text style={[styles.fakeInput]}>{GCS}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  gcsTitle: {
    fontSize: 12,
    marginRight: gutter,
  },
  fakeInput: {
    ...inputContainer,
    textAlign: "center",
    verticalAlign: "middle",
    flex: 0,
    width: "90%",
    height: inputHeight,
  },
  GCS: {
    backgroundColor: colors.radio,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  section: { flex: 1, margin: gutter },
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
