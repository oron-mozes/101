import { StyleSheet, View } from "react-native";
import { InputField } from "../../../form-components/input-field";
import { ROUTES } from "../../../routes";
import { Button, Text, ToggleButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { StackNavigation } from "../../../interfaces";
import { useStationStore } from "../../../store/station.store";
import { useEffect, useState } from "react";
import env from "../env.json";
import { colors, inputFontSize } from "../../../shared-config";

export function YakarForm({
  isYakar,
  setIsYakar,
}: {
  setIsYakar(flag: boolean): void;
  isYakar: boolean;
}) {
  const updateStationName = useStationStore((state) => state.updateStationName);
  const updateStationId = useStationStore((state) => state.updateStationId);
  const setIsSet = useStationStore((state) => state.setIsSet);
  const setAsYakar = useStationStore((state) => state.setAsYakar);
  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();
  const station = useStationStore((state) => state.station);
  const [stationName, setStationName] = useState<string>(station.unit_name);
  const [stationId, setStationId] = useState<number>(station.unit_id);
  const [passcode, setPasscode] = useState<string>("");
  const [secret, toggleSecret] = useState<boolean>(true);
  const canEdit = station.isYakar ? env.PASSCODE === passcode : true;
  useEffect(() => {
    setPasscode("");
  }, []);
  return (
    <>
      {!station.is_set && (
        <View
          style={[
            styles.container,
            { justifyContent: "flex-start", width: "100%" },
          ]}
        >
          <Text
            style={{
              marginRight: 5,
              fontSize: inputFontSize,
            }}
          >
            {translation("yakar")}
          </Text>
          <ToggleButton
            disabled={!canEdit}
            size={35}
            iconColor={isYakar ? "#14B881" : colors.disabled}
            icon={
              isYakar ? "toggle-switch-outline" : "toggle-switch-off-outline"
            }
            value="bluetooth"
            status={isYakar ? "checked" : "unchecked"}
            onPress={() => setIsYakar(!isYakar)}
          />
        </View>
      )}
      {isYakar && (
        <>
          <View style={{ width: "100%" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <InputField
                secureTextEntry={secret}
                label={translation("passcode")}
                value={passcode}
                onChange={(pass: string) => {
                  setPasscode(pass);
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
            </View>
            <InputField
              editable={canEdit}
              label={translation("idfUnit")}
              value={stationName}
              onChange={(unit_name: string) => {
                setStationName(unit_name);
              }}
            />
            <InputField
              editable={canEdit}
              label={translation("stationId")}
              value={stationId?.toString()}
              onChange={(unit_id: string) => {
                setStationId(Number(unit_id));
              }}
            />
          </View>
          <View
            style={{
              alignItems: "flex-end",
              marginTop: 40,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{ width: 165 }}
              onPress={async () => {
                navigation.navigate(ROUTES.YAKAR);
              }}
            >
              {translation("back")}
            </Button>
            <Button
              mode="contained"
              icon="check"
              style={{ width: 165 }}
              disabled={!canEdit}
              onPress={async () => {
                await Promise.all([
                  updateStationName(stationName),
                  updateStationId(stationId),
                  setAsYakar(true),
                  setIsSet(true),
                ]);
                navigation.navigate(ROUTES.YAKAR);
              }}
            >
              {translation("saveAndContinue")}
            </Button>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
});
