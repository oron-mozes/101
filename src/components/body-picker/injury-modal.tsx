import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Checkbox,
  Divider,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import { textColor } from "../../form-components/shared-style";
import { TimePicker } from "../../form-components/time-picker";
import { useTranslation } from "../../hooks/useMyTranslation";
import { IInjuryInformation } from "../../interfaces";
import { colors } from "../../shared-config";

export function InjuryModal({
  closeHandler,
  onChange,
}: {
  onChange(value): void;
  closeHandler(): void;
}) {
  const translation = useTranslation();
  const [data, setData] = useState<"gunshot" | "hits" | "burn" | "cut">();
  const [touniquet, setTouniquet] = useState<boolean>(false);
  const [touniquet_time, setTouniquet_time] = useState<number>(
    new Date().getTime()
  );

  useEffect(() => {
    setTouniquet_time(new Date().getTime());
  }, []);
  const toggleValue = (value) => {
    data ? setData(null) : setData(value);
  };
  const shouldBeDisabled = (value) => {
    return !data ? false : data !== value;
  };
  const onSave = () => {
    const response: IInjuryInformation = {};
    if (touniquet) {
      response.touniquet = touniquet;
      response.touniquet_time = touniquet_time;
    }
    if (data) {
      response[data] = true;
    }
    onChange(response);
    closeHandler();
  };
  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={onSave}
        contentContainerStyle={{
          padding: 20,
          alignItems: "center",
          backgroundColor: colors.textInputBG,
        }}
      >
        <View style={styles.content}>
          <View
            style={{
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Text>{translation("injuryType")}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            <Button
              mode="contained"
              onPress={(e) => {
                toggleValue("burn");
              }}
              disabled={shouldBeDisabled("burn")}
              style={[styles.container, data === "burn" ? styles.checked : {}]}
              textColor={data === "burn" ? "#fff" : textColor}
            >
              {translation("burn")}
            </Button>
            <Button
              mode="contained"
              onPress={(e) => {
                toggleValue("cut");
              }}
              disabled={shouldBeDisabled("cut")}
              style={[styles.container, data === "cut" ? styles.checked : {}]}
              textColor={data === "cut" ? "#fff" : textColor}
            >
              {translation("cut")}
            </Button>
            <Button
              mode="contained"
              onPress={(e) => {
                toggleValue("hits");
              }}
              disabled={shouldBeDisabled("hits")}
              style={[styles.container, data === "hits" ? styles.checked : {}]}
              textColor={data === "hits" ? "#fff" : textColor}
            >
              {translation("hits")}
            </Button>
            <Button
              mode="contained"
              onPress={(e) => {
                toggleValue("gunshot");
              }}
              disabled={shouldBeDisabled("gunshot")}
              style={[
                styles.container,
                data === "gunshot" ? styles.checked : {},
              ]}
              textColor={data === "gunshot" ? "#fff" : textColor}
            >
              {translation("gunshots")}
            </Button>
          </View>
        </View>
        <Divider style={{ marginTop: 10, marginBottom: 10, width: "100%" }} />
        <View
          style={[
            styles.content,
            { justifyContent: "flex-start", alignItems: "flex-start" },
            touniquet ? { height: 120 } : {},
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              status={touniquet ? "checked" : "unchecked"}
              onPress={() => {
                setTouniquet(!touniquet);
              }}
            />
            <Text>{translation("TH")}</Text>
          </View>

          {touniquet && (
            <TimePicker
              editable={true}
              value={touniquet_time}
              label={translation("TH_time")}
              onChange={(touniquet_time: number) => {
                setTouniquet_time(touniquet_time);
              }}
            />
          )}
        </View>
        {(data || touniquet) && (
          <View>
            <Button mode="contained" onPress={onSave}>
              {translation("save")}
            </Button>
          </View>
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.textInputBG,
    width: "50%",
    height: 70,
    alignItems: "center",
    // alignContent: "flex-start",

    justifyContent: "center",
  },
  checked: {
    backgroundColor: colors.active,
    color: colors.textInputBG,
  },
  container: {
    backgroundColor: colors.radio,
    borderRadius: 20,
    margin: 4,
    height: 40,
  },
});
