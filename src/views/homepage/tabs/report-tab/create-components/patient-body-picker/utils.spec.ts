import { EPosition } from "../../../../../../interfaces";
import { getLocationByPoint } from "./utils";

describe("Body picker utils", () => {
  it("should return the correct body parts", () => {
    expect(getLocationByPoint({ xPos: 100, yPos: 120 })).toBe(EPosition.CHEST);
    expect(getLocationByPoint({ xPos: 360, yPos: 250 })).toBe(EPosition.BACK);
    expect(getLocationByPoint({ xPos: 100, yPos: 500 })).toBe(
      EPosition.LEFT_LEG
    );
  });
});
