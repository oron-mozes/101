import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import { useNfc } from "../../hooks/useNfc";
import { IPatientRecord } from "../../interfaces";
import { useStationStore } from "../../store/station.store";
import { createPDFWithImage } from "../../utils/create-pdf";
import env from "../taagad/env.json";
import { useTranslation } from "../../hooks/useMyTranslation";
import { colors, inputHeight } from "../../shared-config";
import StepIndicator from "react-native-step-indicator";
import { reportAPatient } from "./utils";
import axios from "axios";

interface PatientRecordWithPdf extends IPatientRecord {
  pdf: string;
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
  const station = useStationStore((state) => state.station);

  const [patients, setPatients] = useState<IPatientRecord[]>([]);
  const [patientsReadyForSend, setPatientsReadyForSend] = useState<
    PatientRecordWithPdf[]
  >([]);
  const [status, setStatus] = useState<STATUS>(STATUS.Closed);

  useEffect(() => {
    patients.length !== 0 && setStatus(STATUS.Analyzing);
    Promise.all(
      patients.map(async (p): Promise<PatientRecordWithPdf> => {
        const pdf = await createPDFWithImage(p);
        return { ...p, pdf };
      })
    ).then((data) => {
      setPatientsReadyForSend(data);
    });
  }, [patients]);

  const reportAction = reportAPatient(station);

  useEffect(() => {
    patientsReadyForSend.length !== 0 && setStatus(STATUS.Sending);
    patientsReadyForSend.length !== 0 && setStatus(STATUS.Sending);
    patientsReadyForSend.length !== 0 &&
      Promise.allSettled(patientsReadyForSend.map(reportAction))
        .then((data) => {
          setStatus(STATUS.Completed);
        })
        .catch(() => {
          setStatus(STATUS.Error);
        });
  }, [patientsReadyForSend]);

  const doneScanning = () => {
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
    setPatients([]);
    setPatientsReadyForSend([]);
  };
  console.log("CALLING TEST API");
  useEffect(() => {
    console.log("CALLING TEST API", env.TEST_API_DOCS);

    axios
      .get(env.TEST_API_DOCS, {
        headers: { Authorization: `Bearer ${env.TOKEN}` },
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log("FAIL", err);
      });
  }, []);

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
              readTag((parsedData) => {
                setStatus(STATUS.Receiving);
                setPatients(parsedData.records);
                close();
              });
            }}
          >
            {translation("startScan")}
          </Button>
        )}
        {STATUS.Closed !== status && (
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
        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>{translation("choose")}</DataTable.Title>
              <DataTable.Title>{translation("systemStatus")}</DataTable.Title>
              <DataTable.Title>{translation("patientName")}</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {[{}].map((patient, index) => {
                return (
                  <DataTable.Row key={index} style={{ padding: 10 }}>
                    <DataTable.Cell>
                      {translation("patientCount", {
                        count: (index + 1).toString(),
                      })}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text
                        style={{
                          borderColor: STATUS.Completed ? "#1AE5A1" : "#FFA299",
                          backgroundColor: STATUS.Completed
                            ? "#D1FAEC"
                            : "#FFD0CC",
                          borderWidth: 1,
                          padding: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                          borderRadius: 5,
                        }}
                      >
                        {translation("transferStatus", {
                          status: translation("pass"),
                        })}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Button icon="undo-variant">
                        {translation("reSend")}
                      </Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </ScrollView>
          </DataTable>
          <Button onPress={reset}>{translation("done")}</Button>
        </View>
      )}
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
