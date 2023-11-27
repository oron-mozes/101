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

  const [time, setTime] = useState<number>(new Date().getTime());
  const [selected, setSelected] = useState<E_InjuryType>();
  const cleanInjuries = usePatientRecordsStore((state) => {
    return state.injuries_handlers.cleanInjuries;
  });

  const onSave = () => {
    selected &&
      onChange({
        data: selected,
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
        <View style={[styles.content, { width: "80%", height: 150 }]}>
          <InjuryType
            title={translation("injuryType")}
            onChange={(value) => {
              setSelected(value);
            }}
            options={Object.values(E_InjuryType)}
            selected={selected}
          />
        </View>

        {[
          E_InjuryType.CG,
          E_InjuryType.TOUNIQUET,
          E_InjuryType.KATETER,
        ].includes(selected) && (
          <View
            style={[
              styles.content,
              {
                height: 120,
                justifyContent: "space-between",
                flexDirection: "row",
                width: "80%",
              },
            ]}
          >
            <View style={{ width: 160, opacity: time === 0 ? 0.3 : 1 }}>
              <TimePicker
                value={time}
                editable={time !== 0}
                label={translation("time")}
                onChange={(newTime: number) => {
                  time !== newTime && setTime(newTime);
                }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                status={time === 0 ? "checked" : "unchecked"}
                onPress={() => {
                  setTime(time === 0 ? new Date().getTime() : 0);
                }}
              />
              <Text style={{ marginRight: 80 }}>
                {translation("unknownTime")}
              </Text>
            </View>
          </View>
        )}

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
