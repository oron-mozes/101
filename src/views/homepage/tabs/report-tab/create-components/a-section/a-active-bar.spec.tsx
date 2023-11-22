import { fireEvent, render } from "@testing-library/react-native";
import { TOGGLE } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { AActiveBar } from "./a-active-bar";
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("AActiveBar", () => {
  const toggleFulfill = jest.fn();

  beforeEach(() => {
    toggleFulfill.mockClear();
    usePatientRecordsStore.setState({
      airway_handlers: {
        toggleFulfill,
        addAction: () => {},
        removeAction: () => {},
        updateById: () => {},
      },
      activePatient: { airway: { fulfill: null } } as any,
    });
  });

  it("should render first time empty", () => {
    const { getByTestId } = render(<AActiveBar />);
    const activeBar = getByTestId("airway-fulfill-radio-label");
    expect(activeBar).toBeDefined();
    const yes = getByTestId(
      `airway-fulfill-radio-${TOGGLE.YES}-check-button-container`
    );
    const no = getByTestId(
      `airway-fulfill-radio-${TOGGLE.NO}-check-button-container`
    );

    expect(yes.props["aria-checked"]).toBeFalsy();
    expect(no.props["data-aria-checked"]).toBeFalsy();
  });

  it("should render with data", () => {
    usePatientRecordsStore.setState({
      airway_handlers: {
        toggleFulfill,
        addAction: () => {},
        removeAction: () => {},
        updateById: () => {},
      },
      activePatient: { airway: { fulfill: true } } as any,
    });
    const { getByTestId } = render(<AActiveBar />);
    const activeBar = getByTestId("airway-fulfill-radio-label");
    expect(activeBar).toBeDefined();
    const yes = getByTestId(
      `airway-fulfill-radio-${TOGGLE.YES}-check-button-container`
    );
    const no = getByTestId(
      `airway-fulfill-radio-${TOGGLE.NO}-check-button-container`
    );

    expect(yes.props["aria-checked"]).toBeTruthy();
    expect(no.props["data-aria-checked"]).toBeFalsy();
  });

  it("should call onSelect when an option is selected", () => {
    const { getByTestId } = render(<AActiveBar />);
    const yes = getByTestId(`airway-fulfill-radio-${TOGGLE.YES}-check-button`);
    fireEvent.press(yes);
    expect(toggleFulfill).toHaveBeenCalledWith(true);
  });
});
