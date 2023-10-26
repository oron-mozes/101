import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "react-native-vision-camera";
import { useCamera } from "./src/hooks/useCamera";

export default function App() {
  const { device } = useCamera();
  return (
    <View style={styles.container}>
      <Text>?Open up App.js tod start working on your app!</Text>
      <StatusBar style="auto" />
      {device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
