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
import { calcGCS } from "./utils";

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
        const general = patient?.reaction.general || [];
        const speech = patient?.reaction.speech || EReactionSpeech.NONE;
        const movement = patient?.reaction.movement || EReactionMovement.NONE;
        const eyes = patient?.reaction.eyes || EReactionEyes.NONE;
        const toggleValue = (value) => {
          const hasValue = general.find((c) => c === value);
          let newList: EReactionGeneral[] = general;
          if (hasValue) {
            newList = newList.filter((c) => c !== value);
          } else {
            newList.push(value);
          }

          update({ reaction: { ...patient.reaction, general: newList } });
        };
        const isSelected = (value: EReactionGeneral) => {
          return general.includes(value);
        };

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
                  options={[
                    {
                      id: EReactionSpeech.NONE,
                      title: translation(EReactionSpeech.NONE),
                    },

                    {
                      id: EReactionSpeech.VOICES,
                      title: translation(EReactionSpeech.VOICES),
                    },

                    {
                      id: EReactionSpeech.WORDS,
                      title: translation(EReactionSpeech.WORDS),
                    },

                    {
                      id: EReactionSpeech.CONFUSED,
                      title: translation(EReactionSpeech.CONFUSED),
                    },

                    {
                      id: EReactionSpeech.STRAIGHT,
                      title: translation(EReactionSpeech.STRAIGHT),
                    },
                  ]}
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
                  options={[
                    {
                      id: EReactionEyes.NONE,
                      title: translation(EReactionEyes.NONE),
                    },
                    {
                      id: EReactionEyes.TO_PAIN,
                      title: translation(EReactionEyes.TO_PAIN),
                    },
                    {
                      id: EReactionEyes.TO_VOICE,
                      title: translation(EReactionEyes.TO_VOICE),
                    },
                    {
                      id: EReactionEyes.SPONTANEITY,
                      title: translation(EReactionEyes.SPONTANEITY),
                    },
                  ]}
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
                  options={[
                    {
                      id: EReactionMovement.NONE,
                      title: translation(EReactionMovement.NONE),
                    },

                    {
                      id: EReactionMovement.STRAIGHTENING,
                      title: translation(EReactionMovement.STRAIGHTENING),
                    },

                    {
                      id: EReactionMovement.BENDING,
                      title: translation(EReactionMovement.BENDING),
                    },

                    {
                      id: EReactionMovement.RETREAT,
                      title: translation(EReactionMovement.RETREAT),
                    },
                    {
                      id: EReactionMovement.IN_PLACE,
                      title: translation(EReactionMovement.IN_PLACE),
                    },

                    {
                      id: EReactionMovement.OFTEN,
                      title: translation(EReactionMovement.OFTEN),
                    },
                  ]}
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
