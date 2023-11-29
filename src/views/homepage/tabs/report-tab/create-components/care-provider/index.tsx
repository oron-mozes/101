import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { DropDown } from "../../../../../../form-components/dropdown";
import { SectionHeader } from "../../../../../../form-components/section-header";
import { useTranslation } from "../../../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../../../store/patients.record.store";
import { useStationStore } from "../../../../../../store/station.store";
import { design } from "../shared-style";

export function CareProvider() {
  const translation = useTranslation();
  const careProviders = useStationStore(
    (state) => state.station.care_providers
  );
  const providers = usePatientRecordsStore(
    (state) => state.activePatient.providers ?? []
  );

  const handlers = usePatientRecordsStore((state) => state.provider_handlers);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <SectionHeader label={translation("careProviderSection")} />
      </Card.Content>

      <Card.Content style={[styles.innerContent]}>
        <View style={{ flex: 1 }}>
          <Text>{translation("careProviderName")}</Text>
          {providers.map(
            (provider) =>
              provider.full_name && (
                <Text
                  testID={`provider-${provider.idf_id}`}
                  style={{ marginTop: 10 }}
                  key={provider.idf_id}
                  variant="bodyLarge"
                >
                  {`${provider.full_name}, ${provider.idf_id} ${translation(
                    provider.role
                  )}`}
                </Text>
              )
          )}
          <View style={{ width: "50%" }}>
            <DropDown
              label={""}
              testID="provider-dropdown"
              onSelect={(value) => {
                const setProvider = Object.values(careProviders).find(
                  (p) => p.idf_id.toString() === value.id
                );

                handlers.addProvider(setProvider);
              }}
              options={Object.values(careProviders).map((provider) => {
                const title = translation(provider.role);
                return {
                  id: provider.idf_id.toString(),
                  title: `${provider.full_name}, ${provider.idf_id} ${title}`,
                };
              })}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
const styles = StyleSheet.create({
  signature: {
    height: 100,
    width: 100,
    flex: 1,
  },
  card: {
    ...design.card,
  },
  content: { ...design.content },
  innerContent: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
});

export default CareProvider;
