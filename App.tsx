import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { useCameraPermission } from "react-native-vision-camera";
import { Logo101 } from "./src/components/left-menu/101-logo";
import MainMenu from "./src/components/main-menu";
import { useTranslation } from "./src/hooks/useMyTranslation";
import { RootStackParamList } from "./src/interfaces";
import { ROUTES } from "./src/routes";
import HomeScreen from "./src/views/homepage";
import { PatientForm } from "./src/views/patient";
import QrCode from "./src/views/qr-code";
import ReceivePatientScreen from "./src/views/recieve-patient";
import TaagadScreen from "./src/views/taagad";
import { colors } from "./src/shared-config";
const Stack = createNativeStackNavigator<RootStackParamList>();

export const theme = {
  // ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
};

export default function App() {
  const translation = useTranslation();
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);
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
            name={ROUTES.REPORT}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerLeft: () => <Logo101 />,
              title: "",
            }}
            component={PatientForm}
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
