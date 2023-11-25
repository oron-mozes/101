import "@testing-library/jest-native/extend-expect";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { NewMedication } from "./new-medication";
import {
  E_ANASTASIA_KATAMIN_DOSE,
  E_ANASTASIA_TREATMENT,
  E_HEXAKAPRON_DOSE,
  MEDICATION_TREATMENT,
} from "../../../../../../interfaces";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("NewMedication", () => {
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
    actions: [],
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
      actions: [],
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
  it("should test ANASTASIA flow", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <NewMedication />
      </PaperProvider>
    );
    const treatment = getByTestId(
      `medication-treatment-${MEDICATION_TREATMENT.ANASTASIA}-check-button`
    );

    await act(() => {
      fireEvent.press(treatment);
    });
    waitFor(() => {
      expect(
        getByTestId(
          `medication-treatment-${MEDICATION_TREATMENT.ANASTASIA}-check-button`
        ).props["aria-checked"]
      ).toBe(true);
    });
    expect(getByTestId("add-medication-button").props["aria-disabled"]).toBe(
      true
    );
    const katamin = getByTestId(
      `medication-type-${E_ANASTASIA_TREATMENT.KETAMINE}-check-button`
    );
    await act(() => {
      fireEvent.press(katamin);
    });
    waitFor(() => {
      expect(
        getByTestId(
          `medication-type-${E_ANASTASIA_TREATMENT.KETAMINE}-check-button`
        ).props["aria-checked"]
      ).toBe(true);
    });
    expect(getByTestId("add-medication-button").props["aria-disabled"]).toBe(
      true
    );
    const dose = getByTestId(
      `medication-dose-${E_ANASTASIA_KATAMIN_DOSE.D250MG}-check-button`
    );
    await act(() => {
      fireEvent.press(dose);
    });
    waitFor(() => {
      expect(
        getByTestId(
          `medication-dose-${E_ANASTASIA_KATAMIN_DOSE.D250MG}-check-button`
        ).props["aria-checked"]
      ).toBe(true);
    });
    expect(getByTestId("add-medication-button").props["aria-disabled"]).toBe(
      false
    );
    fireEvent.press(getByTestId("add-medication-button-handler"));
    expect(addAction).toHaveBeenCalledWith({
      dose: E_ANASTASIA_KATAMIN_DOSE.D250MG,
      id: expect.any(Number),
      other: null,
      time: expect.any(Number),
      treatment: MEDICATION_TREATMENT.ANASTASIA,
      type: E_ANASTASIA_TREATMENT.KETAMINE,
    });
  });

  it("should test HEXAKAPRON flow", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <NewMedication />
      </PaperProvider>
    );
    const treatment = getByTestId(
      `medication-treatment-${MEDICATION_TREATMENT.HEXAKAPRON}-check-button`
    );

    await act(() => {
      fireEvent.press(treatment);
    });
    waitFor(() => {
      expect(
        getByTestId(
          `medication-treatment-${MEDICATION_TREATMENT.HEXAKAPRON}-check-button`
        ).props["aria-checked"]
      ).toBe(true);
      expect(
        getByTestId(`medication-dose-${E_HEXAKAPRON_DOSE.D1G}-check-button`)
          .props["aria-checked"]
      ).toBe(true);
    });

    expect(getByTestId("add-medication-button").props["aria-disabled"]).toBe(
      false
    );
  });
  it("should test OTHER flow", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <NewMedication />
      </PaperProvider>
    );
    const treatment = getByTestId(
      `medication-treatment-${MEDICATION_TREATMENT.OTHER}-check-button`
    );

    await act(() => {
      fireEvent.press(treatment);
    });
    waitFor(() => {
      expect(
        getByTestId(
          `medication-treatment-${MEDICATION_TREATMENT.OTHER}-check-button`
        ).props["aria-checked"]
      ).toBe(true);
    });

    expect(getByTestId("add-medication-button").props["aria-disabled"]).toBe(
      true
    );
    fireEvent.changeText(getByTestId("medication-other-input"), "other");

    act(() => {
      fireEvent.press(getByTestId("add-medication-button-handler"));
    });
    expect(addAction).toHaveBeenCalledWith({
      dose: null,
      id: expect.any(Number),
      other: "other",
      time: expect.any(Number),
      treatment: MEDICATION_TREATMENT.OTHER,
      type: null,
    });
  });
});
