import { IPatientRecord } from "../../interfaces";
import { decode, encode, generatePath } from "./decode-encode";

describe("Decode test", () => {
  it("should return empty object", () => {
    const patient: Partial<IPatientRecord> = {
      personal_information: {
        full_name: null,
        idf_id: null,
      },
    };
    expect(encode(patient as IPatientRecord)).toStrictEqual([]);
  });
  it("should return empty object", () => {
    const patient: Partial<IPatientRecord> = {
      personal_information: {
        full_name: null,
        idf_id: 1234567,
      },
    };
    expect(encode(patient as IPatientRecord)).toStrictEqual([
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
    expect(encode(patient as IPatientRecord)).toStrictEqual([
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
    expect(encode(patient as IPatientRecord)).toStrictEqual([
      [[16, 1], "test name"],
      [[17, 1], 1234567],
    ]);
  });
  it("should return empty object", () => {
    const patient: Partial<IPatientRecord> = {
      airway: {
        actions: [{ action: "AW", successful: true, time: 1698705345870 }],
        fulfill: true,
      },
    };

    expect(encode(patient as IPatientRecord)).toStrictEqual([
      [[[43, 0], 46, 7], "AW"],
      [[[45, 0], 46, 7], true],
      [[[44, 0], 46, 7], 1698705345870],
      [[42, 7], true],
    ]);
  });

  it("should encode data with multiple items in the list", () => {
    const patient: Partial<IPatientRecord> = {
      airway: {
        actions: [
          { action: "AW", successful: true, time: 1698705345870 },
          { action: "INTUBE", successful: true, time: 1698705345880 },
        ],
        fulfill: true,
      },
    };

    expect(encode(patient as IPatientRecord)).toStrictEqual([
      [[[43, 0], 46, 7], "AW"],
      [[[45, 0], 46, 7], true],
      [[[44, 0], 46, 7], 1698705345870],
      [[[43, 1], 46, 7], "INTUBE"],
      [[[45, 1], 46, 7], true],
      [[[44, 1], 46, 7], 1698705345880],
      [[42, 7], true],
    ]);
  });

  it("should return path", () => {
    expect(generatePath([42, 7])).toEqual("airway/fulfill");
    expect(generatePath([[44, 1], 46, 7])).toEqual("airway/actions/1/time");
    expect(generatePath([[44, 0], 46, 7])).toEqual("airway/actions/0/time");
  });

  it("should decode data", () => {
    const encodedData = [
      [[[43, 0], 46, 7], "AW"],
      [[[45, 0], 46, 7], true],
      [[[44, 0], 46, 7], 1698705345870],
      [[[43, 1], 46, 7], "INTUBE"],
      [[[45, 1], 46, 7], true],
      [[[44, 1], 46, 7], 1698705345880],
      [[42, 7], true],
    ];

    expect(decode(encodedData)).toEqual({
      airway: {
        actions: [
          { action: "AW", successful: true, time: 1698705345870 },
          { action: "INTUBE", successful: true, time: 1698705345880 },
        ],
        fulfill: true,
      },
    });
  });
});
