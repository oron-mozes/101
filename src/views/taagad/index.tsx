import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { InputField } from "../../form-components/input-field";
import { useTranslation } from "../../hooks/useMyTranslation";
import { ICareProvider, StackNavigation } from "../../interfaces";
import { colors } from "../../shared-config";
import { useStationStore } from "../../store/station.store";
import { AddProvider } from "./add-provider";
import { StationGlobalActions } from "./partials/global-actions";
import { SavedProvider } from "./partials/saved-provider";
import { StationHeader } from "./partials/station-header";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Button, Icon, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../routes";
import { YakarForm } from "./partials/yakar-form";
import env from "../taagad/env.json";
import axios from "axios";

export const initialProviderState: ICareProvider = {
  full_name: null,
  idf_id: null,
  unit_name: null,
  role: null,
};

export function StationScreen() {
  const navigation = useNavigation<StackNavigation>();
  const translation = useTranslation();
  const station = useStationStore((state) => state.station);
  const addProviders = useStationStore((state) => state.addProviders);
  const updateStationName = useStationStore((state) => state.updateStationName);
  const setAsYakar = useStationStore((state) => state.setAsYakar);
  const setIsSet = useStationStore((state) => state.setIsSet);
  const [stationName, setStationName] = useState<string>(station.unit_name);
  const [providers, setProviders] = useState<ICareProvider[]>(
    station.care_providers ?? []
  );
  console.log(station.isYakar);
  const [newCareProvider, updateCareProvider] = useState<ICareProvider>(
    providers?.length === 0
      ? {
          ...initialProviderState,
        }
      : null
  );

  useEffect(() => {
    if (
      newCareProvider &&
      newCareProvider.full_name &&
      newCareProvider.idf_id &&
      newCareProvider.role
    ) {
      setProviders([...providers, newCareProvider]);
      updateCareProvider(null);
    }
  }, [newCareProvider]);

  useEffect(() => {
    setStationName(station.unit_name);
    setProviders(station.care_providers);
    station.care_providers?.length === 0 &&
      updateCareProvider({
        ...initialProviderState,
      });
  }, [station]);

  useEffect(() => {
    setAsYakar(station.isYakar);
  }, [station.isYakar]);

  const valid: boolean =
    (Boolean(stationName) && Boolean(providers?.length)) === true;

  const [isYakar, setIsYakar] = useState<boolean>(station.isYakar);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <StationHeader />
          <StationGlobalActions />
          {((station.is_set && isYakar) || !station.is_set) && (
            <YakarForm isYakar={isYakar} setIsYakar={setIsYakar} />
          )}
          {!isYakar && (
            <>
              <View style={{ width: "100%" }}>
                <InputField
                  editable={true}
                  label={translation("idfUnit")}
                  value={stationName}
                  onChange={(unit_name: string) => {
                    setStationName(unit_name);
                  }}
                />
              </View>
              {providers.map((provider) => (
                <SavedProvider
                  key={provider.idf_id}
                  provider={provider}
                  removeProvider={(id) =>
                    setProviders(providers.filter((p) => p.idf_id !== id))
                  }
                />
              ))}
              {newCareProvider && (
                <AddProvider
                  newCareProvider={newCareProvider}
                  updateCareProvider={updateCareProvider}
                />
              )}
              <View
                style={{
                  width: "100%",
                  marginTop: 30,
                  paddingLeft: 10,
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    !newCareProvider &&
                      updateCareProvider({ ...initialProviderState });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: 130,
                    }}
                  >
                    <Icon
                      source="plus"
                      color={
                        !newCareProvider ? colors.primary : colors.disabled
                      }
                      size={20}
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        marginLeft: 10,
                        color: !newCareProvider
                          ? colors.primary
                          : colors.disabled,
                      }}
                    >
                      {translation("addCareProvider")}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={{ alignItems: "flex-end", marginTop: 40 }}>
                  <Button
                    mode="contained"
                    icon="check"
                    style={{ width: 165 }}
                    disabled={!valid}
                    onPress={async () => {
                      await Promise.all([
                        updateStationName(stationName),
                        setAsYakar(false),
                        setIsSet(true),
                      ]);
                      await addProviders(
                        providers.map((provider) => ({
                          ...provider,
                          unit_name: station.unit_name,
                        }))
                      );

                      navigation.navigate(ROUTES.HOME);
                    }}
                  >
                    {translation("saveAndContinue")}
                  </Button>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </GestureHandlerRootView>
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

export default StationScreen;
