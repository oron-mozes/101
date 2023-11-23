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
  const addAction = jest.fn();

  beforeEach(() => {
    addAction.mockClear();

    usePatientRecordsStore.setState({
      activePatient: {
        medicationsAndFluids: { actions: [] },
      } as any,
      medicationsAndFluids_handlers: {
        addAction,
        removeAction: () => {},
        updateById: () => {},
      },
    });
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
  });
});
