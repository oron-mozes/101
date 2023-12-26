import {
  E_ANASTASIA_ACTIQ_DOSE,
  E_ANASTASIA_DORMICUM_DOSE,
  E_ANASTASIA_KATAMIN_DOSE,
  E_ANASTASIA_MORFIUM_DOSE,
  E_ANASTASIA_TREATMENT,
  E_ANTIBIOTIC_CETRIAXONE_DOSE,
  E_ANTIBIOTIC_FLAGYL_DOSE,
  E_ANTIBIOTIC_TREATMENT,
  E_FLUID_BLOOD_DOSE,
  E_FLUID_HARTMAN_DOSE,
  E_FLUID_PLASMA_DOSE,
  E_FLUID_TREATMENT,
  E_HEXAKAPRON_DOSE,
  IMedicationsAndFluidInformation,
  MEDICATION_TREATMENT,
} from "../../../../../../interfaces";

export function getMedicationType(
  newMedication: Partial<IMedicationsAndFluidInformation>
) {
  if (!newMedication?.treatment) {
    return;
  }

  return (
    (newMedication.treatment === MEDICATION_TREATMENT.ANASTASIA &&
      E_ANASTASIA_TREATMENT) ||
    (newMedication.treatment === MEDICATION_TREATMENT.ANTIBIOTIC &&
      E_ANTIBIOTIC_TREATMENT) ||
    (newMedication.treatment === MEDICATION_TREATMENT.FLUIDS &&
      E_FLUID_TREATMENT) ||
    (newMedication.treatment === MEDICATION_TREATMENT.OTHER && null)
  );
}
export function getMedicationDoseByType(
  newMedication: Partial<IMedicationsAndFluidInformation>
) {
  if (newMedication?.treatment === MEDICATION_TREATMENT.HEXAKAPRON) {
    return E_HEXAKAPRON_DOSE;
  }
  if (!newMedication?.type) {
    return;
  }
  return (
    // (newMedication.type === E_FLUID_TREATMENT.BLOOD && E_FLUID_BLOOD_DOSE) ||
    (newMedication.type === E_FLUID_TREATMENT.HARTMAN &&
      E_FLUID_HARTMAN_DOSE) ||
    (newMedication.type === E_FLUID_TREATMENT.PLASMA && E_FLUID_PLASMA_DOSE) ||
    (newMedication.type === E_ANTIBIOTIC_TREATMENT.CETRIAXONE &&
      E_ANTIBIOTIC_CETRIAXONE_DOSE) ||
    (newMedication.type === E_ANTIBIOTIC_TREATMENT.FLAGYL &&
      E_ANTIBIOTIC_FLAGYL_DOSE) ||
    (newMedication.type === E_ANASTASIA_TREATMENT.DORMICUM &&
      E_ANASTASIA_DORMICUM_DOSE) ||
    (newMedication.type === E_ANASTASIA_TREATMENT.KETAMINE &&
      E_ANASTASIA_KATAMIN_DOSE) ||
    (newMedication.type === E_ANASTASIA_TREATMENT.ACTIQ &&
      E_ANASTASIA_ACTIQ_DOSE) ||
    (newMedication.type === E_ANASTASIA_TREATMENT.MORFIUM &&
      E_ANASTASIA_MORFIUM_DOSE)
  );
}

export function allowAddMedication(
  medication: IMedicationsAndFluidInformation
): boolean {
  if (medication.treatment === MEDICATION_TREATMENT.OTHER) {
    return !!medication.other;
  }
  if (medication.type === E_FLUID_TREATMENT.BLOOD) {
    return !!medication.other;
  }
  return (
    !!medication.other ||
    !!getMedicationDoseByType(medication)?.[medication?.dose]
  );
}
