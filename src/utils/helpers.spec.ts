import {
  EAirWayTreatment,
  EBreathingTreatment,
  ECconsciousness,
  EEnvironment,
  EEsectionChips,
  EInjuryReason,
  EMeasurementsTreatments,
  EPosition,
  EReactionEyes,
  EReactionGeneral,
  EReactionMovement,
  EReactionSpeech,
  ETransportation,
  E_ANASTASIA_ACTIQ_DOSE,
  E_ANASTASIA_TREATMENT,
  E_InjuryType,
  IAction,
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
  ITreatmentGuide,
  ITreatmentGuideMeasurementsInformation,
  MEDICATION_TREATMENT,
  ROLE,
  STATUS,
} from "../interfaces";
import ESection from "../views/homepage/tabs/report-tab/create-components/e-section";
import {
  getLocaleKey,
  renderInjuries,
  returnAirwayTable,
  returnBreathingTable,
  returnCareProviderTable,
  returnConsciousnessTable,
  returnESectionTable,
  returnGuidelinesTable,
  returnInfoTable,
  returnInjuryReasonsTable,
  returnMeasurementsInformationTable,
  returnMeasurementsTable,
  returnMedicationTable,
  returnPrognosisTable,
} from "./helpers";
import injurySnapshot from "./test-snapshot/injury-snapshot";
describe("Export helpers", () => {
  const date = 1700217150274;

  it("should test the parsing of personal information", () => {
    const data: IPersonalInformation = {
      full_name: "test",
      idf_id: "123456789",
      patientId: "temp-it",
      unit: "יחידה",
      environment: EEnvironment.CIVILIAN,
    };
    expect(getLocaleKey(data)).toEqual({
      "מזהה ייחודי למטופל": "temp-it",
      "מספר מזהה": "123456789",
      שם: "test",
      יחידה: "יחידה",
      מסגרת: "אזרחי",
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
          "שעת ביצוע": "10:32",
        },
        {
          פעולה: "קוניוטו",
          id: 1700217150274,
          הצלחה: true,
          "שעת ביצוע": "10:32",
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
          id: date,
          פעולה: "נקז חזה",
          הצלחה: true,
          "שעת ביצוע": "10:32",
        },
        {
          id: date,
          פעולה: "הנשמה",
          הצלחה: true,
          "שעת ביצוע": "10:32",
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
          id: date,
          פעולה: "וריד מרכזי",
          הצלחה: true,
          "שעת ביצוע": "10:32",
        },
        {
          id: date,
          פעולה: "IO",
          הצלחה: true,
          "שעת ביצוע": "10:32",
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
          טיפול: "הרדמה וכאב",
          מינון: "800 מ״ג",
          סוג: "אקטיק",
          "שעת ביצוע": "10:32",
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
      "שעת ביצוע": "10:32",
      "ליווי בכיר": false,
      פינוי: "מסוק",
    });
  });
  it("should test the parsing of evacuation", () => {
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
  it("should render injuries with data", () => {
    expect(renderInjuries([])).toEqual(injurySnapshot.noData);
  });
  it("should render injuries with data", () => {
    expect(
      renderInjuries([
        {
          xPos: 100,
          yPos: 100,
          data: E_InjuryType.BURN,
          time: date,
          id: date,
          isMain: true,
          location: EPosition.ASS,
        },
        {
          xPos: 130,
          yPos: 130,
          data: E_InjuryType.TOUNIQUET,
          time: date,
          id: date,
          isMain: true,
          location: EPosition.ASS,
        },
      ])
    ).toEqual(injurySnapshot.withData);
  });
  it("should render personal Info", () => {
    const info: IPersonalInformation = {
      full_name: "שם ראשי",
      idf_id: "123",
      patientId: "123",
      unit: "חיל רגלים",
      environment: EEnvironment.CIVILIAN,
    };
    expect(returnInfoTable("test", [info])).toEqual(
      `<div style=\"width:100%; text-align:center; background-color:#CCE4FF\"><strong>test</strong></div><table style=\"width:100%; border-collapse: collapse; margin-bottom: 40px\" border=\"1\"><tr><th style=\"border-color: #CCE4FF; text-align:right\">שם</th><th style=\"border-color: #CCE4FF; text-align:right\">מספר מזהה</th><th style=\"border-color: #CCE4FF; text-align:right\">מזהה ייחודי למטופל</th><th style=\"border-color: #CCE4FF; text-align:right\">יחידה</th><th style=\"border-color: #CCE4FF; text-align:right\">מסגרת</th></tr><tr><td style=\"border-color: #CCE4FF;\">שם ראשי</td><td style=\"border-color: #CCE4FF;\">123</td><td style=\"border-color: #CCE4FF;\">123</td><td style=\"border-color: #CCE4FF;\">חיל רגלים</td><td style=\"border-color: #CCE4FF;\">אזרחי</td></tr></table>`
    );
  });
  it("shoudl return returnInjuryReasonsTable", () => {
    expect(returnInjuryReasonsTable([], "this is test")).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>מנגנון פציעה</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">מנגנון פציעה</th></tr><td style="border-color: #CCE4FF;"></td></tr><tr><th style="border-color: #CCE4FF; text-align:right">נסיבות</th></tr><td style="border-color: #CCE4FF;">this is test</td></tr></table>'
    );
  });
  it("shoudl return returnInjuryReasonsTable with reasons", () => {
    expect(
      returnInjuryReasonsTable(
        [EInjuryReason.ACCIDENT, EInjuryReason.BLUNT],
        "this is test"
      )
    ).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>מנגנון פציעה</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">מנגנון פציעה</th></tr><td style="border-color: #CCE4FF;">תאונת דרכים, חבלה קהה</td></tr><tr><th style="border-color: #CCE4FF; text-align:right">נסיבות</th></tr><td style="border-color: #CCE4FF;">this is test</td></tr></table>'
    );
  });
  it("shoudl return returnConsciousnessTable ", () => {
    expect(returnConsciousnessTable([])).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>מצב הכרה AVPU</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">מנגנון פציעה</th></tr><td style="border-color: #CCE4FF;"></td></tr></table>'
    );
  });
  it("shoudl return returnConsciousnessTable with ECconsciousness ", () => {
    expect(returnConsciousnessTable([ECconsciousness.APVN_NONE])).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>מצב הכרה AVPU</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">מנגנון פציעה</th></tr><td style="border-color: #CCE4FF;">לא מגיב.ה</td></tr></table>'
    );
  });
  it("shoudl return returnAirwayTable", () => {
    const airway: IAirway = {
      actions: [],
      fulfill: false,
    };
    expect(returnAirwayTable(airway)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>A</strong></div><div style="display: flex; flex-direction:row"><table style="width:100%; border-collapse: collapse; margin-bottom: 40px; flex: 1" border="1"><tr><th  style="border-color: #CCE4FF; text-align:right">פגיעה בנתיב אויר?</th></tr><tr><th rowspan="0" style="border-color: #CCE4FF; text-align:right">לא</th></tr><table><table style="width:100%; border-collapse: collapse; margin-bottom: 40px; flex: 2" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">פעולה שבוצעה</th><th style="border-color: #CCE4FF; text-align:right">שעת פעולה</th><th style="border-color: #CCE4FF; text-align:right">הפעולה הצליחה?</th></tr></table></div>'
    );
  });
  it("shoudl return returnAirwayTable with Data", () => {
    const airway: IAirway = {
      actions: [
        {
          action: EAirWayTreatment.AW,
          time: date,
          successful: false,
          id: date,
        },
      ],
      fulfill: true,
    };
    expect(returnAirwayTable(airway)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>A</strong></div><div style="display: flex; flex-direction:row"><table style="width:100%; border-collapse: collapse; margin-bottom: 40px; flex: 1" border="1"><tr><th  style="border-color: #CCE4FF; text-align:right">פגיעה בנתיב אויר?</th></tr><tr><th rowspan="1" style="border-color: #CCE4FF; text-align:right">כן</th></tr><table><table style="width:100%; border-collapse: collapse; margin-bottom: 40px; flex: 2" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">פעולה שבוצעה</th><th style="border-color: #CCE4FF; text-align:right">שעת פעולה</th><th style="border-color: #CCE4FF; text-align:right">הפעולה הצליחה?</th></tr><tr><td>פתחי אוויר (AW)</td><td>10:32</td><td>לא</td></tr></table></div>'
    );
  });
  it("shoudl return returnBreathingTable", () => {
    const breathing: IBreathing = {
      actions: [],
      fulfill: false,
      breathingCount: 0,
      saturation: 0,
    };
    expect(returnBreathingTable(breathing)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>B</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">פגיעה בנשימה</th><th style="border-color: #CCE4FF; text-align:right">סטורציה</th><th style="border-color: #CCE4FF; text-align:right">נשימות</th></tr><tr><td>לא</td><td>0</td><td>0</td></tr><tr><th style="border-color: #CCE4FF; text-align:right">פעולה שבוצעה</th><th style="border-color: #CCE4FF; text-align:right">שעת פעולה</th><th style="border-color: #CCE4FF; text-align:right">הפעולה הצליחה?</th></tr></table>'
    );
  });
  it("shoudl return returnBreathingTable", () => {
    const breathing: IBreathing = {
      actions: [
        {
          action: EBreathingTreatment.CHEST_TUBE,
          time: date,
          successful: false,
          id: date,
        },
      ],
      fulfill: true,
      breathingCount: 120,
      saturation: 120,
    };
    expect(returnBreathingTable(breathing)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>B</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">פגיעה בנשימה</th><th style="border-color: #CCE4FF; text-align:right">סטורציה</th><th style="border-color: #CCE4FF; text-align:right">נשימות</th></tr><tr><td>כן</td><td>120</td><td>120</td></tr><tr><th style="border-color: #CCE4FF; text-align:right">פעולה שבוצעה</th><th style="border-color: #CCE4FF; text-align:right">שעת פעולה</th><th style="border-color: #CCE4FF; text-align:right">הפעולה הצליחה?</th></tr><tr><td>נקז חזה</td><td>10:32</td><td>לא</td></tr></table>'
    );
  });
  it("shoudl return returnMeasurementsTable with data", () => {
    const measurements: IMeasurements = {
      actions: [],
      shock: false,
      palpated: false,
      puls: 0,
      bloodPressure: "",
    };
    expect(returnMeasurementsTable(measurements)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>C</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">רדיאלי נימוש?</th><th style="border-color: #CCE4FF; text-align:right">הלם?</th><th style="border-color: #CCE4FF; text-align:right">דופק</th><th style="border-color: #CCE4FF; text-align:right">לחץ דם דיאסטולי / סיסטולי</th></tr><tr><td>לא</td><td>לא</td><td>0</td><td></td></tr><tr><th style="border-color: #CCE4FF; text-align:right">פעולה שבוצעה</th><th style="border-color: #CCE4FF; text-align:right">שעת פעולה</th><th style="border-color: #CCE4FF; text-align:right">הפעולה הצליחה?</th></tr></table>'
    );
  });
  it("shoudl return returnMeasurementsTable with data", () => {
    const measurements: IMeasurements = {
      actions: [
        {
          action: EMeasurementsTreatments.CENTRAL_VAIN,
          time: date,
          successful: false,
          id: date,
        },
      ],
      shock: true,
      palpated: true,
      puls: 120,
      bloodPressure: "125/56",
    };
    expect(returnMeasurementsTable(measurements)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>C</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="border-color: #CCE4FF; text-align:right">רדיאלי נימוש?</th><th style="border-color: #CCE4FF; text-align:right">הלם?</th><th style="border-color: #CCE4FF; text-align:right">דופק</th><th style="border-color: #CCE4FF; text-align:right">לחץ דם דיאסטולי / סיסטולי</th></tr><tr><td>כן</td><td>כן</td><td>120</td><td>125/56</td></tr><tr><th style="border-color: #CCE4FF; text-align:right">פעולה שבוצעה</th><th style="border-color: #CCE4FF; text-align:right">שעת פעולה</th><th style="border-color: #CCE4FF; text-align:right">הפעולה הצליחה?</th></tr><tr><td>וריד מרכזי</td><td>10:32</td><td>לא</td></tr></table>'
    );
  });

  it("should call returnESectionTable", () => {
    expect(returnESectionTable([])).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>E</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><td></td></tr></table>'
    );
  });
  it("should call returnESectionTable with data", () => {
    expect(returnESectionTable([EEsectionChips.ACTIVE_HIT])).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>E</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><td>חימום אקטיבי</td></tr></table>'
    );
  });
  it("should call returnMedicationTable", () => {
    const medications: IMedicationsAndFluid = {
      actions: [],
    };
    expect(returnMedicationTable(medications)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>נוזלים ותרופות</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th>נוזלים ותרופות</th><th>סוג</th><th>מינון</th><th>שעת ביצוע</th></tr></table>'
    );
  });
  it("should call returnMedicationTable with data", () => {
    const medications: IMedicationsAndFluid = {
      actions: [
        {
          treatment: MEDICATION_TREATMENT.ANASTASIA,
          type: E_ANASTASIA_TREATMENT.ACTIQ,
          dose: E_ANASTASIA_ACTIQ_DOSE.D800MG,
          time: date,
          id: date,
        },
        {
          treatment: MEDICATION_TREATMENT.OTHER,
          other: "other content here",
          time: date,
          id: date,
        },
      ],
    };
    expect(returnMedicationTable(medications)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>נוזלים ותרופות</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th>נוזלים ותרופות</th><th>סוג</th><th>מינון</th><th>שעת ביצוע</th></tr><tr><td>הרדמה וכאב</td><td>אקטיק</td><td>800 מ״ג</td><td>10:32</td></tr><tr><td colspan="3">other content here</td><td>10:32</td></tr></table>'
    );
  });

  it("should call returnPrognosisTable", () => {
    expect(returnPrognosisTable([])).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>אבחנות</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><td></td></tr></table>'
    );
  });
  it("should call returnPrognosisTable with data", () => {
    expect(returnPrognosisTable(["content 1", "content 2"])).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>אבחנות</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><td>content 1, content 2</td></tr></table>'
    );
  });
  it("shoudl call returnCareProviderTable", () => {
    expect(returnCareProviderTable([])).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>פרטי מטפל.ת</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="text-align: right">שם המטפל.ת</th></tr></table>'
    );
  });
  it("shoudl call returnCareProviderTable with data", () => {
    const providers: ICareProvider[] = [
      {
        full_name: "שם אישי",
        idf_id: 123456789,
        unit_name: "תחנה",
        role: ROLE.MD,
      },
    ];
    expect(returnCareProviderTable(providers)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>פרטי מטפל.ת</strong></div><table style="width:100%; border-collapse: collapse; margin-bottom: 40px" border="1"><tr><th style="text-align: right">שם המטפל.ת</th></tr><tr><td>שם אישי 123456789, רופא</td></tr></table>'
    );
  });

  it("should call returnGuidelinesTable", () => {
    expect(returnGuidelinesTable([])).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>מעקב טיפול ומדדים</strong></div><table border="1"><tr><td>הנחיה לטיפול</td><td>שעת הוראה</td><td>שעת ביצוע</td></tr></table>'
    );
  });

  it("should call returnGuidelinesTable with data", () => {
    const guidelines: ITreatmentGuide[] = [
      {
        id: date,
        care_guide: "guide to treatment",
        order_time: date,
        provider_issuer: {
          full_name: "שם אישי",
          idf_id: 123456789,
          unit_name: "תחנה",
          role: ROLE.MD,
        },
      },
    ];
    expect(returnGuidelinesTable(guidelines)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>מעקב טיפול ומדדים</strong></div><table border="1"><tr><td>הנחיה לטיפול</td><td>שעת הוראה</td><td>שעת ביצוע</td></tr><tr><td colspan="2">guide to treatment</td><td>10:32</td><td></td></tr></table>'
    );
  });

  it("should call returnMeasurementsInformationTable", () => {
    const measurements: ITreatmentGuideMeasurementsInformation = {
      period: 0,
      actions: [],
    };
    expect(returnMeasurementsInformationTable(measurements)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>לקיחת מדדים</strong></div><table border="1"><tr><td>שעת ביצוע</td><td>שם המבצע.ת</td><td>דופק</td><td>ל.דם דיאסטולי/ סיסטולי</td><td>נשימות לדקה</td><td>SpO2</td><td>קפנומטריה</td><td>כאב</td><td>טמפ׳ PR/PO</td><td>GCS</td><td>שתן (cc לשעה)</td><td>דם בנקז (cc לשעה)</td></tr></table>'
    );
  });
  it("should call returnMeasurementsInformationTable", () => {
    const measurements: ITreatmentGuideMeasurementsInformation = {
      period: 15,
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
          pain: 12,
          prpo: "38.5",
          GCS: 13,
          urine: 120,
          blood: 120,
        },
      ],
    };

    expect(returnMeasurementsInformationTable(measurements)).toEqual(
      '<div style="width:100%; text-align:center; background-color:#CCE4FF"><strong>לקיחת מדדים</strong></div><table border="1"><tr><td>שעת ביצוע</td><td>שם המבצע.ת</td><td>דופק</td><td>ל.דם דיאסטולי/ סיסטולי</td><td>נשימות לדקה</td><td>SpO2</td><td>קפנומטריה</td><td>כאב</td><td>טמפ׳ PR/PO</td><td>GCS</td><td>שתן (cc לשעה)</td><td>דם בנקז (cc לשעה)</td></tr><tr><td>10:32</td><td>שם אישי, 123456789, רופא</td><td>123</td><td>120/90</td><td>120</td><td>120</td><td>120</td><td>12</td><td>38.5</td><td>13</td><td>120</td><td>120</td></tr></table>'
    );
  });
});
