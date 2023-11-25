import "@testing-library/jest-native/extend-expect";
import { fireEvent, render } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import DSection from ".";
import {
  EReactionEyes,
  EReactionGeneral,
  EReactionMovement,
  EReactionSpeech,
} from "../../../../../../interfaces";
import { theme } from "../../../../../../shared-config";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
describe("D Section", () => {
  const setGCS = jest.fn();
  const toggleGeneral = jest.fn();
  const setMovement = jest.fn();
  const setSpeech = jest.fn();
  const setEyes = jest.fn();
  beforeEach(() => {
    setGCS.mockClear();
    toggleGeneral.mockClear();
    setMovement.mockClear();
    setSpeech.mockClear();
    setEyes.mockClear();
    usePatientRecordsStore.setState({
      reaction_handlers: {
        setGCS,
        toggleGeneral,
        setMovement,
        setSpeech,
        setEyes,
      },
      activePatient: {
        reaction: {
          GCS: null,
          general: [],
          speech: null,
          movement: null,
          eyes: null,
        },
      } as any,
    });
  });
  it("should call setGCS on load", async () => {
    render(
      <PaperProvider theme={theme}>
        <DSection />
      </PaperProvider>
    );

    expect(setGCS).toHaveBeenCalledWith(0);
  });
  it("should call toggleGeneral with EReactionGeneral.NON_SENSORY on press", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <DSection />
      </PaperProvider>
    );
    const sensory = getByTestId(
      `reaction-general-${EReactionGeneral.NON_SENSORY}-radio-button`
    );
    fireEvent.press(sensory);
    expect(toggleGeneral).toHaveBeenCalledWith(EReactionGeneral.NON_SENSORY);
  });
  it("should call setMovement", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <DSection />
      </PaperProvider>
    );
    const movement = getByTestId(
      `reaction-movement-${EReactionMovement.BENDING}-check-button`
    );
    fireEvent.press(movement);
    expect(setMovement).toHaveBeenCalledWith(EReactionMovement.BENDING);
  });
  it("should call setSpeech", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <DSection />
      </PaperProvider>
    );
    const speech = getByTestId(
      `reaction-speech-${EReactionSpeech.CONFUSED}-check-button`
    );
    fireEvent.press(speech);
    expect(setSpeech).toHaveBeenCalledWith(EReactionSpeech.CONFUSED);
  });
  it("should call setEyes", () => {
    const { getByTestId } = render(
      <PaperProvider theme={theme}>
        <DSection />
      </PaperProvider>
    );
    const eyes = getByTestId(
      `reaction-eyes-${EReactionEyes.NONE}-check-button`
    );
    fireEvent.press(eyes);
    expect(setEyes).toHaveBeenCalledWith(EReactionEyes.NONE);
  });
});
