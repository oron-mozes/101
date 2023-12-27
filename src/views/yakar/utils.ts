import { IPatientRecord } from "../../interfaces";
import env from "../taagad/env.json";

function getLastStation(patient: IPatientRecord & { base64: string }) {
  return patient.providers?.length !== 0
    ? patient.providers?.[patient.providers?.length - 1]?.unit_name
    : patient.personal_information.patientId.split("|").pop();
}

export function getFormDefaultFields({ patient, station }) {
  const firstStop = patient.personal_information.patientId.split("|").pop();
  const lastStation = getLastStation(patient);
  return {
    record_id: patient.personal_information.patientId,
    patient_id: patient.personal_information?.idf_id || "לא ידוע",
    id_type: "ISRAEL_ID",
    hospital_code: station.unit_id,
    hospital_name: station.unit_name,
    first_name: patient.personal_information?.full_name || "לא ידוע",
    origin_station_name: firstStop,
    last_station_name: lastStation || firstStop,
    pdf_file_b64: patient.base64 || "",
  };
}

export function reportAPatient(station) {
  return async (patient) => {
    const formConfirmedDetails = getFormDefaultFields({ patient, station });
    const form = new FormData();
    form.append("record_id", formConfirmedDetails.record_id);
    form.append("patient_id", formConfirmedDetails.patient_id);
    form.append("id_type", formConfirmedDetails.id_type);
    form.append("hospital_code", formConfirmedDetails.hospital_code);
    form.append("hospital_name", formConfirmedDetails.hospital_name);
    form.append("first_name", patient.personal_information.full_name);
    form.append(
      "origin_station_name",
      formConfirmedDetails.origin_station_name
    );
    form.append("last_station_name", formConfirmedDetails.last_station_name);
    form.append("pdf_file_b64", formConfirmedDetails.pdf_file_b64);

    try {
      const res = await fetch(station.API ?? env.TEST_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${station.TOKEN ?? env.TOKEN}`,
        },
        body: form,
      });
      const data = await res.json();
      if (res.status === 200) {
        console.info("patient reported");
        return data;
      } else {
        throw JSON.stringify(data);
      }
    } catch (e) {
      throw new Error(e);
    }
  };
}
