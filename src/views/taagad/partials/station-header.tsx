import { Image, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { useTranslation } from "../../../hooks/useMyTranslation";
import * as Application from "expo-application";
import { useState } from "react";
import { useStationStore } from "../../../store/station.store";
import env from "../../taagad/env.json";
import { usePatientRecordsStore } from "../../../store/patients.record.store";
import { reportAPatient } from "../../yakar/utils";

export function StationHeader() {
  const translation = useTranslation();
  const [visible, setVisible] = useState(false);
  const station = useStationStore((state) => state.station);
  const patients = usePatientRecordsStore((state) => state.patients);
  const deletePatient = usePatientRecordsStore((state) => state.deletePatient);
  const setStationDetails = useStationStore((state) => state.setStationDetails);
  const [password, setPassword] = useState<string>("");
  const [apiUrl, setApiUrl] = useState<string>(station.API ?? env.TEST_API);
  const [apiToken, setApiToken] = useState<string>(station.TOKEN ?? env.TOKEN);
  const [fallbackEmail, setFallbackEmail] = useState<string>(station.email_to);
  const [secret, toggleSecret] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const reportAction = reportAPatient(station);
  const forceSendPatients = async () => {
    setMessage("sending...");
    await Promise.allSettled(patients.map(reportAction))
      .then((data) => {
        let successCount = 0;
        for (const rec in data) {
          const res = data[rec];
          if (res.status === "fulfilled") {
            successCount++;
            deletePatient(patients[rec].personal_information.patientId);
          }
        }
        setMessage(`${successCount} patients sent out of ${patients.length}`);
      })
      .catch(() => {
        setMessage("failed to send");
      });
  };
  return (
    <>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>{translation("station")}</Dialog.Title>
          <Dialog.Content>
            <Text>{translation("station")}</Text>

            {password !== env.PASSCODE && (
              <>
                <TextInput
                  secureTextEntry={secret}
                  label="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.nativeEvent.text);
                  }}
                />
                <Button
                  style={{ marginTop: 20 }}
                  icon={secret ? "eye" : "eye-off"}
                  onPress={() => {
                    toggleSecret(!secret);
                  }}
                >
                  {}
                </Button>
              </>
            )}
            {password === env.PASSCODE && (
              <>
                {patients.length > 0 && (
                  <View style={{ width: "50%", marginBottom: 40 }}>
                    <Button
                      mode="contained"
                      style={{ marginTop: 20 }}
                      onPress={() => {
                        forceSendPatients();
                      }}
                    >
                      {translation("exportPatients")}
                    </Button>
                    <Text>{message}</Text>
                  </View>
                )}
                <View>
                  <TextInput
                    label="API URL"
                    value={apiUrl}
                    onChange={(e) => {
                      setApiUrl(e.nativeEvent.text);
                    }}
                  />
                  <TextInput
                    label="API TOKEN"
                    value={apiToken}
                    onChange={(e) => {
                      setApiToken(e.nativeEvent.text);
                    }}
                  />
                  <TextInput
                    label="Fallback email to:"
                    value={fallbackEmail}
                    onChange={(e) => {
                      setFallbackEmail(e.nativeEvent.text);
                    }}
                  />
                  <Button
                    onPress={async () => {
                      await setStationDetails({
                        ...station,
                        API: apiUrl,
                        TOKEN: apiToken,
                        email_to: fallbackEmail,
                      });
                      setPassword(null);
                    }}
                  >
                    Save
                  </Button>
                </View>
              </>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
              }}
            >
              {translation("close")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Image source={require("./101-station.png")} width={114} />
      <Text variant="headlineSmall" style={[styles.title]}>
        {translation("station")}
      </Text>
      <Text
        variant="bodySmall"
        onPress={() => {
          setVisible(true);
        }}
      >
        {Application.nativeApplicationVersion}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
  },
});
