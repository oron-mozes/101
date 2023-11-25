import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import { useGlobalStore } from "../store/global.store";
import { colors } from "../shared-config";

const LoadingOverlay = () => {
  const loading = useGlobalStore((state) => state.loading);

  return (
    <Modal transparent={true} visible={loading}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingOverlay;
