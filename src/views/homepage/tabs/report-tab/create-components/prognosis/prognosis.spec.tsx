import "@testing-library/jest-native/extend-expect";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../../../../../shared-config";
import { Prognosis } from "./prognosis";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("Prognosis", () => {
  const updatePrognosis = jest.fn();
  const removePrognosis = jest.fn();

  beforeEach(() => {
    updatePrognosis.mockClear();
    removePrognosis.mockClear();

    usePatientRecordsStore.setState({
      activePatient: {
        prognosis: [],
      } as any,
      updatePrognosis,
      removePrognosis,
    });
  });
  it("should have empty default state", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <Prognosis />
      </PaperProvider>
    );
    const input = getByTestId("prognosis-input");
    expect(getByTestId("add-prognosis-button").props["aria-disabled"]).toBe(
      true
    );
    fireEvent.changeText(input, "test");
    await waitFor(() => {
      expect(getByTestId("prognosis-input").props.value).toBe("test");
    });

    fireEvent.press(getByTestId("add-prognosis-cta"));
    expect(updatePrognosis).toHaveBeenCalledWith("test");
  });

  it("should render prognosis and remove it", async () => {
    usePatientRecordsStore.setState({
      activePatient: {
        prognosis: ["fake item here"],
      } as any,
      updatePrognosis,
      removePrognosis,
    });
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <Prognosis />
      </PaperProvider>
    );
    expect(getByTestId("prognosis-0-text")).toBeDefined();

    fireEvent.press(getByTestId("remove-prognosis-0"));
    expect(removePrognosis).toHaveBeenCalledWith(0);
  });
});
