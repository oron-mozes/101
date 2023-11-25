import { EPosition, IInjury } from "../../../../../../interfaces";

export function hasBeenClicked(
  injury: IInjury,
  point: { xPos: number; yPos: number }
): boolean {
  const xInRange =
    point.xPos - 18 < injury.xPos && injury.xPos < point.xPos + 18;
  const yInRange =
    point.yPos - 18 < injury.yPos && injury.yPos < point.yPos + 18;
  return xInRange && yInRange;
}

const legsRange = [304, 640];
const armsRange = [114, 350];
const headRange = [7, 70];
const lowerBodyRange = [242, 300];
const bodyParts = [
  {
    xRang: [145, 188],
    yRang: legsRange,
    location: EPosition.LEFT_LEG,
  },
  {
    xRang: [99, 134],
    yRang: legsRange,
    location: EPosition.RIGHT_LEG,
  },
  {
    xRang: [365, 402],
    yRang: legsRange,
    location: EPosition.LEFT_LEG_BACK,
  },
  {
    xRang: [422, 466],
    yRang: legsRange,
    location: EPosition.RIGHT_LEG_BACK,
  },
  {
    xRang: [368, 460],
    yRang: [108, 240],
    location: EPosition.BACK,
  },
  {
    xRang: [196, 212],
    yRang: armsRange,
    location: EPosition.LEFT_ARM,
  },
  {
    xRang: [60, 84],
    yRang: armsRange,
    location: EPosition.RIGHT_ARM,
  },
  {
    xRang: [334, 352],
    yRang: armsRange,
    location: EPosition.LEFT_ARM_BACK,
  },
  {
    xRang: [459, 489],
    yRang: armsRange,
    location: EPosition.RIGHT_ARM_BACK,
  },
  {
    xRang: [359, 498],
    yRang: lowerBodyRange,
    location: EPosition.ASS,
  },
  {
    xRang: [123, 158],
    yRang: headRange,
    location: EPosition.FOREHEAD,
  },
  {
    xRang: [396, 433],
    yRang: headRange,
    location: EPosition.BACK_HEAD,
  },
  {
    xRang: [91, 183],
    yRang: lowerBodyRange,
    location: EPosition.GENITAL,
  },
  {
    xRang: [96, 177],
    yRang: [191, 245],
    location: EPosition.STOMACH,
  },
  {
    xRang: [99, 186],
    yRang: [106, 195],
    location: EPosition.CHEST,
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
