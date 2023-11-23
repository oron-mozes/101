import { EAirWayTreatment, TOGGLE } from "../../../../../../interfaces";
import { allowToAddAction, isSuccessful } from "./utils";

describe("A section utils", () => {
  let action = {
    id: 1,
    action: null,
    time: null,
    successful: null,
  };

  beforeEach(() => {
    action = {
      id: 1,
      action: null,
      time: null,
      successful: null,
    };
  });
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

  it("should return allowToAddAction no past actions and we have one active add item", () => {
    const result = allowToAddAction([], action);
    expect(result).toBe(false);
  });
  it("should return allowToAddAction with past actions and we have one active add item", () => {
    const result = allowToAddAction(
      [{ id: 1, action: EAirWayTreatment.AW, successful: false, time: 1 }],
      {
        id: 1,
        action: null,
        time: null,
        successful: null,
      }
    );
    expect(result).toBe(false);
  });
  it("should return allowToAddAction true when there is no active add item", () => {
    action.action = EAirWayTreatment.AW;
    const result = allowToAddAction([action], null);
    expect(result).toBe(true);
  });
});
