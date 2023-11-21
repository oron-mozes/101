import { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { InputField } from "../../form-components/input-field";
import { useTranslation } from "../../hooks/useMyTranslation";
import { ICareProvider } from "../../interfaces";
import { colors } from "../../shared-config";
import { useStationStore } from "../../store/station.store";
import { AddProvider } from "./add-provider";
import { GlobalActions } from "./global-actions";
import { SavedProvider } from "./partials/saved-provider";
import { StationHeader } from "./partials/station-header";

export const initialProviderState: ICareProvider = {
  full_name: null,
  idf_id: null,
  rank: null,
  unit_name: null,
  role: null,
};

export default function StationScreen() {
  const translation = useTranslation();
  const station = useStationStore((state) => state.station);
  const hardStationReset = useStationStore((state) => state.hardStationReset);
  const [stationName, setStationName] = useState<string>(station.unit_name);
  const [providers, setProviders] = useState<ICareProvider[]>(
    station.care_providers ?? []
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <StationHeader />
        <GlobalActions />
        <InputField
          editable={true}
          label={translation("idfUnit")}
          value={stationName}
          onChange={(unit_name: string) => {
            setStationName(unit_name);
          }}
        />
        <SavedProvider
          providers={providers}
          removeProvider={(id) =>
            setProviders(providers.filter((p) => p.idf_id !== id))
          }
        />
        <AddProvider
          addProvider={(provider: ICareProvider) => {
            setProviders([...providers, provider]);
          }}
        />
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
