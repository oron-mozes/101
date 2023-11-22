import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Avpu } from "./avpu";
import { ECconsciousness } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("Avpu", () => {
  const toggleConsciousness = jest.fn();

  beforeEach(() => {
    toggleConsciousness.mockClear();
    usePatientRecordsStore.setState({
      activePatient: {
        consciousness: [],
      } as any,
      consciousness_handlers: { toggleConsciousness },
    });
  });

  it("call the toggle with the selected item", () => {
    const { getByTestId } = render(<Avpu />);
    const checkButton = getByTestId(
      `avpu-${ECconsciousness.APVN_NONE}-check-button`
    );

    fireEvent.press(checkButton);
    expect(toggleConsciousness).toHaveBeenCalledWith(ECconsciousness.APVN_NONE);
  });
});
