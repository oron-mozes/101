import {
  EReactionEyes,
  EReactionSpeech,
  EReactionMovement,
} from "../../../../../../interfaces";
import { calcGCS } from "./utils";

describe("D section utils", () => {
  it("should test calcGCS", () => {
    expect(
      calcGCS({
        eyes: EReactionEyes.NONE,
        speech: EReactionSpeech.NONE,
        movement: EReactionMovement.NONE,
      })
    ).toBe(3);
    expect(
      calcGCS({
        eyes: EReactionEyes.NONE,
        speech: null,
        movement: EReactionMovement.NONE,
      })
    ).toBe(2);
    expect(
      calcGCS({
        eyes: null,
        speech: null,
        movement: null,
      })
    ).toBe(0);
  });
});
