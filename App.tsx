import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useCameraPermission } from "react-native-vision-camera";
import { useTranslation } from "./src/hooks/useMyTranslation";
import { ROUTES, RootStackParamList } from "./src/routes";
import HomeScreen from "./src/views/homepage";
import MainMenu from "./src/views/main-menu";
import { PatientForm } from "./src/views/patient";
import ReceivePatientScreen from "./src/views/recieve-patient";
import UserScreen from "./src/views/user";
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
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTES.HOME}>
          <Stack.Screen
            name={ROUTES.HOME}
            options={{
              title: "",
              headerRight: () => <MainMenu />,
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name={ROUTES.ACCOUNT}
            options={{
              title: translation("accountTitle"),
            }}
            component={UserScreen}
          />
          <Stack.Screen
            name={ROUTES.IMPORT_PATIENT}
            options={{
              title: translation("importPatient"),
            }}
            component={ReceivePatientScreen}
          />
          <Stack.Screen
            name={ROUTES.REPORT}
            options={{
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
