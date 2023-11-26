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
        <View style={styles.content}>
          <InjuryType
            title={translation("injuryType")}
            onChange={(value) => {
              setSelected(value);
            }}
            options={[
              E_InjuryType.BURN,
              E_InjuryType.CUT,
              E_InjuryType.GUNSHOT,
              E_InjuryType.HIT,
            ]}
            selected={selected}
          />
        </View>
        <Divider style={{ marginTop: 10, marginBottom: 10, width: "100%" }} />

        <View style={styles.content}>
          <InjuryType
            title={translation("treatmentType")}
            onChange={(value) => {
              setSelected(value);
            }}
            options={[
              E_InjuryType.CG,
              E_InjuryType.TOUNIQUET,
              E_InjuryType.KATETER,
            ]}
            selected={selected}
          />
        </View>
        <View
          style={[
            styles.content,
            {
              height: 120,
              justifyContent: "flex-start",
              width: 100,
            },
          ]}
        >
          {[
            E_InjuryType.CG,
            E_InjuryType.TOUNIQUET,
            E_InjuryType.KATETER,
          ].includes(selected) && (
            <TimePicker
              value={time}
              label={translation("time")}
              onChange={(newTime: number) => {
                time !== newTime && setTime(newTime);
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
