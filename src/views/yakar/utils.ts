import { IPatientRecord } from "../../interfaces";
import env from "../taagad/env.json";

function getLastStation(patient: IPatientRecord & { base64: string }) {
  return patient.providers?.length !== 0
    ? patient.providers?.[patient.providers?.length - 1]?.unit_name
    : patient.personal_information.patientId.split("|").pop();
}

export function reportAPatient(station) {
  return async (patient) => {
    const firstStop = patient.personal_information.patientId.split("|").pop();
    const lastStation = getLastStation(patient);

    const form = new FormData();
    form.append("record_id", patient.personal_information.patientId);
    form.append("patient_id", patient.personal_information.idf_id);
    form.append("id_type", "ISRAEL_ID");
    form.append("hospital_code", station.unit_id);
    form.append("hospital_name", station.unit_name);
    form.append("first_name", patient.personal_information.full_name);
    form.append("origin_station_name", firstStop);
    form.append("last_station_name", lastStation);
    form.append("pdf_file_b64", patient.base64);

    try {
      const res = await fetch(station.API ?? env.TEST_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${station.TOKEN ?? env.TOKEN}`,
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
      throw new Error(e);
    }
  };
}
