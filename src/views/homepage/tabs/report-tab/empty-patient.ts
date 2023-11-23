import {
  IPatientRecord,
  EReactionEyes,
  EReactionSpeech,
  EReactionMovement,
} from "../../../../interfaces";

export const emptyPatient: IPatientRecord = {
  personal_information: {
    patientId: null,
    full_name: null,
    idf_id: null,
  },
  incident_information: {
    injury_time: null,
    care_time: null,
    date: null,
  },
  providers: [{ full_name: null, idf_id: null }],
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
    eyes: EReactionEyes.NONE,
    speech: EReactionSpeech.NONE,
    movement: EReactionMovement.NONE,
    GCS: null,
  },
  medicationsAndFluids: {
    actions: [
      {
        id: null,

        dose: null,
        time: null,
        type: null,
        treatment: null,
      },
    ],
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
