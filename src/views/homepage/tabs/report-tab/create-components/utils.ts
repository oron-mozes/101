import { EReactionEyes, EReactionMovement, EReactionSpeech } from "../../../../../interfaces";

const GSC_SCORE = {
  speech: {
    [EReactionSpeech.NONE]: 1,
    [EReactionSpeech.VOICES]: 2,
    [EReactionSpeech.WORDS]: 3,
    [EReactionSpeech.CONFUSED]: 4,
    [EReactionSpeech.STRAIGHT]: 5,
    },
    eyes: {
        [EReactionEyes.NONE]: 1
    },
    movements: {
        [EReactionMovement.NONE]: 1
    }

};

export function calcGCS() {}
