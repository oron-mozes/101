import {
  EReactionEyes,
  EReactionMovement,
  EReactionSpeech,
} from "../../../../../interfaces";

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
  eyes = EReactionEyes.NONE,
  speech = EReactionSpeech.NONE,
  movement = EReactionMovement.NONE,
}: {
  eyes: EReactionEyes;
  speech: EReactionSpeech;
  movement: EReactionMovement;
}): number {
  return (
    GSC_SCORE.speech[speech] +
    GSC_SCORE.movement[movement] +
    GSC_SCORE.eyes[eyes]
  );
}
