import React from "react";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { ASection } from "./a-section";
import { fireEvent, render } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import { EAirWayTreatment } from "../../../../../../interfaces";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("ASection", () => {
  const addAction = jest.fn();
  beforeEach(() => {
    usePatientRecordsStore.setState({
      activePatient: { airway: { actions: [] } } as any,
      airway_handlers: {
        addAction,
        toggleFulfill: () => {},
        removeAction: () => {},
        updateById: () => {},
      },
    });
  });

  it("should render empty state with single add action open", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <ASection />
      </PaperProvider>
    );
    const activeBar = getByTestId("airway-fulfill-radio-label");
    expect(activeBar).toBeDefined();
    const newAction = getByTestId("new-airway");
    expect(newAction).toBeDefined();
    const addNewAction = getByTestId("add-airway-action");
    expect(addNewAction.props["aria-disabled"]).toBeFalsy();
  });
  it("should add action should be active once we select a action type and disable on clear", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <ASection />
      </PaperProvider>
    );
    const selection = getByTestId("new-airway-action-choose");
    fireEvent.press(selection);

    fireEvent.press(
      getByTestId(`new-airway-action-option-${EAirWayTreatment.CONIOTOMY}`)
    );

    expect(
      getByTestId("add-airway-action").props["aria-disabled"]
    ).toBeTruthy();
    const resetAction = getByTestId(`clear-airway-action`);
    fireEvent.press(resetAction);
    expect(getByTestId("add-airway-action").props["aria-disabled"]).toBeFalsy();
  });
});
