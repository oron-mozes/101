import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Checkbox,
  Divider,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import { TimePicker } from "../../../form-components/time-picker";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { E_InjuryType } from "../../../interfaces";
import { colors } from "../../../shared-config";
import { InjuryType } from "./Injury-type";
import { usePatientRecordsStore } from "../../../store/patients.record.store";

export function InjuryModal({
  closeHandler,
  onChange,
}: {
  onChange(value): void;
  closeHandler(): void;
}) {
  const translation = useTranslation();
  const [data, setData] = useState<
    E_InjuryType.KATETER | E_InjuryType.CG | E_InjuryType.TOUNIQUET
  >();
  const [time, setTime] = useState<number>(new Date().getTime());
  const cleanInjuries = usePatientRecordsStore((state) => {
    return state.injuries_handlers.cleanInjuries;
  });
  const toggleValue = (
    value: E_InjuryType.KATETER | E_InjuryType.CG | E_InjuryType.TOUNIQUET
  ) => {
    data ? setData(null) : setData(value);
  };

  const onSave = () => {
    data &&
      onChange({
        data,
        time,
      });

    closeHandler();
  };
  useEffect(() => {
    return () => {
      cleanInjuries();
    };
  }, []);
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
          <InjuryType onChange={onChange} />
        </View>
        <Divider style={{ marginTop: 10, marginBottom: 10, width: "100%" }} />

        <View
          style={[
            styles.content,
            {
              height: 120,
              justifyContent: "flex-start",
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                status={
                  data === E_InjuryType.TOUNIQUET ? "checked" : "unchecked"
                }
                onPress={() => {
                  toggleValue(E_InjuryType.TOUNIQUET);
                }}
              />
              <Text>{translation("TH")}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                status={data === E_InjuryType.CG ? "checked" : "unchecked"}
                onPress={() => {
                  toggleValue(E_InjuryType.CG);
                }}
              />

              <Text>{translation("cg")}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                status={data === E_InjuryType.KATETER ? "checked" : "unchecked"}
                onPress={() => {
                  toggleValue(E_InjuryType.KATETER);
                }}
              />
              <Text>{translation("kateter")}</Text>
            </View>
          </View>
          {data && (
            <TimePicker
              value={time}
              label={translation("time")}
              onChange={(newTime: number) => {
                setTime(newTime);
              }}
            />
          )}
        </View>

        <View style={{ marginTop: 40 }}>
          <Button mode="contained" onPress={onSave}>
            {translation("save")}
          </Button>
        </View>
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
