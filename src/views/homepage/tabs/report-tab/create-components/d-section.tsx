import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
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
import Context from "../context";
import { design } from "./shared-style";
import { ToggleButton } from "../../../../../form-components/ToggleButton";
import {
  calcGCS,
  convertToOptions,
  isSelectedHandler,
  mergeData,
  toggleListData,
} from "./utils";
import { emptyPatient } from "..";

const emptyState: IReaction = {
  GCS: null,
  eyes: EReactionEyes.NONE,
  speech: EReactionSpeech.NONE,
  movement: EReactionMovement.NONE,
  general: [],
};
export function DSection() {
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const reaction = mergeData(patient?.reaction, emptyPatient.reaction);
        const { general, speech, movement, eyes } = reaction;

        const toggleValue = (value) => {
          update({
            reaction: {
              ...patient.reaction,
              general: toggleListData(general, value),
            },
          });
        };
        const isSelected = isSelectedHandler(general);

        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("dSection")} />
            </Card.Content>
            <Card.Content style={[styles.innerContent]}>
              <ToggleButton
                label={translation(EReactionGeneral.UN_EQUAL_PUPILS)}
                status={isSelected(EReactionGeneral.UN_EQUAL_PUPILS)}
                onSelect={toggleValue}
                value={EReactionGeneral.UN_EQUAL_PUPILS}
              />
              <ToggleButton
                label={translation(EReactionGeneral.NON_MOTORIZED)}
                onSelect={toggleValue}
                status={isSelected(EReactionGeneral.NON_MOTORIZED)}
                value={EReactionGeneral.NON_MOTORIZED}
              />
              <ToggleButton
                label={translation(EReactionGeneral.NON_SENSORY)}
                onSelect={toggleValue}
                status={isSelected(EReactionGeneral.NON_SENSORY)}
                value={EReactionGeneral.NON_SENSORY}
              />
              <ToggleButton
                label={translation(EReactionGeneral.OK)}
                onSelect={toggleValue}
                status={isSelected(EReactionGeneral.OK)}
                value={EReactionGeneral.OK}
              />
            </Card.Content>
            <Card.Content style={[styles.innerContent]}>
              <View style={[styles.section]}>
                <DropDown
                  placeholder=""
                  initialValue={speech}
                  onSelect={(value) => {
                    update({
                      reaction: {
                        ...patient.reaction,
                        speech: value.id as EReactionSpeech,
                      },
                    });
                  }}
                  label={translation("speech")}
                  options={convertToOptions(EReactionSpeech, translation)}
                />
                <DropDown
                  placeholder=""
                  initialValue={eyes}
                  onSelect={(value) => {
                    update({
                      reaction: {
                        ...patient.reaction,
                        eyes: value.id as EReactionEyes,
                      },
                    });
                  }}
                  label={translation("eys")}
                  options={convertToOptions(EReactionEyes, translation)}
                />
              </View>
              <View style={[styles.section]}>
                <DropDown
                  placeholder=""
                  initialValue={movement}
                  onSelect={(value) => {
                    update({
                      reaction: {
                        ...patient.reaction,
                        movement: value.id as EReactionMovement,
                      },
                    });
                  }}
                  label={translation("speech")}
                  options={convertToOptions(EReactionMovement, translation)}
                />
                <View style={[styles.section, styles.GCS]}>
                  <Text style={[styles.gcsTitle]}>{translation("GCS")}</Text>
                  <Text style={[styles.fakeInput]}>
                    {calcGCS({ eyes, movement, speech })}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        );
      }}
    </Context.Consumer>
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
