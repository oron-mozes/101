import { getFormDefaultFields } from "./utils";

describe("yakkar utils", () => {
  it("should return default value if value is undefined", () => {
    expect(
      getFormDefaultFields({
        patient: { personal_information: { patientId: "123|456|789" } },
        station: { unit_id: "123", unit_name: "123" },
      })
    ).toEqual({
      first_name: "לא ידוע",
      hospital_code: "123",
      hospital_name: "123",
      id_type: "ISRAEL_ID",
      last_station_name: "789",
      origin_station_name: "789",
      patient_id: "לא ידוע",
      pdf_file_b64: "",
      record_id: "123|456|789",
    });
  });
});
