import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useCameraPermission } from "react-native-vision-camera";
import { useTranslation } from "./src/hooks/useMyTranslation";
import { ROUTES } from "./src/routes";
import HomeScreen from "./src/views/homepage";
import MainMenu from "./src/components/main-menu";
import { PatientForm } from "./src/views/patient";
import ReceivePatientScreen from "./src/views/recieve-patient";
import UserScreen from "./src/views/user";
import { RootStackParamList } from "./src/interfaces";
import { Logo101 } from "./src/components/101-logo";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const translation = useTranslation();
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);
  return (
    <PaperProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 107, 229, 1)"
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTES.HOME}>
          <Stack.Screen
            name={ROUTES.HOME}
            options={{
              headerStyle: {
                backgroundColor: "rgba(0, 107, 229, 1)",
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
                backgroundColor: "rgba(0, 107, 229, 1)",
              },
              headerLeft: () => <Logo101 />,
              title: translation("accountTitle"),
            }}
            component={UserScreen}
          />
          <Stack.Screen
            name={ROUTES.IMPORT_PATIENT}
            options={{
              headerStyle: {
                backgroundColor: "rgba(0, 107, 229, 1)",
              },
              headerLeft: () => <Logo101 />,
              title: translation("importPatient"),
            }}
            component={ReceivePatientScreen}
          />
          <Stack.Screen
            name={ROUTES.REPORT}
            options={{
              headerStyle: {
                backgroundColor: "rgba(0, 107, 229, 1)",
              },
              headerLeft: () => <Logo101 />,
              title: translation("addPatient"),
            }}
            component={PatientForm}
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
