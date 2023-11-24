import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

import { PaperProvider } from "react-native-paper";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import PatientDetails from ".";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("PatientDetails", () => {
  const setFullName = jest.fn((full_name) => {
    usePatientRecordsStore.setState({
      ...initialState,
      activePatient: {
        ...initialState.activePatient,
        personal_information: {
          ...initialState.activePatient.personal_information,
          full_name,
        },
      },
    } as any);
  });
  const setIdf = jest.fn((idf_id) => {
    usePatientRecordsStore.setState({
      ...initialState,
      activePatient: {
        ...initialState.activePatient,
        personal_information: {
          ...initialState.activePatient.personal_information,
          idf_id,
        },
      },
    } as any);
  });
  const setCareTime = jest.fn((care_time) => {
    usePatientRecordsStore.setState({
      ...initialState,
      activePatient: {
        ...initialState.activePatient,
        incident_information: {
          ...initialState.activePatient.incident_information,
          care_time,
        },
      },
    } as any);
  });
  const setTime = jest.fn((injury_time) => {
    usePatientRecordsStore.setState({
      ...initialState,
      activePatient: {
        ...initialState.activePatient,
        incident_information: {
          ...initialState.activePatient.incident_information,
          injury_time,
        },
      },
    } as any);
  });
  const setDate = jest.fn((date) => {
    usePatientRecordsStore.setState({
      ...initialState,
      activePatient: {
        ...initialState.activePatient,
        incident_information: {
          ...initialState.activePatient.incident_information,
          date,
        },
      },
    } as any);
  });
  let initialPersonalInformation = {
    full_name: null,
    idf_id: null,
    patientId: "patientId",
  };
  let incidentInformation = {
    care_time: 1700853784687,
    injury_time: 1700853784687,
    date: 1700853784687,
  };

  let initialState = {
    activePatient: {
      personal_information: initialPersonalInformation,
      incident_information: incidentInformation,
    },
    personal_information_handlers: {
      setFullName,
      setIdf,
    },
    incident_information_handlers: {
      setCareTime,
      setTime,
      setDate,
    },
  };
  usePatientRecordsStore.setState(initialState as any);

  beforeEach(() => {
    setFullName.mockClear();
    setIdf.mockClear();
    setCareTime.mockClear();
    setTime.mockClear();
    setDate.mockClear();

    initialPersonalInformation = {
      full_name: null,
      idf_id: null,
      patientId: "patientId",
    };
    incidentInformation = {
      care_time: 1700853784687,
      injury_time: 1700853784687,
      date: 1700853784687,
    };
    initialState = {
      personal_information_handlers: {
        setFullName,
        setIdf,
      },
      incident_information_handlers: {
        setCareTime,
        setTime,
        setDate,
      },
      activePatient: {
        personal_information: initialPersonalInformation,
        incident_information: incidentInformation,
      },
    };
    usePatientRecordsStore.setState(initialState as any);
  });

  it("should update full name input value", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <PatientDetails />
      </PaperProvider>
    );

    const fullNameInput = getByTestId("patient-name-input");
    expect(fullNameInput.props.value).toBe(null);
    fireEvent.changeText(fullNameInput, "new name");
    act(() => {
      expect(setFullName).toHaveBeenCalledWith("new name");
    });
    await waitFor(() => {
      expect(fullNameInput.props.value).toBe("new name");
    });
  });

  it("should update idf id input value and re render", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <PatientDetails />
      </PaperProvider>
    );

    const idfIdInput = getByTestId("idf-id-input");
    expect(idfIdInput.props.value).toBe(undefined);
    fireEvent.changeText(idfIdInput, "987654321");

    act(() => {
      expect(setIdf).toHaveBeenCalledWith(987654321);
    });
    await waitFor(() => {
      expect(idfIdInput.props.value).toBe("987654321");
    });
  });

  it("should update care-time  value and re render", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <PatientDetails />
      </PaperProvider>
    );

    console.log(new Date().getTime());
    const careTime = getByTestId("care-time-picker-view");
    expect(careTime).toHaveTextContent("21:23");

    act(() => {
      fireEvent.press(careTime);
    });
    const picker = getByTestId("care-time-picker");
    act(() => {
      fireEvent(picker, "change", {
        nativeEvent: { timestamp: 1700853395033, utcOffset: 1 },
      });
    });

    expect(setCareTime).toHaveBeenLastCalledWith(1700853395034);
    await waitFor(() => {
      expect(careTime).toHaveTextContent("21:16");
    });
  });
  it("should update injury_time  value and re render", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <PatientDetails />
      </PaperProvider>
    );

    const injury_time = getByTestId("injury-time-picker-view");
    expect(injury_time).toHaveTextContent("21:23");

    act(() => {
      fireEvent.press(injury_time);
    });
    const picker = getByTestId("injury-time-picker");
    act(() => {
      fireEvent(picker, "change", {
        nativeEvent: { timestamp: 1700853395033, utcOffset: 1 },
      });
    });

    expect(setTime).toHaveBeenLastCalledWith(1700853395034);
    await waitFor(() => {
      expect(injury_time).toHaveTextContent("21:16");
    });
  });
  it("should update date value and re render", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <PatientDetails />
      </PaperProvider>
    );

    const injury = getByTestId("injury-date-view");
    expect(injury).toHaveTextContent("24/11/23");

    act(() => {
      fireEvent.press(injury);
    });
    const picker = getByTestId("injury-date-picker");
    act(() => {
      fireEvent(picker, "change", {
        nativeEvent: { timestamp: 1700853395033, utcOffset: 1 },
      });
    });

    expect(setDate).toHaveBeenLastCalledWith(1700853395033);
    await waitFor(() => {
      expect(injury).toHaveTextContent("24/11/23");
    });
  });
});
