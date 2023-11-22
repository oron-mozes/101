import { fireEvent, render, screen } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { PatientDetails } from "./patient-details";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("PatientDetails", () => {
  const setFullName = jest.fn();
  const setIdf = jest.fn();
  const setTime = jest.fn();
  const setCareTime = jest.fn();
  const setDate = jest.fn();

  beforeEach(() => {
    setFullName.mockClear();
    setIdf.mockClear();
    setTime.mockClear();
    setCareTime.mockClear();
    setDate.mockClear();

    usePatientRecordsStore.setState({
      activePatient: {
        personal_information: {
          full_name: "initial name",
          idf_id: 123456789,
        },
        incident_information: {
          care_time: 1700666781921,
          time: 1700666781921,
          date: 1700666781921,
        },
      },
      personal_information_handlers: {
        setFullName,
        setIdf,
      },
      incident_information_handlers: { setCareTime, setTime, setDate },
    } as any);
  });

  it("should update full name input value", async () => {
    render(
      <PaperProvider theme={theme}>
        <PatientDetails />
      </PaperProvider>
    );

    const fullNameInput = await screen.findByTestId("patient-name-input");
    fireEvent.changeText(fullNameInput, "new name");

    expect(setFullName).toHaveBeenCalledWith("new name");
  });

  it("should update idf id input value", async () => {
    render(
      <PaperProvider theme={theme}>
        <PatientDetails />
      </PaperProvider>
    );

    const idfIdInput = await screen.findByTestId("idf-id-input");
    fireEvent.changeText(idfIdInput, "987654321");

    expect(setIdf).toHaveBeenCalledWith(987654321);
  });
});
