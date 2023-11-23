import React from "react";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { ASection } from "./a-section";
import { fireEvent, render, act } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import { EAirWayTreatment } from "../../../../../../interfaces";
import "@testing-library/jest-native/extend-expect";
import locale from "../../../../../../../locales/he.json";

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
    expect(addNewAction.props["aria-disabled"]).toBe(true);
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

    expect(getByTestId("add-airway-action").props["aria-disabled"]).toBe(false);
    const resetAction = getByTestId(`clear-airway-action`);
    fireEvent.press(resetAction);
    expect(getByTestId("add-airway-action").props["aria-disabled"]).toBe(true);
  });

  it("should save action and show it in the saved section", async () => {
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
    await act(() => {
      fireEvent.press(getByTestId("add-airway-action-button"));
      expect(addAction).toHaveBeenCalledWith({
        action: EAirWayTreatment.CONIOTOMY,
        id: expect.any(Number),
        successful: null,
        time: expect.any(Number),
      });
    });

    usePatientRecordsStore.setState({
      activePatient: {
        airway: {
          actions: [
            {
              action: EAirWayTreatment.CONIOTOMY,
              id: 1,
              successful: null,
              time: 1,
            },
          ],
        },
      } as any,
    });
    expect(
      getByTestId("saved-airway-action-treatment-dd-selected")
    ).toHaveTextContent(locale[EAirWayTreatment.CONIOTOMY]);
  });
});
