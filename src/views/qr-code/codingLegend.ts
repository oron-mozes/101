//0 is reserved for spacing
//enum are 2 dig
//array
const coding: Map<string, number> = new Map([]);
coding.set("personal_information.full_name", 1.1);
coding.set("personal_information.idf_id", 1.2);

coding.set("incident_information.injury_time", 2.1);
coding.set("incident_information.care_time", 2.2);
coding.set("incident_information.date", 2.3);

coding.set("provider.full_name", 3.1);
coding.set("provider.idf_id", 3.2);
coding.set("provider.rank", 3.3);
coding.set("provider.unit_name", 3.4);
coding.set("provider.role", 3.5);
coding.set("provider.role.MEDIC", 3.501);
coding.set("provider.role.PARAMEDIC", 3.502);
coding.set("provider.role.MD", 3.503);

coding.set("injuries.LEFT_LEG", 3.1);
coding.set("injuries.BACK", 3.2);
coding.set("injuries.LEFT_LEG_BACK", 3.3);
coding.set("injuries.RIGHT_LEG", 3.4);
coding.set("injuries.RIGHT_LEG_BACK", 3.5);
coding.set("injuries.LEFT_ARM", 3.6);
coding.set("injuries.LEFT_ARM_BACK", 3.7);
coding.set("injuries.RIGHT_ARM", 3.8);
coding.set("injuries.RIGHT_ARM_BACK", 3.9);
coding.set("injuries.ASS", 3.11);
coding.set("injuries.GENITAL", 3.12);
coding.set("injuries.STOMACH", 3.13);
coding.set("injuries.CHEST", 3.14);
coding.set("injuries.FOREHEAD", 3.15);
coding.set("injuries.BACK_HEAD", 3.16);
coding.set("injuries.gunshots", 3.111);
coding.set("injuries.hits", 3.112);
coding.set("injuries.HT", 3.113);
coding.set("injuries.HT_time", 3.114);

coding.set("consciousness.AWAKE", 4.1);
coding.set("consciousness.VOICE", 4.2);
coding.set("consciousness.PAIN", 4.3);
coding.set("consciousness.APVN_NONE", 4.4);

coding.set("eSection.UNDRESSING", 5.1);
coding.set("eSection.FLIPPING", 5.2);
coding.set("eSection.SPLINTING", 5.3);

coding.set("airway.fulfill", 6.1);
coding.set("airway.actions", 6.2);
coding.set("airway.action", 6.111);
coding.set("airway.time", 6.112);
coding.set("airway.successful", 6.113);

coding.set("breathing.breathingCount", 7.1);
coding.set("breathing.fulfill", 7.2);
coding.set("breathing.saturation", 7.3);
coding.set("breathing.actions", 7.4);
coding.set("breathing.successful", 7.111);
coding.set("breathing.time", 7.112);
coding.set("breathing.action", 7.113);
coding.set("breathing.action.OXIGEN", 7.11301);
coding.set("breathing.action.MOUTH", 7.11302);
coding.set("breathing.action.NA", 7.11303);
coding.set("breathing.action.CHEST_TUBE", 7.11304);

coding.set("measurements.fulfill", 8.1);
coding.set("measurements.shock", 8.2);
coding.set("measurements.palpated", 8.3);
coding.set("measurements.puls", 8.4);
coding.set("measurements.bloodPressure.diastolic", 8.5);
coding.set("measurements.bloodPressure.systolic", 8.6);
coding.set("measurements.actions", 8.7);
coding.set("measurements.actions.time", 8.111);
coding.set("measurements.actions.successful", 8.112);
coding.set("measurements.actions.action", 8.113);
coding.set("measurements.actions.action.STOP_BLEEDING", 8.11301);
coding.set("measurements.actions.action.PERIPHERAL_VAIN", 8.11302);
coding.set("measurements.actions.action.CENTRAL_VAIN", 8.11303);
coding.set("measurements.actions.action.IO", 8.11304);

coding.set("reaction.eyes.NONE", 9.11);
coding.set("reaction.eyes.TO_PAIN", 9.12);
coding.set("reaction.eyes.TO_VOICE", 9.13);
coding.set("reaction.eyes.SPONTANEITY", 9.14);
coding.set("reaction.speech.NONE", 9.21);
coding.set("reaction.speech.VOICES", 9.22);
coding.set("reaction.speech.WORDS", 9.23);
coding.set("reaction.speech.CONFUSED", 9.24);
coding.set("reaction.speech.STRAIGHT", 9.25);
coding.set("reaction.movement.NONE", 9.31);
coding.set("reaction.movement.OFTEN", 9.32);
coding.set("reaction.movement.IN_PLACE", 9.33);
coding.set("reaction.movement.RETREAT", 9.34);
coding.set("reaction.movement.BENDING", 9.35);
coding.set("reaction.movement.STRAIGHTENING", 9.35);
coding.set("reaction.GCS", 9.4);
coding.set("reaction.general", 9.5);
coding.set("reaction.general.OK", 9.501);
coding.set("reaction.general.NON_SENSORY", 9.502);
coding.set("reaction.general.NON_MOTORIZED", 9.503);
coding.set("reaction.general.UN_EQUAL_PUPILS", 9.504);

coding.set("medicationsAndFluids.actions", 11.1);
coding.set("medicationsAndFluids.actions.dose", 11.101);
coding.set("medicationsAndFluids.actions.time", 11.102);
coding.set("medicationsAndFluids.actions.action", 11.103);
coding.set("medicationsAndFluids.actions.action.HEXAKAPRON", 11.1031);
coding.set("medicationsAndFluids.actions.action.HEXAKAPRON_1", 11.1032);
coding.set("medicationsAndFluids.actions.action.CETRIAXONE", 11.1033);
coding.set("medicationsAndFluids.actions.action.CETRIAXONE_1", 11.1034);
coding.set("medicationsAndFluids.actions.action.FLAGYL", 11.1035);
coding.set("medicationsAndFluids.actions.action.FLAGYL_500", 11.1036);
coding.set("medicationsAndFluids.actions.action.KETAMINE", 11.1037);
coding.set("medicationsAndFluids.actions.action.KETAMINE_500", 11.1038);
coding.set("medicationsAndFluids.actions.action.KETAMINE_250", 11.1039);
coding.set("medicationsAndFluids.actions.action.KETAMINE_25", 11.10311);
coding.set("medicationsAndFluids.actions.action.DORMICUM", 11.10312);
coding.set("medicationsAndFluids.actions.action.DORMICUM_5", 11.10313);
coding.set("medicationsAndFluids.actions.action.ACTIQ", 11.10314);
coding.set("medicationsAndFluids.actions.action.ACTIQ_800", 11.10315);
