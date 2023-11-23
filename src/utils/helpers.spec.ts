import {
  EAirWayTreatment,
  EBreathingTreatment,
  ECconsciousness,
  EEsectionChips,
  EInjuryReason,
  EMeasurementsTreatments,
  EReactionEyes,
  EReactionGeneral,
  EReactionMovement,
  EReactionSpeech,
  ETransportation,
  E_ANASTASIA_ACTIQ_DOSE,
  E_ANASTASIA_TREATMENT,
  IAirway,
  IBreathing,
  ICareProvider,
  IEvacuationInformation,
  IIncidentInformation,
  IInjuryReason,
  IMeasurements,
  IMedicationsAndFluid,
  IPersonalInformation,
  IReaction,
  ITreatment,
  MEDICATION_TREATMENT,
  ROLE,
  STATUS,
} from "../interfaces";
import { getLocaleKey } from "./helpers";

describe("Export helpers", () => {
  const date = 1700217150274;

  it("should test the parsing of personal information", () => {
    const data: IPersonalInformation = {
      full_name: "test",
      idf_id: 123456789,
      patientId: "temp-it",
    };
    expect(getLocaleKey(data)).toEqual({
      "מזהה ייחודי למטופל": "temp-it",
      "מספר מזהה": 123456789,
      שם: "test",
    });
  });

  it("should test the parsing of incident information", () => {
    const data: IIncidentInformation = {
      injury_time: date,
      care_time: date,
      date,
    };
    expect(getLocaleKey(data)).toEqual({
      "שעת טיפול": "10:32",
      "שעת פציעה": "10:32",
      תאריך: "17/11/23",
    });
  });
  it("should test the parsing of incident information", () => {
    const providers: Partial<ICareProvider>[] = [
      {
        full_name: "שם אישי",
        idf_id: 123456789,
        unit_name: "תחנה",
        role: ROLE.MD,
      },
    ];
    expect(providers.map((data) => getLocaleKey(data))).toEqual([
      {
        דרגה: "טוראי",
        "מספר מזהה": 123456789,
        שם: "שם אישי",
        "שם תחנה": "תחנה",
        תפקיד: "רופא",
      },
    ]);
  });
  it("should test the parsing of consciousness", () => {
    const data: ECconsciousness[] = [ECconsciousness.APVN_NONE];
    expect(getLocaleKey(data)).toEqual(["לא מגיב.ה"]);
  });

  it("should test the parsing of eSection", () => {
    const data: EEsectionChips[] = [
      EEsectionChips.ACTIVE_HIT,
      EEsectionChips.FLIPPING,
    ];
    expect(getLocaleKey(data)).toEqual(["חימום אקטיבי", "הפיכה"]);
  });
  it("should test the parsing of airway", () => {
    const airway: IAirway = {
      actions: [
        {
          action: EAirWayTreatment.AW,
          time: date,
          successful: true,
          id: date,
        },
        {
          action: EAirWayTreatment.CONIOTOMY,
          time: date,
          successful: true,
          id: date,
        },
      ],
      fulfill: false,
    };
    expect(getLocaleKey(airway)).toEqual({
      "פעולה בוצעה": false,
      פעולות: [
        {
          פעולה: "פתחי אוויר (AW)",
          id: 1700217150274,
          הצלחה: true,
          "שעת ביצוע": 1700217150274,
        },
        {
          פעולה: "קוניוטו",
          id: 1700217150274,
          הצלחה: true,
          "שעת ביצוע": 1700217150274,
        },
      ],
    });
  });
  it("should test the parsing of breathing", () => {
    const breathing: IBreathing = {
      breathingCount: 120,
      saturation: 120,
      actions: [
        {
          action: EBreathingTreatment.CHEST_TUBE,
          time: date,
          successful: true,
          id: date,
        },
        {
          action: EBreathingTreatment.MOUTH,
          time: date,
          successful: true,
          id: date,
        },
      ],
      fulfill: false,
    };
    expect(getLocaleKey(breathing)).toEqual({
      סטורציה: 120,
      נשימות: 120,
      "פעולה בוצעה": false,
      פעולות: [
        {
          פעולה: "נקז חזה",
          הצלחה: true,
          "שעת ביצוע": 1700217150274,
        },
        {
          פעולה: "הנשמה",
          הצלחה: true,
          "שעת ביצוע": 1700217150274,
        },
      ],
    });
  });
  it("should test the parsing of measurements", () => {
    const measurements: IMeasurements = {
      shock: false,
      palpated: false,
      puls: 120,
      bloodPressure: "120/90",
      actions: [
        {
          action: EMeasurementsTreatments.CENTRAL_VAIN,
          time: date,
          successful: true,
          id: date,
        },
        {
          action: EMeasurementsTreatments.IO,
          time: date,
          successful: true,
          id: date,
        },
      ],
    };
    expect(getLocaleKey(measurements)).toEqual({
      דופק: 120,
      "הלם?": false,
      "לחץ דם דיאסטולי / סיסטולי": "120/90",
      "רדיאלי נימוש?": false,
      פעולות: [
        {
          פעולה: "וריד מרכזי",
          הצלחה: true,
          "שעת ביצוע": 1700217150274,
        },
        {
          פעולה: "IO",
          הצלחה: true,
          "שעת ביצוע": 1700217150274,
        },
      ],
    });
  });
  it("should test the parsing of reaction", () => {
    const reaction: IReaction = {
      general: [EReactionGeneral.NON_MOTORIZED],
      eyes: EReactionEyes.SPONTANEITY,
      speech: EReactionSpeech.CONFUSED,
      movement: EReactionMovement.BENDING,
      GCS: 13,
    };
    expect(getLocaleKey(reaction)).toEqual({
      GCS: 13,
      דיבור: "מבולבל",
      "מצב הכרה": ["חסר מוטורי"],
      עיניים: "ספונטני",
      תנועה: "כיפוף",
    });
  });
  it("should test the parsing of medicationsAndFluids", () => {
    const medicationsAndFluids: IMedicationsAndFluid = {
      actions: [
        {
          treatment: MEDICATION_TREATMENT.ANASTASIA,
          type: E_ANASTASIA_TREATMENT.ACTIQ,
          dose: E_ANASTASIA_ACTIQ_DOSE.D800MG,
          time: date,
          id: 123,
        },
      ],
    };
    expect(getLocaleKey(medicationsAndFluids)).toEqual({
      פעולות: [
        {
          id: 123,
          undefined: "הרדמה וכאב",
          מינון: "800 מ״ג",
          סוג: "אקטיק",
          פעולה: "אקטיק",
          "שעת ביצוע": 1700217150274,
        },
      ],
    });
  });
  it("should test the parsing of injuryReason", () => {
    const injuryReason: IInjuryReason = {
      reasons: [EInjuryReason.ACCIDENT, EInjuryReason.BLUNT],
      circumstance: "reasons comes here",
    };
    expect(getLocaleKey(injuryReason)).toEqual({
      "מנגנון פציעה": ["תאונת דרכים", "חבלה קהה"],
      נסיבות: "reasons comes here",
    });
  });
  it("should test the parsing of evacuation", () => {
    const evacuation: IEvacuationInformation = {
      time: date,
      destination: "destination comes here",
      transportation: ETransportation.CHOPPER,
      special_care: false,
      status: STATUS.TO_EVAC,
    };
    expect(getLocaleKey(evacuation)).toEqual({
      "סטטוס פינוי": "פינוי לא דחוף",
      "יעד פינוי": "destination comes here",
      "שעת ביצוע": 1700217150274,
      "ליווי בכיר": false,
      פינוי: "מסוק",
    });
  });
  it.only("should test the parsing of evacuation", () => {
    const treatmentGuide: ITreatment = {
      guides: [
        {
          id: 12345,
          care_guide: "guide to treatment",
          order_time: date,
          execution_time: date,
          provider_issuer: {
            full_name: "שם אישי",
            idf_id: 123456789,

            unit_name: "תחנה",
            role: ROLE.MD,
          },
          provider_executer: {
            full_name: "שם אישי",
            idf_id: 123456789,
            unit_name: "תחנה",
            role: ROLE.MD,
          },
        },
      ],
      measurements: {
        period: 12,
        actions: [
          {
            id: date,
            time: date,
            provider: {
              full_name: "שם אישי",
              idf_id: 123456789,

              unit_name: "תחנה",
              role: ROLE.MD,
            },
            puls: 123,
            bloodPressure: "120/90",
            breath: 120,
            spo2: 120,
            etcos: 120,
            pain: 120,
            prpo: 120,
            GCS: 13,
            urine: 120,
            blood: 120,
          },
        ],
      },
    };
    expect(getLocaleKey(treatmentGuide)).toEqual({
      "הנחיות לטיפול": [
        {
          id: 12345,
          "שעת ביצוע": "10:32",
          "שעת הוראה": "10:32",
          "הנחיה לטיפול": "guide to treatment",
          "נותנ.ת הוראה": {
            "מספר מזהה": 123456789,
            שם: "שם אישי",
            "שם תחנה": "תחנה",
            תפקיד: "רופא",
          },
          מבצע: {
            "מספר מזהה": 123456789,
            שם: "שם אישי",
            "שם תחנה": "תחנה",
            תפקיד: "רופא",
          },
        },
      ],
      "לקיחת מדדים": {
        תדירות: 12,
        פעולות: [
          {
            GCS: 13,
            SpO2: 120,
            "לחץ דם דיאסטולי / סיסטולי": "120/90",
            "דם בנקז (cc לשעה)": 120,
            קפנומטריה: 120,
            id: 1700217150274,
            "טמפ׳ PR/PO": 120,
            "שם המבצע.ת": {
              "מספר מזהה": 123456789,
              שם: "שם אישי",
              "שם תחנה": "תחנה",
              תפקיד: "רופא",
            },
            "נשימות לדקה": 120,
            דופק: 123,
            כאב: 120,
            "שעת ביצוע": "10:32",
            "שתן (cc לשעה)": 120,
          },
        ],
      },
    });
  });
});
