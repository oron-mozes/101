import { render, fireEvent } from "@testing-library/react-native";
import { InjuryReason } from "./injury-reason";
import { EInjuryReason } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("InjuryReason", () => {
  const toggleReason = jest.fn();
  const setCircumstance = jest.fn();
  beforeEach(() => {
    toggleReason.mockClear();
    setCircumstance.mockClear();

    usePatientRecordsStore.setState({
      injuryReason_handlers: { toggleReason, setCircumstance },
      activePatient: {
        injuryReason: {
          reasons: [],
          circumstance: "",
        },
      } as any,
    });
  });

  it("should render the component correctly", () => {
    const { getByTestId } = render(<InjuryReason />);
    const card = getByTestId("injury-reason-card");
    const inputField = getByTestId("injury-circumstance-input");

    expect(card).toBeDefined();
    expect(inputField).toBeDefined();
  });

  it("should toggle the reason when a toggle button is pressed", () => {
    const { getByTestId } = render(<InjuryReason />);
    const toggleButton = getByTestId(
      `injury-reason-${EInjuryReason.ACCIDENT}-radio-button`
    );

    fireEvent.press(toggleButton);
    expect(toggleReason).toHaveBeenCalledWith(EInjuryReason.ACCIDENT);
  });

  it("should update the circumstance when the input field value changes", () => {
    const { getByTestId } = render(<InjuryReason />);
    const inputField = getByTestId("injury-circumstance-input");

    fireEvent.changeText(inputField, "New circumstance");

    expect(setCircumstance).toHaveBeenCalledWith("New circumstance");
  });
});
