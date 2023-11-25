import "@testing-library/jest-native/extend-expect";
import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import locale from "../../../../../../../locales/he.json";
import { EMeasurementsTreatments } from "../../../../../../interfaces";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import CSection from ".";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("CSection", () => {
  const addAction = jest.fn();
  const toggleShock = jest.fn();
  const togglePalpated = jest.fn();
  const setPuls = jest.fn();
  const setBloodPressure = jest.fn();

  beforeEach(() => {
    addAction.mockClear();
    toggleShock.mockClear();
    togglePalpated.mockClear();
    setPuls.mockClear();
    setBloodPressure.mockClear();

    usePatientRecordsStore.setState({
      activePatient: {
        measurements: {
          actions: [],
          puls: null,
          shock: null,
          bloodPressure: null,
        },
      } as any,
      measurements_handlers: {
        addAction,
        toggleShock,
        togglePalpated,
        setPuls,
        setBloodPressure,
        removeAction: () => {},
        updateById: () => {},
      },
    });
  });
  it("should update puls", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <CSection />
      </PaperProvider>
    );
    const puls = getByTestId("puls-input");
    fireEvent.changeText(puls, "10");
    expect(setPuls).toHaveBeenCalledWith(10);
  });

  it("should update blood pressure", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <CSection />
      </PaperProvider>
    );
    const bloodPressure = getByTestId("blood-pressure-input");
    fireEvent.changeText(bloodPressure, "100123");
    expect(setBloodPressure).toHaveBeenCalledWith("100/123");
  });

  it("should add action should be active once we select a action type and disable on clear", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <CSection />
      </PaperProvider>
    );
    const selection = getByTestId("new-measurement-treatment-action-choose");
    fireEvent.press(selection);

    fireEvent.press(
      getByTestId(
        `new-measurement-treatment-action-option-${EMeasurementsTreatments.CENTRAL_VAIN}`
      )
    );

    expect(
      getByTestId("add-measurement-treatment-action").props["aria-disabled"]
    ).toBe(false);
    const resetAction = getByTestId(`clear-new-measurement-treatment-action`);
    fireEvent.press(resetAction);
    expect(
      getByTestId("add-measurement-treatment-action").props["aria-disabled"]
    ).toBe(true);
  });

  it("should save action and show it in the saved section", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <CSection />
      </PaperProvider>
    );
    const selection = getByTestId("new-measurement-treatment-action-choose");
    fireEvent.press(selection);

    fireEvent.press(
      getByTestId(
        `new-measurement-treatment-action-option-${EMeasurementsTreatments.CENTRAL_VAIN}`
      )
    );
    await act(() => {
      fireEvent.press(getByTestId("add-measurement-treatment-action-button"));
      expect(addAction).toHaveBeenCalledWith({
        action: EMeasurementsTreatments.CENTRAL_VAIN,
        id: expect.any(Number),
        successful: null,
        time: expect.any(Number),
      });
    });

    usePatientRecordsStore.setState({
      activePatient: {
        measurements: {
          actions: [
            {
              action: EMeasurementsTreatments.CENTRAL_VAIN,
              id: 1,
              successful: null,
              time: 1,
            },
          ],
        },
      } as any,
    });
    expect(
      getByTestId("saved-measurement-treatment-action-dd-selected")
    ).toHaveTextContent(locale[EMeasurementsTreatments.CENTRAL_VAIN]);
  });
});
