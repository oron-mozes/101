import {
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
