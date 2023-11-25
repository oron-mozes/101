jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
import "@testing-library/jest-native/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "../../../shared-config";
import { usePatientRecordsStore } from "../../../store/patients.record.store";
import { useStationStore } from "../../../store/station.store";
import { StationGlobalActions } from "./global-actions";

describe("Station Global action", () => {
  const deletePatients = jest.fn();
  const hardStationReset = jest.fn();

  beforeEach(() => {
    deletePatients.mockClear();
    hardStationReset.mockClear();

    usePatientRecordsStore.setState({ deletePatients });
    useStationStore.setState({
      hardStationReset,
      station: { unit_name: "station", care_providers: [], is_yakar: false },
    });
  });
  it("it toggle delete station", async () => {
    render(
      <PaperProvider theme={theme}>
        <StationGlobalActions />
      </PaperProvider>
    );

    fireEvent.press(screen.getByTestId("delete-station"));
    // const dialogTitle = await screen.findByTestId(
    //   "delete-station-dialog-title"
    // );
    // expect(dialogTitle).toHaveTextContent(locales.deleteStationTitle);
    // fireEvent.press(screen.getByTestId("delete-station-dialog-confirm"));
    // expect(hardStationReset).toHaveBeenCalled();
    // expect(deletePatients).toHaveBeenCalled();
  });
});
