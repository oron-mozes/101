import { EPosition, IInjuryInformation } from "../../interfaces";

export const bodyMapping: Map<
  EPosition,
  { active: boolean; data: IInjuryInformation }
> = new Map();
bodyMapping.set(EPosition.ASS, { active: false, data: {} });
bodyMapping.set(EPosition.BACK, { active: false, data: {} });
bodyMapping.set(EPosition.BACK_HEAD, { active: false, data: {} });
bodyMapping.set(EPosition.CHEST, { active: false, data: {} });
bodyMapping.set(EPosition.FOREHEAD, { active: false, data: {} });
bodyMapping.set(EPosition.FOREHEAD, { active: false, data: {} });
bodyMapping.set(EPosition.GENITAL, { active: false, data: {} });
bodyMapping.set(EPosition.LEFT_ARM, { active: false, data: {} });
bodyMapping.set(EPosition.LEFT_ARM_BACK, { active: false, data: {} });
bodyMapping.set(EPosition.LEFT_LEG, { active: false, data: {} });
bodyMapping.set(EPosition.LEFT_LEG_BACK, { active: false, data: {} });
bodyMapping.set(EPosition.RIGHT_LEG_BACK, { active: false, data: {} });
bodyMapping.set(EPosition.RIGHT_LEG, { active: false, data: {} });
bodyMapping.set(EPosition.STOMACH, { active: false, data: {} });

export function convertToTime(time) {
  const date = new Date(time);
  return `${date.getUTCHours()}:${date.getUTCMinutes()}`;
}
