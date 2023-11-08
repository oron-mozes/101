import { IInjury } from "../../../../../../interfaces";

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
