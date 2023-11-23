import { fireEvent, render } from "@testing-library/react-native";
import { TOGGLE } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { BActiveBar } from "./b-active-bar";
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("B ActiveBar", () => {
  const toggleFulfill = jest.fn();

  beforeEach(() => {
    toggleFulfill.mockClear();
    usePatientRecordsStore.setState({
      breathing_handlers: {
        toggleFulfill,
        addAction: () => {},
        removeAction: () => {},
        updateById: () => {},
        setBreathingCount: () => {},
        setSaturation: () => {},
      },
      activePatient: { breathing: { fulfill: null } } as any,
    });
  });

  it("should render first time empty", () => {
    const { getByTestId } = render(<BActiveBar />);
    const activeBar = getByTestId("breathing-fulfill-radio-label");
    expect(activeBar).toBeDefined();
    const yes = getByTestId(
      `breathing-fulfill-radio-${TOGGLE.YES}-check-button-container`
    );
    const no = getByTestId(
      `breathing-fulfill-radio-${TOGGLE.NO}-check-button-container`
    );

    expect(yes.props["aria-checked"]).toBeFalsy();
    expect(no.props["data-aria-checked"]).toBeFalsy();
  });

  it("should render with data", () => {
    usePatientRecordsStore.setState({
      breathing_handlers: {
        toggleFulfill,
        addAction: () => {},
        removeAction: () => {},
        updateById: () => {},
        setBreathingCount: () => {},
        setSaturation: () => {},
      },
      activePatient: { breathing: { fulfill: true } } as any,
    });
    const { getByTestId } = render(<BActiveBar />);
    const activeBar = getByTestId("breathing-fulfill-radio-label");
    expect(activeBar).toBeDefined();
    const yes = getByTestId(
      `breathing-fulfill-radio-${TOGGLE.YES}-check-button-container`
    );
    const no = getByTestId(
      `breathing-fulfill-radio-${TOGGLE.NO}-check-button-container`
    );

    expect(yes.props["aria-checked"]).toBeTruthy();
    expect(no.props["data-aria-checked"]).toBeFalsy();
  });

  it("should call onSelect when an option is selected", () => {
    const { getByTestId } = render(<BActiveBar />);
    const yes = getByTestId(
      `breathing-fulfill-radio-${TOGGLE.YES}-check-button`
    );
    fireEvent.press(yes);
    expect(toggleFulfill).toHaveBeenCalledWith(true);
  });
});
