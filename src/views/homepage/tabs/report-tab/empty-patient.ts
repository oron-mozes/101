import { IPatientRecord } from "../../../../interfaces";

export const emptyPatient: IPatientRecord = {
  personal_information: {
    patientId: null,
    full_name: null,
    idf_id: null,
    unit: "",
  },
  incident_information: {
    injury_time: null,
    care_time: null,
    date: null,
  },
  providers: [],
  injuries: [],
  eSection: [],
  airway: {
    actions: [],
    fulfill: null,
  },
  breathing: {
    actions: [],
    breathingCount: null,
    saturation: null,
    fulfill: null,
  },
  consciousness: [],
  injuryReason: {
    reasons: [],
    circumstance: null,
  },
  prognosis: [],
  measurements: {
    shock: null,
    actions: [],
    palpated: null,
    puls: null,
    bloodPressure: null,
  },
  reaction: {
    general: [],
    eyes: null,
    speech: null,
    movement: null,
    GCS: null,
  },
  medicationsAndFluids: {
    actions: [],
  },
  evacuation: {
    status: null,
    time: null,
    transportation: null,
    destination: null,
    special_care: null,
  },
  treatmentGuide: {
    guides: [],
    measurements: {
      period: null,
      actions: [],
    },
  },
};
