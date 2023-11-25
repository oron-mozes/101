import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState, lazy } from "react";
import { I18nManager, StatusBar, StyleSheet, View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import { useCameraPermission } from "react-native-vision-camera";
import { Logo101 } from "./src/components/left-menu/101-logo";
import MainMenu from "./src/components/main-menu";
import { RootStackParamList } from "./src/interfaces";
import { ROUTES } from "./src/routes";
import { usePatientRecordsStore } from "./src/store/patients.record.store";
import { useStationStore } from "./src/store/station.store";
import { theme } from "./src/shared-config";
import { NfcDialogWrapper } from "./src/components/nfc-dialog/nfc-dialog";

const HomeScreen = lazy(() => import("./src/views/homepage"));
const QrCode = lazy(() => import("./src/views/qr-code"));
const ReceivePatientScreen = lazy(() => import("./src/views/recieve-patient"));
const StationScreen = lazy(() => import("./src/views/taagad"));
const DeleteDialog = lazy(() => import("./src/components/delete-dialog"));
const YakarScreen = lazy(() => import("./src/views/yakar"));

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const { loadInitialState, station } = useStationStore();
  const loadPatientsState = usePatientRecordsStore(
    (state) => state.loadPatientsState
  );

  const [appReady, toggleReady] = useState<boolean>(false);

  useEffect(() => {
    I18nManager.forceRTL(true);
    console.log(I18nManager.isRTL);
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
  console.log("APP RENDER!!");
  return (
    <PaperProvider theme={theme}>
      <NfcDialogWrapper />
      <DeleteDialog />
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={station.isYakar ? ROUTES.YAKAR : ROUTES.HOME}
        >
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
            name={ROUTES.YAKAR}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              title: "",
              headerRight: () => <MainMenu />,
              headerLeft: () => <Logo101 />,
            }}
            component={YakarScreen}
          />
          <Stack.Screen
            name={ROUTES.STATION}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerLeft: () => <Logo101 />,
              title: "",
            }}
            component={StationScreen}
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
