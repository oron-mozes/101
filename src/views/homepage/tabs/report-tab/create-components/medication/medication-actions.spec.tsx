import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import {
  E_ANASTASIA_ACTIQ_DOSE,
  E_ANASTASIA_TREATMENT,
  MEDICATION_TREATMENT,
} from "../../../../../../interfaces";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { MedicationActions } from "./medication-actions";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("Medication action", () => {
  const addAction = jest.fn((action) => {
    usePatientRecordsStore.setState({
      ...initialState,
      activePatient: {
        ...initialState.activePatient,
        medicationsAndFluids: {
          ...initialState.activePatient.medicationsAndFluids,
          actions: [
            ...initialState.activePatient.medicationsAndFluids.actions,
            action,
          ],
        },
      },
    } as any);
  });
  let medicationsAndFluids = {
    actions: [
      {
        treatment: MEDICATION_TREATMENT.ANASTASIA,
        type: E_ANASTASIA_TREATMENT.ACTIQ,
        dose: E_ANASTASIA_ACTIQ_DOSE.D800MG,
        time: 1700853784687,
        id: 1700853784687,
      },
    ],
  };

  let initialState = {
    activePatient: {
      medicationsAndFluids,
    },
    medicationsAndFluids_handlers: {
      addAction,
    },
  };
  usePatientRecordsStore.setState(initialState as any);

  beforeEach(() => {
    addAction.mockClear();

    medicationsAndFluids = {
      actions: [
        {
          treatment: MEDICATION_TREATMENT.ANASTASIA,
          type: E_ANASTASIA_TREATMENT.ACTIQ,
          dose: E_ANASTASIA_ACTIQ_DOSE.D800MG,
          time: 1700853784687,
          id: 1700853784687,
        },
      ],
    };

    initialState = {
      medicationsAndFluids_handlers: {
        addAction,
      },
      activePatient: {
        medicationsAndFluids,
      },
    };
    usePatientRecordsStore.setState(initialState as any);
  });

  it("should render the component correctly", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <MedicationActions />
      </PaperProvider>
    );

    expect(getByTestId("medication-action-0")).toBeDefined();
    expect(getByTestId("medication-action-0-message")).toHaveTextContent(
      "הרדמה וכאב, אקטיק, 800 מ״ג, 21:23"
    );
  });
});
