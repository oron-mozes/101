import env from "../taagad/env.json";
import { Buffer } from "buffer";

export function reportAPatient(station) {
  return async (patient) => {
    const firstStop = patient.personal_information.patientId.split("|").pop();
    const lastStation =
      patient.care_providers[patient.care_providers.length - 1].unit_name;

    const form = new FormData();
    form.append("record_id", patient.personal_information.patientId);
    form.append("patient_id", patient.personal_information.idf_id);
    form.append("id_type", "ISRAEL_ID");
    form.append("hospital_code", station.unit_id);
    form.append("hospital_name", station.unit_name);
    form.append("first_name", patient.personal_information.full_name);
    form.append("origin_station_name", firstStop);
    form.append("last_station_name", lastStation);
    form.append("html_string", patient.pdf);
    try {
      const res = await fetch(env.TEST_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.TOKEN}`,
        },
        body: form,
      });

      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        throw new Error("not ok");
      }
    } catch (e) {
      debugger;
      throw new Error(e);
    }
  };
}
