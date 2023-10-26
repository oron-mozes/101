import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { IPatientRecord } from "../patient";
import Context from "../patient/context";
import { useTranslation } from "../../hooks/useMyTranslation";
import storage, { STORAGE } from "../../../storage";

export default function QrCode() {
  const [visible, setVisible] = React.useState<boolean>(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const translation = useTranslation();

  return (
    <Context.Consumer>
      {({ patient }) => {
        return (
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <QRCode
                value={JSON.stringify({ patient })}
                logo={require("../../../assets/101.jpg")}
              />
            </Modal>
            {patient.id && (
              <Button style={{ marginTop: 30 }} onPress={showModal}>
                {translation("exportPatient")}
              </Button>
            )}
          </Portal>
        );
      }}
    </Context.Consumer>
  );
}

const styles = StyleSheet.create({});
