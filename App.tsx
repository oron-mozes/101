import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HCESessionProvider } from "dorch-hce";
import { useEffect, useState } from "react";
import {
  I18nManager,
  NativeEventEmitter,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { PaperProvider, Text } from "react-native-paper";

import DeleteDialog from "./src/components/delete-dialog";
import { Logo101 } from "./src/components/left-menu/101-logo";
import MainMenu from "./src/components/main-menu";
import { NfcDialogWrapper } from "./src/components/nfc-dialog/nfc-dialog";
import { RootStackParamList } from "./src/interfaces";
import { ROUTES } from "./src/routes";
import { theme } from "./src/shared-config";
import { usePatientRecordsStore } from "./src/store/patients.record.store";
import { useStationStore } from "./src/store/station.store";
import HomeScreen from "./src/views/homepage";
// import QrCode from "./src/views/qr-code";
// import ReceivePatientScreen from "./src/views/recieve-patient";
import StationScreen from "./src/views/taagad";
import YakarScreen from "./src/views/yakar";
import { NativeModules } from "react-native";
const { AndroidBeamReactNativeModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(
  NativeModules.AndroidBeamReactNativeModule
);

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { loadInitialState, station } = useStationStore();
  const loadPatientsState = usePatientRecordsStore(
    (state) => state.loadPatientsState
  );

  const [appReady, toggleReady] = useState<boolean>(false);
  const eventEmit = eventEmitter.addListener(
    "EventReminder",
    (message: string) => {
      console.log(message);
    }
  );
  useEffect(() => {
    console.log(AndroidBeamReactNativeModule.send("hello"));

    I18nManager.forceRTL(true);
    console.log(I18nManager.isRTL);

    const load = async () => {
      await Promise.all([loadInitialState(), loadPatientsState()]);

      toggleReady(true);
    };
    load();
    return () => {
      eventEmit.remove();
    };
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
      <HCESessionProvider />
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
          {/* <Stack.Screen
            name={ROUTES.IMPORT_PATIENT}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerLeft: () => <Logo101 />,
              title: "",
            }}
            component={ReceivePatientScreen}
          /> */}
          {/* <Stack.Screen
            name={ROUTES.EXPORT_PATIENT}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerLeft: () => <Logo101 />,
              title: "",
            }}
            component={QrCode}
          /> */}
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

/**
 * תפילת הרופא:
 * אֵל עֶלְיוֹן, טֶרֶם שֶׁאֲנִי מַתְחִיל בַּעֲבוֹדָתִי הַקְדוֹשָׁה לְרַפֵּא אֶת יְצוּרֵי כַּפֶּיךָ, אֲנִי מַפִּיל אֶת תְּחִינָתִי

לִפְנֵי כִּסֵא כְּבוֹדְךָ, שֶתִּתֵּן לִי אֹמֶץ רוּחַ וּמֶרֶץ רַב

לַעֲשׂוֹת אֶת עֲבוֹדָתִי בֶּאֱמוּנָה, וְשְׁהַשְׁאִיפָה לִצְבֹר הוֹן אוֹ

לְשֵׁם טוֹב לֹא תְּעַוִּר אֶת עֵינַי מִלִּרְאוֹת נְכוֹחָה.

אָדוֹן הֲעוֹלָמִים, גֲלוּי וְיָדוּעַ לכֹל בְּנֵי בְּרִיתֶךָ שְׁרָק אָתָה לֶבָד

הוּא מָעָנִישׁ וְמְחַנֶן, מָכֶּה וְמְרָפֶּא. בְּרָם בֶּחֹכְמָתְךָ אֵין

סוֹף רַצִיתָ שְׁאָנִי, עַבְדֶךָ הָאָבְיוֹן, בָּשָׂר וָדָם, עָפָר

וָאֶפֶר בִּיכֹלְתִי הָצָנוֹעַה וּבֶשִׂכְלִי הָקָטָן צָבָרְתִי יֶדָע עָל

גוּף הָאָדָם ועָל רוּחוֹ, שְׁאָתָה בְּרַחֲמֵיךָ הָגָדוֹלִים גִילִיתָ

בֶּעוֹלָמְךָ הָגָשְׁמִי. וְהִנֶה, אָנִי בְּפְּקֻדָתְךָ, בְּמִצְוָתְךָ

וּבְעֶזְרָתֶךָ מַתְחִיל לֶרָפֶּא יְצוּרֵי כַּפֶּיךָ בְּהָבָנָתִי

הָמְלֵיאָה שְׁרָק בִּימִינְךָ הָרָמָה וְהָנִשְׂאֶת הָהָחְלָטוֹת עָל

חָיִים וְעָל מָוֶת, עָל הָבְרָאָה וְעָל חוֹלִי, עָל הָצְלָחָתִי

בְּרִפּוּי הָחוֹלֶה וְעָל כִּשְׁלוֹנִי בְּעָבוֹדָתִי.

שוֹכֵן בִּמְרוֹמָיו, מֶלֶך חַי וְקַיָם, יְהִי רָצוֹן מִלֶפָנֵיךָ שֶתִתֶן לִי,

לֶעַבְדְךָ, לֶבֶּן אֲמָתֶךָ חֶפֶץ, כֹּח וֶיָכוֹלֶת שִׂכְלִית

לֶהַמְשִׁיךְ לִלְמוֹד רַפוּאָה בַּאֵין הָפְסָקָה לֶאוֹרֶךְ כֹּל חָיָי

מִפִי רוֹפְאִים נֶבוּנִים מִמֶנִי.

תְזַכֵּנִי לְהַבִּיט עַל כֹּל סוֹבֵל, הַבָּא לִשְׁאֹל בַּעֲצָתִי, כְּעַל אָדָם,

בְּלִי הֶבְדֵּל בֵּין עָשִׁיר וְעָנִי, יְדִיד וְשׂוֹנֵא, אִישׁ טוֹב

וְרַע, בַּצַר לוֹ הַרְאֵנִי רַק אֶת הָאָדָם, אַהֲבָתִי לְתּוֹרַת

הָרְפוּאָה תְּחַזֵּק אֶת רוּחִי, רַק הָאֶמֶת תִּהְיֶה נֵר לְרַגְלַי,

כִּי כֹל רִפְיוֹן בַּעֲבוֹדָתִי יָכוֹל לְהָבִיא כִּלָּיוֹן וּמַחֲלָה

לִיְצִיר כַּפֶּיךָ. אָנָא ה' רַחוּם וְחַנוּן, חַזְּקֵנִי וְאַמְּצֵּנִי

בְּגוּפִי וּבְנַפְשִׁי, וְרוּחַ שָלֵם תִּטַּע בְּקִרְבִּי.

בָּרוּך אַתָה, אָדוֹן כֹּל הֲמָעָשִׁים וּבוֹרֵא כֹּל הֲהָבְרָאוֹת[4].
 */
