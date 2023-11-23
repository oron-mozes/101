import { fireEvent, render } from "@testing-library/react-native";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { EvacInformation } from "./information";
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("EvacInformation", () => {
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

  it("should set and call destination", () => {
    const { getByTestId } = render(<EvacInformation />);
    const destination = getByTestId("destination-input");
    fireEvent.changeText(destination, "test destination");
    expect(setDestination).toHaveBeenCalledWith("test destination");
  });
});
