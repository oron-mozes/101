import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import storage, { STORAGE } from "../../../../../../storage";
import { DropDown } from "../../../../../form-components/dropdown";
import { SectionHeader } from "../../../../../form-components/section-header";
import { useTranslation } from "../../../../../hooks/useMyTranslation";
import { ICareProvider, ITaagad } from "../../../../../interfaces";
import Context from "../context";
import { design } from "./shared-style";
import { mergeData } from "./utils";
import { emptyPatient } from "..";

export function CareProvider() {
  const translation = useTranslation();
  const [providers, setProviders] = useState<{ [key: string]: ICareProvider }>(
    {}
  );
  useEffect(() => {
    storage
      .load({ key: STORAGE.TAAGAD })
      .then((data: ITaagad) => setProviders(data.care_providers))
      .catch(() => {});
  }, []);

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        const provider = mergeData(patient.provider, emptyPatient.provider);
        console.log("????", provider);
        return (
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              <SectionHeader label={translation("careProviderSection")} />
            </Card.Content>

            <Card.Content style={[styles.innerContent]}>
              <View style={{ flex: 1 }}>
                <DropDown
                  placeholder={translation("select")}
                  label={translation("careProviderName")}
                  initialValue={provider.idf_id.toString()}
                  onSelect={(value) => {
                    const setProvider = Object.values(providers).find(
                      (p) => p.idf_id.toString() === value.id
                    );
                    update({
                      provider: setProvider,
                    });
                  }}
                  options={Object.values(providers).map((provider) => ({
                    id: provider.idf_id.toString(),
                    title: `${provider.full_name}, ${provider.idf_id}`,
                  }))}
                />
              </View>
            </Card.Content>
          </Card>
        );
      }}
    </Context.Consumer>
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
