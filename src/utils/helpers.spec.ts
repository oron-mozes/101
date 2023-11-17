import {
  ECconsciousness,
  ICareProvider,
  IIncidentInformation,
  IPersonalInformation,
  RANK,
  ROLE,
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
        rank: RANK.RANK_1,
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
  it.only("should test the parsing of consciousness", () => {
    const data: ECconsciousness[] = [ECconsciousness.APVN_NONE];
    expect(getLocaleKey(data)).toEqual(["לא מגיב.ה"]);
  });
});
