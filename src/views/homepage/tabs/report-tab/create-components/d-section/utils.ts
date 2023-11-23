import {
  EPosition,
  EReactionEyes,
  EReactionMovement,
  EReactionSpeech,
  IOption,
} from "../../../../../../interfaces";

const GSC_SCORE = {
  speech: {
    [EReactionSpeech.NONE]: 1,
    [EReactionSpeech.VOICES]: 2,
    [EReactionSpeech.WORDS]: 3,
    [EReactionSpeech.CONFUSED]: 4,
    [EReactionSpeech.STRAIGHT]: 5,
  },
  eyes: {
    [EReactionEyes.NONE]: 1,
    [EReactionEyes.TO_PAIN]: 2,
    [EReactionEyes.TO_VOICE]: 3,
    [EReactionEyes.SPONTANEITY]: 4,
  },
  movement: {
    [EReactionMovement.NONE]: 1,
    [EReactionMovement.STRAIGHTENING]: 2,
    [EReactionMovement.BENDING]: 3,
    [EReactionMovement.RETREAT]: 4,
    [EReactionMovement.IN_PLACE]: 5,
    [EReactionMovement.OFTEN]: 6,
  },
};

export function calcGCS({
  eyes,
  speech,
  movement,
}: {
  eyes: EReactionEyes;
  speech: EReactionSpeech;
  movement: EReactionMovement;
}): number {
  return (
    (GSC_SCORE.speech?.[speech] || 0) +
    (GSC_SCORE.movement?.[movement] || 0) +
    (GSC_SCORE.eyes?.[eyes] || 0)
  );
}
