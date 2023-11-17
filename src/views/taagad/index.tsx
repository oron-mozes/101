import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { ICareProvider } from "../../interfaces";
import { colors } from "../../shared-config";
import { AddProvider } from "./add-provider";
import { AddStation } from "./add-station";
import { SavedProvider } from "./saved-provider";
import { GlobalActions } from "./global-actions";

export const initialProviderState: ICareProvider = {
  full_name: null,
  idf_id: null,
  rank: null,
  unit_name: null,
  role: null,
};

export default function TaagadScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <AddStation />
        <Divider style={{ marginTop: 10, marginBottom: 10, width: "100%" }} />
        <SavedProvider />
        <AddProvider />
        <GlobalActions />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    backgroundColor: colors.surface,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
