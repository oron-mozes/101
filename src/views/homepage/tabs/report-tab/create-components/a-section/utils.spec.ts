import { TOGGLE } from "../../../../../../interfaces";
import { isSuccessful } from "./utils";

describe("A section utils", () => {
  it("should return true if successful is true", () => {
    const result = isSuccessful(true);
    expect(result).toBe(TOGGLE.YES);
  });

  it("should return false if successful is false", () => {
    const result = isSuccessful(false);
    expect(result).toBe(TOGGLE.NO);
  });

  it("should return false if successful is undefined", () => {
    const result = isSuccessful();
    expect(result).toBe(null);
  });
});
