import { fireEvent, render } from "@testing-library/react-native";
import { TOGGLE } from "../../../../../../interfaces";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { RadAndShock } from "./rad-and-shock";
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("RadAndShock", () => {
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
          palpated: null,
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

  it("should empty palpated", () => {
    const { getByTestId } = render(<RadAndShock />);
    const palpated = getByTestId("palpated-radio-label");
    expect(palpated).toBeDefined();
    const yes = getByTestId(
      `palpated-radio-${TOGGLE.YES}-check-button-container`
    );
    const no = getByTestId(
      `palpated-radio-${TOGGLE.NO}-check-button-container`
    );

    expect(yes.props["aria-checked"]).toBeFalsy();
    expect(no.props["data-aria-checked"]).toBeFalsy();
  });

  it("should empty shock", () => {
    const { getByTestId } = render(<RadAndShock />);
    const shock = getByTestId("shock-radio-label");
    expect(shock).toBeDefined();
    const yes = getByTestId(`shock-radio-${TOGGLE.YES}-check-button-container`);
    const no = getByTestId(`shock-radio-${TOGGLE.NO}-check-button-container`);

    expect(yes.props["aria-checked"]).toBeFalsy();
    expect(no.props["data-aria-checked"]).toBeFalsy();
  });

  it("should selected palpated", () => {
    usePatientRecordsStore.setState({
      activePatient: {
        measurements: {
          actions: [],
          puls: null,
          shock: null,
          bloodPressure: null,
          palpated: true,
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
    const { getByTestId } = render(<RadAndShock />);

    const yes = getByTestId(
      `palpated-radio-${TOGGLE.YES}-check-button-container`
    );
    const no = getByTestId(
      `palpated-radio-${TOGGLE.NO}-check-button-container`
    );

    expect(yes.props["aria-checked"]).toBe(true);
    expect(no.props["data-aria-checked"]).toBeUndefined();
  });

  it("should selected shock", () => {
    usePatientRecordsStore.setState({
      activePatient: {
        measurements: {
          actions: [],
          puls: null,
          shock: true,
          bloodPressure: null,
          palpated: null,
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
    const { getByTestId } = render(<RadAndShock />);

    const yes = getByTestId(`shock-radio-${TOGGLE.YES}-check-button-container`);
    const no = getByTestId(`shock-radio-${TOGGLE.NO}-check-button-container`);

    expect(yes.props["aria-checked"]).toBe(true);
    expect(no.props["data-aria-checked"]).toBeUndefined();
  });

  it("should call togglePalpated", () => {
    const { getByTestId } = render(<RadAndShock />);
    const yes = getByTestId(`palpated-radio-${TOGGLE.YES}-check-button`);
    fireEvent.press(yes);
    expect(togglePalpated).toHaveBeenCalledWith(true);
  });
  it("should call toggleShock", () => {
    const { getByTestId } = render(<RadAndShock />);
    const yes = getByTestId(`shock-radio-${TOGGLE.YES}-check-button`);
    fireEvent.press(yes);
    expect(toggleShock).toHaveBeenCalledWith(true);
  });
});
