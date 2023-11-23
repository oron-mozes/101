import { fireEvent, render } from "@testing-library/react-native";
import { ETransportation } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { EvacBy } from "./evac-by";
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("EvacBy", () => {
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

  it("should set and call setSpecialCare", () => {
    const { getByTestId } = render(<EvacBy />);
    const specialCare = getByTestId("special-care");
    fireEvent.press(specialCare);
    expect(setSpecialCare).toHaveBeenCalledWith(true);
  });

  it("should select transportation", () => {
    const { getByTestId } = render(<EvacBy />);
    const transportation = getByTestId(
      `transportation-${ETransportation.CHOPPER}-radio-button`
    );
    fireEvent.press(transportation);
    expect(setTransportation).toHaveBeenCalledWith(ETransportation.CHOPPER);
  });
});
