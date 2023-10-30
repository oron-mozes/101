import {
  EPosition,
  EReactionEyes,
  EReactionMovement,
  EReactionSpeech,
  IOption,
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

export function convertToOptions(
  data: Record<string, string>,
  translation
): IOption[] {
  return Object.values(data).map((item) => ({
    id: item,
    title: translation(item),
  }));
}

export function mergeData<T>(dataA: T, dataB: T): T {
  const newMergedObject: T = {} as T;
  const keysToIterate: Set<string> = new Set([
    ...Object.keys(dataA ?? {}),
    ...Object.keys(dataB ?? {}),
  ]);

  for (const key of keysToIterate.keys()) {
    newMergedObject[key] = dataA?.[key] ?? dataB?.[key];
  }

  return newMergedObject;
}

export function toggleListData(data, value) {
  const hasValue = data.find((c) => c === value);
  let newList = data;
  if (hasValue) {
    newList = newList.filter((c) => c !== value);
  } else {
    newList.push(value);
  }
  return newList;
}

export function isSelectedHandler<T>(data: T[]) {
  return (value) => data.includes?.(value);
}

export function updateDataInIndex<T>(data: T[], item: T, index: number): T[] {
  const newData = data;
  newData[index] = { ...newData[index], ...item };
  return newData;
}

export function validateLastItem(data) {
  return (
    data.length !== 0 &&
    !Object.values(data[data.length - 1]).some((v) => v === null)
  );
}

export function removeByIndexHandler<T>(data: T[], index: number): T[] {
  return data.filter((_, i) => i !== index);
}

export function getDoseByValue(value) {
  return value.indexOf("_") !== -1 ? Number(value.split("_").pop()) : 0;
}

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const hitMap = {
  back_head: {
    leftPoint: new Point(410, 8),
    rightPoint: new Point(465, 100),
    position: EPosition.BACK_HEAD,
  },
  head: {
    leftPoint: new Point(115, 8),
    rightPoint: new Point(170, 100),
    position: EPosition.FOREHEAD,
  },
  back: {
    leftPoint: new Point(400, 125),
    rightPoint: new Point(470, 225),
    position: EPosition.BACK,
  },
  leftArm: {
    leftPoint: new Point(190, 125),
    rightPoint: new Point(230, 335),
    position: EPosition.LEFT_ARM,
  },
  backLeftArm: {
    leftPoint: new Point(350, 125),
    rightPoint: new Point(395, 335),
    position: EPosition.LEFT_ARM_BACK,
  },
  backRightArm: {
    leftPoint: new Point(480, 125),
    rightPoint: new Point(524, 335),
    position: EPosition.RIGHT_ARM_BACK,
  },
  rightArm: {
    leftPoint: new Point(60, 125),
    rightPoint: new Point(98, 335),
    position: EPosition.RIGHT_ARM,
  },
  ass: {
    leftPoint: new Point(400, 270),
    rightPoint: new Point(480, 330),
    position: EPosition.ASS,
  },
  chest: {
    leftPoint: new Point(108, 145),
    rightPoint: new Point(180, 187),
    position: EPosition.CHEST,
  },
  stomach: {
    leftPoint: new Point(110, 207),
    rightPoint: new Point(180, 268),
    position: EPosition.STOMACH,
  },
  genital: {
    leftPoint: new Point(129, 292),
    rightPoint: new Point(159, 316),
    position: EPosition.GENITAL,
  },
  leftLeg: {
    leftPoint: new Point(147, 351),
    rightPoint: new Point(194, 564),
    position: EPosition.LEFT_LEG,
  },
  backRightLeg: {
    leftPoint: new Point(442, 351),
    rightPoint: new Point(491, 564),
    position: EPosition.RIGHT_LEG_BACK,
  },
  rightLeg: {
    leftPoint: new Point(92, 351),
    rightPoint: new Point(137, 564),
    position: EPosition.RIGHT_LEG,
  },
  backLeftLeg: {
    leftPoint: new Point(388, 351),
    rightPoint: new Point(416, 564),
    position: EPosition.LEFT_LEG_BACK,
  },
};

export function checkHit(xPos, yPos) {
  for (const bodyPart in hitMap) {
    const left: Point = hitMap[bodyPart].leftPoint;
    const right: Point = hitMap[bodyPart].rightPoint;

    if (xPos < right.x && left.x < xPos && yPos < right.y && left.y < yPos) {
      return hitMap[bodyPart].position;
    }
  }
}
