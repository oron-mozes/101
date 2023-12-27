import { useEffect, useMemo, useState } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";
import { useTranslation } from "../../hooks/useMyTranslation";
import { useNfc } from "../../hooks/useNfc";
import { IPatientRecord } from "../../interfaces";
import { inputHeight } from "../../shared-config";
import { useStationStore } from "../../store/station.store";
import { createPDFWithImage } from "../../utils/create-pdf";
import { reportAPatient } from "./utils";
import { usePatientRecordsStore } from "../../store/patients.record.store";
import env from "../taagad/env.json";
interface PatientRecordWithPdf extends IPatientRecord {
  base64: string;
}

enum STATUS {
  Idle = "idle",
  Receiving = "receiving",
  Analyzing = "analyzing",
  Sending = "sending",
  Completed = "completed",
  Closed = "closed",
  Error = "error",
}
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013",
};
export function YakarScreen() {
  const translation = useTranslation();
  const { readTag, close } = useNfc();
  const station = useStationStore((state) => ({ ...state.station }));
  const addPatient = usePatientRecordsStore((state) => state.addPatient);
  const [patients, setPatients] = useState<IPatientRecord[]>([]);
  const [patientsReadyForSend, setPatientsReadyForSend] = useState<
    PatientRecordWithPdf[]
  >([]);
  const [status, setStatus] = useState<STATUS>(STATUS.Closed);
  const [results, setResults] = useState<{ patientId: string; status }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  useEffect(() => {
    if (Boolean(errorMessage.length)) {
      setTimeout(() => {
        setErrorMessage([]);
      }, 15000);
    }
  }, [errorMessage]);
  useEffect(() => {
    patients.length !== 0 && setStatus(STATUS.Analyzing);
    Promise.all(
      patients.map(async (p): Promise<PatientRecordWithPdf> => {
        const base64 = ""; //await createPDFWithImage(p);

        return { ...p, base64 };
      })
    ).then(setPatientsReadyForSend);
    return () => {};
  }, [patients]);

  const reportAction = reportAPatient(station);
  const reportTestAction = reportAPatient({
    ...station,
    API: env.TEST_API,
    TOKEN: env.TOKEN,
  });
  const [inSendingMode, setInSendingMode] = useState<Set<string>>(new Set([]));

  const send = async (sendPatients) => {
    const data = await Promise.allSettled(sendPatients.map(reportAction));

    const errors = data
      .filter((d) => d.status === "rejected")
      .map((d) => (d as PromiseRejectedResult).reason)
      .flatMap((data) => {
        return JSON.parse(data.message).detail.map((err) =>
          JSON.stringify(err)
        );
      });
    setErrorMessage(errors);
    setStatus(STATUS.Completed);
    setResults(
      data.map((d, index) => ({
        patientId: patientsReadyForSend[index].personal_information.patientId,
        status: d.status,
      }))
    );
  };

  useEffect(() => {
    patientsReadyForSend.length !== 0 && send(patientsReadyForSend);
  }, [patientsReadyForSend]);

  const doneScanning = () => {
    setResults([]);
    setStatus(STATUS.Closed);
    close();
  };
  const labels = useMemo(
    () =>
      Object.values(STATUS)
        .filter((s) => ![STATUS.Closed, STATUS.Error].includes(s))
        .map((s) => translation(s)),
    []
  );

  const reset = () => {
    doneScanning();
    setPatients([]);
    setPatientsReadyForSend([]);
  };

  const resend = async (patient, index) => {
    inSendingMode.add(patient.personal_information.patientId);
    setInSendingMode(new Set([...inSendingMode]));
    try {
      setErrorMessage([]);
      const data = await reportAction(patient);
      inSendingMode.delete(patient.personal_information.patientId);
      setInSendingMode(new Set([...inSendingMode]));
      setResults((results) => {
        const newResults = [...results];
        newResults[index].status = data.status;
        return newResults;
      });
    } catch (error) {
      setErrorMessage(
        JSON.parse(error.message).detail.map(
          (err) =>
            `${patient.personal_information.patientId}:${JSON.stringify(err)}`
        )
      );
      inSendingMode.delete(patient.personal_information.patientId);
      setInSendingMode(new Set([...inSendingMode]));
    }
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100 + (STATUS.Closed === status ? 40 : 0),
      }}
    >
      {STATUS.Closed !== status && (
        <View style={{ width: "100%", marginBottom: 40 }}>
          <StepIndicator
            stepCount={labels.length}
            customStyles={customStyles}
            currentPosition={labels.indexOf(translation(status))}
            labels={labels}
          />
        </View>
      )}
      <Text variant="headlineMedium">{translation("receiveANewPatient")} </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {STATUS.Closed === status && (
          <Button
            mode="contained"
            icon="nfc"
            contentStyle={{ width: 200, height: inputHeight }}
            onPress={() => {
              setStatus(STATUS.Idle);
              try {
                readTag((parsedData) => {
                  setStatus(STATUS.Receiving);
                  setPatients(parsedData.records);
                  close();
                });
              } catch (error) {}
            }}
          >
            {translation("startScan")}
          </Button>
        )}
        {STATUS.Closed !== status && results.length === 0 && (
          <Button
            style={{ width: 200, height: inputHeight }}
            contentStyle={{ borderColor: "red", borderWidth: 1 }}
            labelStyle={{ color: "red" }}
            onPress={doneScanning}
          >
            {translation("cancel")}
          </Button>
        )}
      </View>
      {[STATUS.Completed, STATUS.Error].includes(status) && (
        <View style={{ padding: 10, width: "100%" }}>
          <DataTable style={{ width: "100%" }}>
            <DataTable.Header>
              <DataTable.Title>{translation("choose")}</DataTable.Title>
              <DataTable.Title>{translation("systemStatus")}</DataTable.Title>
              <DataTable.Title>{translation("patientName")}</DataTable.Title>
            </DataTable.Header>
            <ScrollView style={{ padding: 10, width: "100%" }}>
              {results.map(({ status }, index) => {
                const patient = patientsReadyForSend[index];
                if (status !== "fulfilled") {
                  addPatient(patient);
                }
                return (
                  <DataTable.Row
                    key={index}
                    style={{ padding: 10, width: "100%" }}
                  >
                    <DataTable.Cell>
                      {translation("patientCount", {
                        count: (index + 1).toString(),
                      })}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text
                        style={{
                          borderColor:
                            status === "fulfilled" ? "#1AE5A1" : "#FFA299",
                          backgroundColor:
                            status === "fulfilled" ? "#D1FAEC" : "#FFD0CC",
                          borderWidth: 1,
                          padding: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                          borderRadius: 5,
                        }}
                      >
                        {translation("transferStatus", {
                          status: translation(status),
                        })}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {status !== "fulfilled" && (
                        <View>
                          <Button
                            style={{ marginBottom: 10 }}
                            mode="contained"
                            onPress={async () => {
                              resend(patient, index);
                            }}
                            icon={
                              inSendingMode.has(
                                patient.personal_information.patientId
                              )
                                ? "send-outline"
                                : "undo-variant"
                            }
                          >
                            {inSendingMode.has(
                              patient.personal_information.patientId
                            )
                              ? translation("sending")
                              : translation("reSend")}
                          </Button>
                          <Button
                            onPress={async () => {
                              resend(patient, index);
                            }}
                          >
                            {inSendingMode.has(
                              patient.personal_information.patientId
                            )
                              ? translation("sendingToDev")
                              : translation("reSendToDev")}
                          </Button>
                          {station.email_to && (
                            <Button
                              mode="outlined"
                              style={{ marginRight: 10, marginLeft: 10 }}
                              onPress={async () => {
                                const attachmentUrl = await createPDFWithImage(
                                  patients[index],
                                  true
                                );
                                const attachmentEncoded = await fetch(
                                  attachmentUrl
                                )
                                  .then((response) => response.blob())
                                  .then((blob) => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(blob);
                                    return new Promise((resolve) => {
                                      reader.onloadend = () =>
                                        resolve(reader.result);
                                    });
                                  });

                                const emailUrl = `mailto:${station.email_to}?subject=101 fallback method&body=Seems like we failed to send the information from: station number: ${station.unit_id}, station name: ${station.unit_name}. please see attached pdf!&attachment=${attachmentEncoded}`;

                                Linking.openURL(emailUrl);
                              }}
                              icon="email"
                            >
                              {translation("email")}
                            </Button>
                          )}
                        </View>
                      )}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Button style={{ width: "50%" }} mode="contained" onPress={reset}>
              {translation("done")}
            </Button>
          </View>
        </View>
      )}
      <View>
        {errorMessage.map((message) => (
          <Text key={message}>{message}</Text>
        ))}
      </View>
    </View>
  );
}

export default YakarScreen;

const styles = StyleSheet.create({
  [STATUS.Closed]: {
    backgroundColor: "transparend",
  },
  [STATUS.Idle]: {
    backgroundColor: "blue",
  },
  [STATUS.Receiving]: {
    backgroundColor: "lightblue",
  },
  [STATUS.Sending]: {
    backgroundColor: "lightgreen",
  },
  [STATUS.Analyzing]: {
    backgroundColor: "purple",
  },
  [STATUS.Completed]: {
    backgroundColor: "green",
  },
  [STATUS.Error]: {
    backgroundColor: "red",
  },
});
