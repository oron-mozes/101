import "@testing-library/jest-native/extend-expect";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import locale from "../../../../../../../locales/he.json";
import { EMeasurementsTreatments } from "../../../../../../interfaces";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { CareProvider } from "./care-provider";
import { useStationStore } from "../../../../../../store/station.store";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("CSection", () => {
  const addProvider = jest.fn();

  beforeEach(() => {
    addProvider.mockClear();

    useStationStore.setState({
      station: {
        care_providers: {
          1: {
            idf_id: 1,
            full_name: "test",
            role: "test",
          },
        },
      } as any,
    });

    usePatientRecordsStore.setState({
      activePatient: {
        providers: [],
      } as any,
      provider_handlers: {
        addProvider,
      },
    });
  });
  it("should add provider", async () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <CareProvider />
      </PaperProvider>
    );
    const provider = getByTestId("provider-dropdown-choose");
    act(() => {
      fireEvent.press(provider);
    });

    await waitFor(() => {
      fireEvent.press(getByTestId("provider-dropdown-option-1"));
    });
    expect(addProvider).toHaveBeenCalledWith({
      full_name: "test",
      idf_id: 1,
      role: "test",
    });
  });

  it("should render provider", async () => {
    usePatientRecordsStore.setState({
      activePatient: {
        providers: [
          {
            full_name: "test",
            idf_id: 1,
            role: "test",
          },
        ],
      } as any,
      provider_handlers: {
        addProvider,
      },
    });
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <CareProvider />
      </PaperProvider>
    );
    const provider = getByTestId("provider-1");
    expect(provider).toBeDefined();
  });
});
