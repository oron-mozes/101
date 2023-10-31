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
  it("should encode data: case 1", () => {
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
  it("should encode list of strings", () => {
    const patient = {
      consciousness: ["AWAKE", "VOICE", "PAIN", "APVN_NONE"],
    };
    expect(encode(patient)).toEqual([
      [[[0], 5], "AWAKE"],
      [[[1], 5], "VOICE"],
      [[[2], 5], "PAIN"],
      [[[3], 5], "APVN_NONE"],
    ]);
  });

  it("should decode list of string", () => {
    const patient = {
      consciousness: ["AWAKE", "VOICE", "PAIN", "APVN_NONE"],
    };
    expect(
      decode([
        [[[0], 5], "AWAKE"],
        [[[1], 5], "VOICE"],
        [[[2], 5], "PAIN"],
        [[[3], 5], "APVN_NONE"],
      ])
    ).toEqual(patient);
  });
  it("should encode boolean", () => {
    const patient = {
      airway: {
        actions: [
          { action: "AW", successful: true, time: 1698705345870 },
          { action: "INTUBE", successful: true, time: 1698705345880 },
        ],
        fulfill: false,
      },
    };
    expect(encode(patient)).toEqual([
      [[[43, 0], 46, 7], "AW"],
      [[[45, 0], 46, 7], true],
      [[[44, 0], 46, 7], 1698705345870],
      [[[43, 1], 46, 7], "INTUBE"],
      [[[45, 1], 46, 7], true],
      [[[44, 1], 46, 7], 1698705345880],
      [[42, 7], false],
    ]);
  });
  it("should decode boolean", () => {
    const patient = {
      airway: {
        actions: [
          { action: "AW", successful: true, time: 1698705345870 },
          { action: "INTUBE", successful: true, time: 1698705345880 },
        ],
        fulfill: false,
      },
    };
    expect(
      decode([
        [[[43, 0], 46, 7], "AW"],
        [[[45, 0], 46, 7], true],
        [[[44, 0], 46, 7], 1698705345870],
        [[[43, 1], 46, 7], "INTUBE"],
        [[[45, 1], 46, 7], true],
        [[[44, 1], 46, 7], 1698705345880],
        [[42, 7], false],
      ])
    ).toEqual(patient);
  });
  it("should encode data: case 2", () => {
    const patient = {
      personal_information: { full_name: "בדיקה עם הרבה מלל", idf_id: 1266548 },
      incident_information: { injury_time: null, care_time: null, date: null },
      provider: {
        full_name: "אורון",
        idf_id: 3214569,
        rank: "סגן",
        unit_name: "יחידה",
        role: "PARAMEDIC",
      },
      injuries: {
        BACK_HEAD: { hits: 1 },
        LEFT_ARM: { gunshots: 1, HT: true, HT_time: 1698705336995 },
      },
      eSection: ["UNDRESSING"],
      airway: {
        actions: [{ action: "AW", time: 1698705345870, successful: true }],
        fulfill: true,
      },
      breathing: {
        actions: [],
        breathingCount: null,
        saturation: null,
        fulfill: false,
      },
      consciousness: ["AWAKE", "VOICE", "PAIN", "APVN_NONE"],
      injuryReason: {
        reasons: ["SHOOTING", "SMOKE"],
        circumstance: "חבל מאוד",
      },
      prognosis: "חחחחחחחחחחחחחח",
      measurements: {
        fulfill: null,
        shock: false,
        actions: [],
        palpated: true,
        puls: 120,
        bloodPressure: { diastolic: 55, systolic: 55 },
      },
      reaction: {
        general: ["OK"],
        eyes: "TO_PAIN",
        speech: "WORDS",
        movement: "IN_PLACE",
        GCS: null,
      },
      medicationsAndFluids: {
        actions: [{ action: "KETAMINE_250", dose: 250, time: 1698705305652 }],
      },
      evacuation: {
        status: "URGENT",
        time: 1698749683720,
        transportation: null,
        destination: "בית חולים",
      },
      treatmentGuide: {
        guides: [],
        measurements: { period: null, actions: [] },
      },
    };
    expect(encode(patient)).toEqual([
      [[16, 1], "בדיקה עם הרבה מלל"],
      [[17, 1], 1266548],
      [[16, 3], "אורון"],
      [[17, 3], 3214569],
      [[22, 3], "סגן"],
      [[81, 3], "יחידה"],
      [[23, 3], "PARAMEDIC"],
      [[39, 37, 4], 1],
      [[38, 80, 4], 1],
      [[40, 80, 4], true],
      [[41, 80, 4], 1698705336995],
      [[[0], 6], "UNDRESSING"],
      [[[43, 0], 46, 7], "AW"],
      [[[44, 0], 46, 7], 1698705345870],
      [[[45, 0], 46, 7], true],
      [[42, 7], true],
      [[42, 8], false],
      [[[0], 5], "AWAKE"],
      [[[1], 5], "VOICE"],
      [[[2], 5], "PAIN"],
      [[[3], 5], "APVN_NONE"],
      [[[0], 62, 12], "SHOOTING"],
      [[[1], 62, 12], "SMOKE"],
      [[61, 12], "חבל מאוד"],
      [[13], "חחחחחחחחחחחחחח"],
      [[49, 9], false],
      [[51, 9], true],
      [[50, 9], 120],
      [[53, 52, 9], 55],
      [[54, 52, 9], 55],
      [[[0], 55, 10], "OK"],
      [[56, 10], "TO_PAIN"],
      [[57, 10], "WORDS"],
      [[58, 10], "IN_PLACE"],
      [[[43, 0], 46, 11], "KETAMINE_250"],
      [[[60, 0], 46, 11], 250],
      [[[44, 0], 46, 11], 1698705305652],
      [[65, 14], "URGENT"],
      [[44, 14], 1698749683720],
      [[63, 14], "בית חולים"],
    ]);
  });
  it("should decode data: case 2", () => {
    const patient = {
      personal_information: { full_name: "בדיקה עם הרבה מלל", idf_id: 1266548 },
      provider: {
        full_name: "אורון",
        idf_id: 3214569,
        rank: "סגן",
        unit_name: "יחידה",
        role: "PARAMEDIC",
      },
      injuries: {
        BACK_HEAD: { hits: 1 },
        LEFT_ARM: { gunshots: 1, HT: true, HT_time: 1698705336995 },
      },
      eSection: ["UNDRESSING"],
      airway: {
        actions: [{ action: "AW", time: 1698705345870, successful: true }],
        fulfill: true,
      },
      consciousness: ["AWAKE", "VOICE", "PAIN", "APVN_NONE"],
      breathing: {
        fulfill: false,
      },
      injuryReason: {
        reasons: ["SHOOTING", "SMOKE"],
        circumstance: "חבל מאוד",
      },
      prognosis: "חחחחחחחחחחחחחח",
      measurements: {
        shock: false,
        palpated: true,
        puls: 120,
        bloodPressure: { diastolic: 55, systolic: 55 },
      },
      reaction: {
        general: ["OK"],
        eyes: "TO_PAIN",
        speech: "WORDS",
        movement: "IN_PLACE",
      },
      medicationsAndFluids: {
        actions: [{ action: "KETAMINE_250", dose: 250, time: 1698705305652 }],
      },
      evacuation: {
        status: "URGENT",
        time: 1698749683720,
        destination: "בית חולים",
      },
    };
    expect(
      decode([
        [[16, 1], "בדיקה עם הרבה מלל"],
        [[17, 1], 1266548],
        [[16, 3], "אורון"],
        [[17, 3], 3214569],
        [[22, 3], "סגן"],
        [[81, 3], "יחידה"],
        [[23, 3], "PARAMEDIC"],
        [[39, 37, 4], 1],
        [[38, 80, 4], 1],
        [[40, 80, 4], true],
        [[41, 80, 4], 1698705336995],
        [[[0], 6], "UNDRESSING"],
        [[[43, 0], 46, 7], "AW"],
        [[[44, 0], 46, 7], 1698705345870],
        [[[45, 0], 46, 7], true],
        [[42, 7], true],
        [[42, 8], false],
        [[[0], 5], "AWAKE"],
        [[[1], 5], "VOICE"],
        [[[2], 5], "PAIN"],
        [[[3], 5], "APVN_NONE"],
        [[[0], 62, 12], "SHOOTING"],
        [[[1], 62, 12], "SMOKE"],
        [[61, 12], "חבל מאוד"],
        [[13], "חחחחחחחחחחחחחח"],
        [[49, 9], false],
        [[51, 9], true],
        [[50, 9], 120],
        [[53, 52, 9], 55],
        [[54, 52, 9], 55],
        [[[0], 55, 10], "OK"],
        [[56, 10], "TO_PAIN"],
        [[57, 10], "WORDS"],
        [[58, 10], "IN_PLACE"],
        [[[43, 0], 46, 11], "KETAMINE_250"],
        [[[60, 0], 46, 11], 250],
        [[[44, 0], 46, 11], 1698705305652],
        [[65, 14], "URGENT"],
        [[44, 14], 1698749683720],
        [[63, 14], "בית חולים"],
      ])
    ).toEqual(patient);
  });
});
