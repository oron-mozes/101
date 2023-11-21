jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("react-native-vision-camera", () => ({
  useCameraPermission() {
    return {
      hasPermission: true,
      requestPermission() {},
    };
  },
}));

jest.mock("expo-print", () => ({
  useCameraPermission() {
    return {
      printToFileAsync() {
        return { url: "" };
      },
    };
  },
}));
jest.mock("expo-sharing", () => {
  return Promise.resolve();
});
jest.mock("react-native-nfc-manager", () => {
  return Promise.resolve();
});
jest.mock("react-native-nfc-manager", () => {
  return {
    NfcManager: {
      start: jest.fn(),
      requestTechnology: jest.fn(),
      getTag: jest.fn(),
      cancelTechnologyRequest: jest.fn(),
      unregisterTagEvent: jest.fn(),
      stop: jest.fn(),
    },
    NfcTech: {
      Ndef: "Ndef",
    },
  };
});

jest.mock("dorch-hce", () => {
  return {
    NFCTagType4NDEFContentType: {
      text: "text",
    },
    NFCTagType4() {},
    HCESession() {
      return {
        getInstance() {
          return Promise.resolve({
            setApplication() {},
            setEnabled() {},
            on() {},
          });
        },
      };
    },
  };
});
import "@testing-library/jest-native/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { GlobalActions } from "./global-actions";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import { useStationStore } from "../../store/station.store";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { theme } from "../../../App";
import locales from "../../../locales/he.json";

describe("Station Global action", () => {
  const deletePatients = jest.fn();
  const hardStationReset = jest.fn();
  beforeEach(() => {
    deletePatients.mockReset();
    hardStationReset.mockReset();
    usePatientRecordsStore.setState({ deletePatients });
    useStationStore.setState({ hardStationReset });
  });
  it("it toggle delete station", async () => {
    render(
      <PaperProvider theme={theme}>
        <GlobalActions />
      </PaperProvider>
    );

    fireEvent.press(screen.getByTestId("delete-station"));
    const dialogTitle = await screen.findByTestId(
      "delete-station-dialog-title"
    );
    expect(dialogTitle).toHaveTextContent(locales.deleteStationTitle);
  });
});
