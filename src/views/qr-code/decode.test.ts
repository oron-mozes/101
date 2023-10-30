import { IPatientRecord } from "../../interfaces";
import { decode } from "./decode";

describe("Decode test", () => {
  it("should return empty object", () => {
    const patient: Partial<IPatientRecord> = {
      personal_information: {
        full_name: null,
        idf_id: null,
      },
    };
    expect(decode(patient as IPatientRecord)).toStrictEqual([]);
  });
  it("should return empty object", () => {
    const patient: Partial<IPatientRecord> = {
      personal_information: {
        full_name: null,
        idf_id: 1234567,
      },
    };
    expect(decode(patient as IPatientRecord)).toStrictEqual([
      [[17, 1], 1234567],
    ]);
  });

  it("should return empty object", () => {
    const patient: Partial<IPatientRecord> = {
      personal_information: {
        full_name: "test name",
        idf_id: null,
      },
    };
    expect(decode(patient as IPatientRecord)).toStrictEqual([
      [[16, 1], "test name"],
    ]);
  });
  it("should return empty object", () => {
    const patient: Partial<IPatientRecord> = {
      personal_information: {
        full_name: "test name",
        idf_id: 1234567,
      },
    };
    expect(decode(patient as IPatientRecord)).toStrictEqual([
      [[16, 1], "test name"],
      [[17, 1], 1234567],
    ]);
  });
  it.only("should return empty object", () => {
    const patient: Partial<IPatientRecord> = {
      airway: {
        actions: [{ action: "AW", successful: true, time: 1698705345870 }],
        fulfill: true,
      },
    };

    expect(decode(patient as IPatientRecord)).toStrictEqual([
      [[[43, 0], 46, 7], "AW"],
      [[[45, 0], 46, 7], true],
      [[[44, 0], 46, 7], 1698705345870],
      [[42, 7], true],
    ]);
  });
});
