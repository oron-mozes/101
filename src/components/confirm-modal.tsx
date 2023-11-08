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
import { useTranslation } from "../hooks/useMyTranslation";
import { colors } from "../shared-config";

export function ConfirmModal({
  closeHandler,
  onConfirm,
}: {
  onConfirm(): void;
  closeHandler(): void;
}) {
  const translation = useTranslation();

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={closeHandler}
        contentContainerStyle={{
          padding: 20,
          alignItems: "center",
          backgroundColor: colors.textInputBG,
        }}
      >
        <View style={styles.content}>
          <Text>{translation("confirmMessage")}</Text>
        </View>
        <View>
          <Button onPress={onConfirm}>{translation("confirm")}</Button>
          <Button onPress={closeHandler}>{translation("close")}</Button>
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
