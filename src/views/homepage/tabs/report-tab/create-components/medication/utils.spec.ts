import {
  E_ANASTASIA_ACTIQ_DOSE,
  E_ANASTASIA_DORMICUM_DOSE,
  E_ANASTASIA_KATAMIN_DOSE,
  E_ANASTASIA_TREATMENT,
  E_ANTIBIOTIC_CETRIAXONE_DOSE,
  E_ANTIBIOTIC_FLAGYL_DOSE,
  E_ANTIBIOTIC_TREATMENT,
  E_FLUID_BLOOD_DOSE,
  E_FLUID_HARTMAN_DOSE,
  E_FLUID_PLASMA_DOSE,
  E_FLUID_TREATMENT,
  E_HEXAKAPRON_DOSE,
  MEDICATION_TREATMENT,
} from "../../../../../../interfaces";
import { getMedicationDoseByType, getMedicationType } from "./utils";

describe("medication utils", () => {
  it("should return the right list for medications type by treatment", () => {
    expect(
      getMedicationType({ treatment: MEDICATION_TREATMENT.ANASTASIA })
    ).toEqual(E_ANASTASIA_TREATMENT);
    expect(
      getMedicationType({ treatment: MEDICATION_TREATMENT.ANTIBIOTIC })
    ).toEqual(E_ANTIBIOTIC_TREATMENT);
    expect(
      getMedicationType({ treatment: MEDICATION_TREATMENT.FLUIDS })
    ).toEqual(E_FLUID_TREATMENT);
  });

  it("should return the right list for dose by type", () => {
    expect(getMedicationDoseByType({ type: E_FLUID_TREATMENT.BLOOD })).toEqual(
      E_FLUID_BLOOD_DOSE
    );
    expect(
      getMedicationDoseByType({ type: E_FLUID_TREATMENT.HARTMAN })
    ).toEqual(E_FLUID_HARTMAN_DOSE);
    expect(getMedicationDoseByType({ type: E_FLUID_TREATMENT.PLASMA })).toEqual(
      E_FLUID_PLASMA_DOSE
    );

    expect(
      getMedicationDoseByType({ type: E_ANTIBIOTIC_TREATMENT.CETRIAXONE })
    ).toEqual(E_ANTIBIOTIC_CETRIAXONE_DOSE);
    expect(
      getMedicationDoseByType({ type: E_ANTIBIOTIC_TREATMENT.FLAGYL })
    ).toEqual(E_ANTIBIOTIC_FLAGYL_DOSE);

    expect(
      getMedicationDoseByType({ type: E_ANASTASIA_TREATMENT.DORMICUM })
    ).toEqual(E_ANASTASIA_DORMICUM_DOSE);
    expect(
      getMedicationDoseByType({ type: E_ANASTASIA_TREATMENT.KETAMINE })
    ).toEqual(E_ANASTASIA_KATAMIN_DOSE);
    expect(
      getMedicationDoseByType({ type: E_ANASTASIA_TREATMENT.ACTIQ })
    ).toEqual(E_ANASTASIA_ACTIQ_DOSE);

    expect(
      getMedicationDoseByType({ treatment: MEDICATION_TREATMENT.HEXAKAPRON })
    ).toEqual(E_HEXAKAPRON_DOSE);
  });
});
