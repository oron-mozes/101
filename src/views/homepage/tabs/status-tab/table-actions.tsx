import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { colors } from "../../../../shared-config";
import { usePatientRecordsStore } from "../../../../store/patients.record.store";
import { useGlobalStore } from "../../../../store/global.store";
import { usePatientTransfer } from "../../../../hooks/usePatientTransfer";
import { useStationStore } from "../../../../store/station.store";
import { TDestination } from "../../../../store/nfc.store";
import { DialogWrapper } from "../../../../components/dialog";
import { DeviceSelectDialog } from "../../../../components/device-select";

export function TableActions() {
  const [checked, setChecked] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const patients = usePatientRecordsStore((state) => [...state.patients]);
  const translation = useTranslation();
  const { CommunicationIcon, transferPatient } = usePatientTransfer();
  const {
    station: { communicationMethod },
  } = useStationStore();

  const toggleDeleteBulkPatients = useGlobalStore(
    (state) => state.toggleDeleteBulkPatients
  );
  const performActionForPatients = useGlobalStore(
    (state) => state.performActionForPatients
  );
  const setPerformActionForPatients = useGlobalStore(
    (state) => state.setPerformActionForPatients
  );
  const [showDeviceSelectionModal, setShowDeviceSelectionModal] =
    useState<boolean>(false);

  useEffect(() => {
    setEnabled(performActionForPatients.length > 0);
    setChecked(
      patients.length && performActionForPatients.length === patients.length
    );
  }, [performActionForPatients]);

  const transferCallback = useCallback(
    (destination: TDestination) =>
      transferPatient({ patientsIds: performActionForPatients, destination }),
    [performActionForPatients]
  );

  const toggleDeviceTransfer = () =>
    setShowDeviceSelectionModal(!showDeviceSelectionModal);

  const quickLinks = [
    {
      label: translation("patientTransfer"),
      role: "transfer",
      action: toggleDeviceTransfer,
    },
    {
      label: translation("deletePatient"),
      role: "delete",
      action() {
        toggleDeleteBulkPatients();
      },
    },
  ];

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        height: 52,
        alignItems: "center",
        padding: 10,
        marginTop: 10,
      }}
    >
      <DeviceSelectDialog
        visible={showDeviceSelectionModal}
        title={"Select Device"}
        onClose={toggleDeviceTransfer}
        onSelect={transferCallback}
      />

      <View style={[styles.item, { flex: 0.5, paddingRight: 10 }]}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          disabled={!patients.length}
          onPress={() => {
            const toggled = !checked;
            setChecked(toggled);
            setPerformActionForPatients(
              toggled
                ? patients.map((p) => p.personal_information.patientId)
                : []
            );
          }}
        />
        <Text
          testID="table-action-all"
          style={[
            styles.text,
            { borderRightWidth: 0 },
            { color: patients.length ? colors.text : colors.disabled },
          ]}
        >
          {translation("all")}
        </Text>
      </View>
      {quickLinks.map((link, index) => {
        return (
          <View
            key={index}
            style={[
              styles.item,
              index === quickLinks.length - 1 ? { borderRightWidth: 0 } : {},
            ]}
          >
            {link.role === "transfer" && (
              <CommunicationIcon
                color={enabled ? colors.primary : colors.disabled}
                size={25}
              />
            )}

            <Text
              testID={`table-action-${index}`}
              disabled={!enabled}
              onPress={link.action}
              style={[
                styles.text,
                { color: enabled ? colors.primary : colors.disabled },
              ]}
            >
              {link.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    height: "100%",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    marginLeft: 4,
  },
});
