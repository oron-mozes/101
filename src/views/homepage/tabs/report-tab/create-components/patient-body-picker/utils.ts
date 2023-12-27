import { EPosition, IInjury } from "../../../../../../interfaces";

export function hasBeenClicked(
  injury: IInjury,
  point: { xPos: number; yPos: number }
): boolean {
  const rad = 25;
  const xInRange =
    point.xPos - rad < injury.xPos && injury.xPos < point.xPos + rad;
  const yInRange =
    point.yPos - rad < injury.yPos && injury.yPos < point.yPos + rad;
  return xInRange && yInRange;
}

const legsRange = [304, 648];
const armsRange = [110, 350];
const headRange = [2, 70];
const lowerBodyRange = [258, 304];
const bodyParts = [
  {
    xRang: [91, 139],
    yRang: legsRange,
    location: EPosition.LEFT_LEG,
  },
  {
    xRang: [33, 81],
    yRang: legsRange,
    location: EPosition.RIGHT_LEG,
  },
  {
    xRang: [365, 402],
    yRang: legsRange,
    location: EPosition.RIGHT_LEG_BACK,
  },
  {
    xRang: [305, 353],
    yRang: legsRange,
    location: EPosition.LEFT_LEG_BACK,
  },
  {
    xRang: [310, 405],
    yRang: [105, 258],
    location: EPosition.BACK,
  },
  {
    xRang: [135, 159],
    yRang: armsRange,
    location: EPosition.LEFT_ARM,
  },
  {
    xRang: [11, 38],
    yRang: armsRange,
    location: EPosition.RIGHT_ARM,
  },
  {
    xRang: [282, 310],
    yRang: armsRange,
    location: EPosition.LEFT_ARM_BACK,
  },
  {
    xRang: [405, 434],
    yRang: armsRange,
    location: EPosition.RIGHT_ARM_BACK,
  },
  {
    xRang: [312, 398],
    yRang: lowerBodyRange,
    location: EPosition.ASS,
  },
  {
    xRang: [67, 109],
    yRang: headRange,
    location: EPosition.FOREHEAD,
  },
  {
    xRang: [340, 381],
    yRang: headRange,
    location: EPosition.BACK_HEAD,
  },
  {
    xRang: [45, 127],
    yRang: lowerBodyRange,
    location: EPosition.GENITAL,
  },
  {
    xRang: [38, 135],
    yRang: [50, 190],
    location: EPosition.CHEST,
  },
  {
    xRang: [96, 177],
    yRang: [190, 238],
    location: EPosition.STOMACH,
  },
];

function inRange(range: number[], pos: number) {
  return range[0] < pos && pos < range[1];
}

export function getLocationByPoint({
  xPos,
  yPos,
}: {
  xPos: number;
  yPos: number;
}): EPosition {
  return bodyParts.find(
    (part) => inRange(part.xRang, xPos) && inRange(part.yRang, yPos)
  )?.location;
}
