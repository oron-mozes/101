import "@testing-library/jest-native/extend-expect";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import ESection from ".";
import { EEsectionChips } from "../../../../../../interfaces";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("ESection", () => {
  const toggleSelection = jest.fn();

  beforeEach(() => {
    toggleSelection.mockClear();

    usePatientRecordsStore.setState({
      activePatient: {
        eSection: [],
      } as any,
      esection_handlers: {
        toggleSelection,
      },
    });
  });

  it("should call toggleSelection", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <ESection />
      </PaperProvider>
    );
    const hit = getByTestId(
      `e-section-${EEsectionChips.ACTIVE_HIT}-radio-button`
    );
    fireEvent.press(hit);
    expect(toggleSelection).toHaveBeenCalledWith(EEsectionChips.ACTIVE_HIT);
  });
});
