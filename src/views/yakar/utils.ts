import env from "../taagad/env.json";
import { Buffer } from "buffer";

export function reportAPatient(station) {
  return async (patient) => {
    const firstStop = patient.personal_information.patientId.split("|").pop();

    const buffer = Buffer.from(patient.pdf, "base64");
    const blob = new Blob([buffer], { type: "application/pdf" });
    // const response = await FileSystem.(`data:application/pdf;base64,${pdfFile}`);

    const form = new FormData();
    form.append("record_id", patient.personal_information.patientId);
    form.append("patient_id", patient.personal_information.idf_id);
    form.append("patient_id", patient.personal_information.idf_id);
    form.append("id_type", "ISRAEL_ID");
    form.append("hospital_code", station.unit_id);
    form.append("hospital_name", station.unit_name);
    form.append("first_name", patient.personal_information.full_name);
    form.append("origin_station_name", firstStop);
    form.append("last_station_name", firstStop);
    form.append("pdf_file", blob);
    fetch(env.TEST_API, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${env.TOKEN}`,
      },
      body: form,
    })
      .then((res) => console.log({ res }))
      .catch((e) => console.log({ e }))
      .finally(() => console.log("DONE"));
    // try {
    //   return

    //   console.log({ res });

    //   const data = await res.json();
    //   return data;
    // } catch (e) {
    //   throw new Error(e);
    // }
  };
}
