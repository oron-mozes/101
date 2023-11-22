import { fireEvent, render } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../../../../shared-config";
import { initialEmptyAction } from "./a-section";
import { AddAAction } from "./add-a-action";
import { EAirWayTreatment, TOGGLE } from "../../../../../../interfaces";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("AddAAction", () => {
  const mockUpdate = jest.fn();
  beforeEach(() => {
    mockUpdate.mockReset();
  });
  it("should select EAirWayTreatment", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <AddAAction
          airWayInfo={{ ...initialEmptyAction }}
          update={mockUpdate}
        />
      </PaperProvider>
    );

    const selection = getByTestId("new-airway-action-choose");
    fireEvent.press(selection);

    fireEvent.press(
      getByTestId(`new-airway-action-option-${EAirWayTreatment.CONIOTOMY}`)
    );

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        action: EAirWayTreatment.CONIOTOMY,
      })
    );
  });

  it("should send successful action and then reset", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <AddAAction
          airWayInfo={{ ...initialEmptyAction }}
          update={mockUpdate}
        />
      </PaperProvider>
    );

    const successfulAction = getByTestId(
      `new-airway-action-successful-radio-${TOGGLE.YES}-check-button`
    );
    fireEvent.press(successfulAction);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ successful: true })
    );
    const resetAction = getByTestId(`clear-airway-action`);
    fireEvent.press(resetAction);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ ...initialEmptyAction })
    );
  });
});
