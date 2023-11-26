import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNfc } from "../../hooks/useNfc";
import { IPatientRecord } from "../../interfaces";
import { useStationStore } from "../../store/station.store";
import { createPDFWithImage } from "../../utils/create-pdf";
import env from "../taagad/env.json";

interface PatientRecordWithPdf extends IPatientRecord {
  pdf: string;
}

enum STATUS {
  Closed = "closed",
  Idle = "idle",
  Receiving = "receiving",
  Sending = "sending",
  Analyzing = "analyzing",
  Completed = "completed",
  Error = "error",
}

export function YakarScreen() {
  const { readTag, close } = useNfc();
  const station = useStationStore((state) => state.station);
  const [patients, setPatients] = useState<IPatientRecord[]>([]);
  const [patientsReadyForSend, setPatientsReadyForSend] = useState<
    PatientRecordWithPdf[]
  >([]);
  const [status, setStatus] = useState<STATUS>(STATUS.Closed);

  useEffect(() => {
    setStatus(STATUS.Analyzing);
    Promise.all(
      patients.map(async (p): Promise<PatientRecordWithPdf> => {
        const pdf = await createPDFWithImage(p);
        return { ...p, pdf };
      })
    ).then((data) => {
      setPatientsReadyForSend(data);
    });
  }, [patients]);

  useEffect(() => {
    setStatus(STATUS.Sending);
    Promise.allSettled(
      patientsReadyForSend.map((p) => {
        console.log("sending");
        fetch(env.TEST_API, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${env.TOKEN}`,
          },
          body: JSON.stringify({
            record_id: p.personal_information.patientId,
            hosp_code: station.unit_id,
            hosp_name: station.unit_name,
            patient_id: p.personal_information.idf_id,
            patient_name: p.personal_information.full_name,
            origin_station_name: p.personal_information.patientId
              .split("|")
              .pop(),
            last_station_name: "",
            pdf: p.pdf,
          }),
        });
      })
    )
      .then((data) => {
        setStatus(STATUS.Completed);
        console.log(data);
      })
      .catch(() => {
        setStatus(STATUS.Error);
      });
  }, [patientsReadyForSend]);
  return (
    <View>
      <Text>Yakar </Text>
      <View style={[styles[status], { width: 50, height: 50 }]}>
        <Text>sending</Text>
      </View>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Button
          mode="contained"
          style={{ flex: 1 }}
          onPress={() => {
            setStatus(STATUS.Idle);
            readTag((parsedData) => {
              setStatus(STATUS.Receiving);
              setPatients(parsedData.records);
              close();
            });
          }}
        >
          SCAN
        </Button>
        <Button
          style={{ flex: 1 }}
          onPress={() => {
            setStatus(STATUS.Closed);
            setPatients([]);
            setPatientsReadyForSend([]);
            close();
          }}
        >
          Close
        </Button>
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
