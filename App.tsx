import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { DefaultTheme, PaperProvider, Text } from "react-native-paper";
import { useCameraPermission } from "react-native-vision-camera";
import { Logo101 } from "./src/components/left-menu/101-logo";
import MainMenu from "./src/components/main-menu";
import { RootStackParamList } from "./src/interfaces";
import { ROUTES } from "./src/routes";
import { colors } from "./src/shared-config";
import { usePatientRecordsStore } from "./src/store/patients.record.store";
import { useTaggadStore } from "./src/store/taggad.store";
import HomeScreen from "./src/views/homepage";
import QrCode from "./src/views/qr-code";
import ReceivePatientScreen from "./src/views/recieve-patient";
import TaagadScreen from "./src/views/taagad";
const Stack = createNativeStackNavigator<RootStackParamList>();

export const theme = {
  // ...DefaultTheme,
  direction: "rtl",
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    background: "white",
  },
};

export default function App() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const { loadInitialState } = useTaggadStore();
  const loadPatientsState = usePatientRecordsStore(
    (state) => state.loadPatientsState
  );
  const [appReady, toggleReady] = useState<boolean>(false);

  // storage.remove({ key: STORAGE.PATIENTS_RECORD });
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    const load = async () => {
      await Promise.all([loadInitialState(), loadPatientsState()]);

      toggleReady(true);
    };
    load();
  }, []);
  if (!appReady) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTES.HOME}>
          <Stack.Screen
            name={ROUTES.HOME}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              title: "",

              headerRight: () => <MainMenu />,
              headerLeft: () => <Logo101 />,
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name={ROUTES.ACCOUNT}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerLeft: () => <Logo101 />,
              title: "",
            }}
            component={TaagadScreen}
          />
          <Stack.Screen
            name={ROUTES.IMPORT_PATIENT}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerLeft: () => <Logo101 />,
              title: "",
            }}
            component={ReceivePatientScreen}
          />
          <Stack.Screen
            name={ROUTES.EXPORT_PATIENT}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerLeft: () => <Logo101 />,
              title: "",
            }}
            component={QrCode}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
