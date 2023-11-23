import "@testing-library/jest-native/extend-expect";
import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import locale from "../../../../../../../locales/he.json";
import { EBreathingTreatment, IAction } from "../../../../../../interfaces";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { BSection } from "./b-section";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("BSection", () => {
  const addAction = jest.fn();
  const setBreathingCount = jest.fn();
  const setSaturation = jest.fn();

  beforeEach(() => {
    addAction.mockClear();
    setBreathingCount.mockClear();
    setSaturation.mockClear();
    usePatientRecordsStore.setState({
      activePatient: {
        breathing: { actions: [], saturation: null, breathingCount: null },
      } as any,
      breathing_handlers: {
        addAction,
        toggleFulfill: () => {},
        setBreathingCount,
        setSaturation,
        removeAction: () => {},
        updateById: () => {},
      },
    });
  });

  it("should update breathing count", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <BSection />
      </PaperProvider>
    );
    const breathingCount = getByTestId("breathing-count-input");
    fireEvent.changeText(breathingCount, "10");
    expect(setBreathingCount).toHaveBeenCalledWith(10);
  });

  it("should update saturation", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <BSection />
      </PaperProvider>
    );
    const saturation = getByTestId("saturation-input");
    fireEvent.changeText(saturation, "10");
    expect(setSaturation).toHaveBeenCalledWith(10);
  });

  it("should render empty state with single add action open", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <BSection />
      </PaperProvider>
    );
    const activeBar = getByTestId("breathing-fulfill-radio-label");
    expect(activeBar).toBeDefined();
    const newAction = getByTestId("new-breathing");
    expect(newAction).toBeDefined();
    const addNewAction = getByTestId("add-breathing-action");
    expect(addNewAction.props["aria-disabled"]).toBe(true);
  });
  it("should add action should be active once we select a action type and disable on clear", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <BSection />
      </PaperProvider>
    );
    const selection = getByTestId("new-breathing-action-choose");
    fireEvent.press(selection);

    fireEvent.press(
      getByTestId(
        `new-breathing-action-option-${EBreathingTreatment.CHEST_TUBE}`
      )
    );

    expect(getByTestId("add-breathing-action").props["aria-disabled"]).toBe(
      false
    );
    const resetAction = getByTestId(`clear-new-breathing-action`);
    fireEvent.press(resetAction);
    expect(getByTestId("add-breathing-action").props["aria-disabled"]).toBe(
      true
    );
  });

  it("should save action and show it in the saved section", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <BSection />
      </PaperProvider>
    );
    const selection = getByTestId("new-breathing-action-choose");
    fireEvent.press(selection);

    fireEvent.press(
      getByTestId(
        `new-breathing-action-option-${EBreathingTreatment.CHEST_TUBE}`
      )
    );
    await act(() => {
      fireEvent.press(getByTestId("add-breathing-action-button"));
      expect(addAction).toHaveBeenCalledWith({
        action: EBreathingTreatment.CHEST_TUBE,
        id: expect.any(Number),
        successful: null,
        time: expect.any(Number),
      });
    });

    usePatientRecordsStore.setState({
      activePatient: {
        breathing: {
          actions: [
            {
              action: EBreathingTreatment.CHEST_TUBE,
              id: 1,
              successful: null,
              time: 1,
            },
          ],
        },
      } as any,
    });
    expect(
      getByTestId("saved-breathing-action-treatment-dd-selected")
    ).toHaveTextContent(locale[EBreathingTreatment.CHEST_TUBE]);
  });
});
