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
  const GCS = usePatientRecordsStore(
    (state) => state.activePatient.reaction.GCS
  );
  const general = usePatientRecordsStore(
    (state) => state.activePatient.reaction.general
  );
  const speech = usePatientRecordsStore(
    (state) => state.activePatient.reaction.speech
  );
  const movement = usePatientRecordsStore(
    (state) => state.activePatient.reaction.movement
  );
  const eyes = usePatientRecordsStore(
    (state) => state.activePatient.reaction.eyes
  );

  const handlers = usePatientRecordsStore((state) => state.reaction_handlers);

  useEffect(() => {
    const newGCS = calcGCS({ eyes, movement, speech });

    handlers.setGCS(newGCS);
  }, [eyes, movement, speech]);
  const isSelected = isSelectedHandler(general);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("dSection")} />
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.section]}>
        <Text style={styles.title}>{translation("general")}</Text>
        <View style={[styles.options]}>
          {general &&
            Object.values(EReactionGeneral).map((item) => (
              <ToggleButton
                label={translation(item)}
                status={isSelected(item)}
                onSelect={() => handlers.toggleGeneral(item)}
                key={item}
              />
            ))}
        </View>
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.section]}>
        <Text>{ translation('glazgo')}</Text>
        <Text style={styles.title}>{translation("movement")}</Text>
        <View style={[styles.options]}>
          {Object.values(EReactionMovement).map((item) => (
            <ToggleButton
              label={translation(item)}
              status={item === movement}
              onSelect={() => {
                handlers.setMovement(item);
              }}
              key={item}
            />
          ))}
        </View>
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.section]}>
        <Text style={styles.title}>{translation("speech")}</Text>
        <View style={[styles.options]}>
          {Object.values(EReactionSpeech).map((item) => (
            <ToggleButton
              label={translation(item)}
              status={item === speech}
              onSelect={() => {
                handlers.setSpeech(item);
              }}
              key={item}
            />
          ))}
        </View>
      </Card.Content>
      <Card.Content style={[styles.innerContent, styles.section]}>
        <Text style={styles.title}>{translation("eyes")}</Text>
        <View style={[styles.options]}>
          {Object.values(EReactionEyes).map((item) => (
            <ToggleButton
              label={translation(item)}
              status={item === eyes}
              onSelect={() => {
                handlers.setEyes(item);
              }}
              key={item}
            />
          ))}
        </View>
      </Card.Content>
     
      <Card.Content style={[styles.innerContent]}>
        <View style={[styles.GCS]}>
          <Text style={[styles.gcsTitle]}>{translation("GCS")}</Text>
          <Text style={[styles.fakeInput]}>{GCS}</Text>
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
    width: "50%",
    backgroundColor: colors.radio,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  section: { flexDirection: "column" },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: 10,
  },
  title: {
    textAlign: "left",
  },
  options: {
    flexDirection: "row",
  },
});
