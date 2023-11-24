import { fireEvent, render } from "@testing-library/react-native";
import { STATUS } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import Evacuation from ".";
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("Evacuation", () => {
  const setSpecialCare = jest.fn();
  const setTransportation = jest.fn();
  const setTime = jest.fn();
  const setDestination = jest.fn();
  const setStatus = jest.fn();

  beforeEach(() => {
    setTransportation.mockClear();
    setSpecialCare.mockClear();
    setTime.mockClear();
    setDestination.mockClear();
    setStatus.mockClear();
    usePatientRecordsStore.setState({
      evacuation_handlers: {
        setTransportation,
        setSpecialCare,
        setTime,
        setDestination,
        setStatus,
      },
      activePatient: {
        evacuation: { transportation: null, special_care: null },
      } as any,
    });
  });

  it("should set and call status", () => {
    const { getByTestId } = render(<Evacuation />);
    const status = getByTestId(`status-${STATUS.TO_EVAC}-chip`);
    fireEvent.press(status);
    expect(setStatus).toHaveBeenCalledWith(STATUS.TO_EVAC);
  });
});
