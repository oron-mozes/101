import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import { ROUTES, RootStackParamList } from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/views/homepage";
import MainMenu from "./src/views/main-menu";
import UserScreen from "./src/views/user";
import { PatientForm } from "./src/views/patient";
import { useEffect } from "react";
import { useCameraPermission } from "react-native-vision-camera";
import QrCode from "./src/views/qr-code";
import { useTranslation } from "./src/hooks/useMyTranslation";
import ReceivePatientScreen from "./src/views/recieve-patient";
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
              headerRight: (data) => {
                return <QrCode />;
              },
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
