import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Menu } from "react-native-paper";
import { useTranslation } from "../../hooks/useMyTranslation";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../routes";
import { ICareProvider, ITaagad, StackNavigation } from "../../interfaces";
import storage, { STORAGE } from "../../../storage";

export default function MainMenu() {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const translation = useTranslation();
  const closeMenu = () => setVisible(false);
  const navigation = useNavigation<StackNavigation>();
  const [careProviders, setCareProviders] = useState<{
    [key: string]: ICareProvider;
  }>({});
  const [selectedCareProvider, setSelectedCareProviders] =
    useState<ICareProvider>();
  storage
    .load({
      key: STORAGE.TAAGAD,
    })
    .then((data: ITaagad) => {
      setCareProviders(data.care_providers);
    })
    .catch(() => {});
  storage
    .load({
      key: STORAGE.USER,
    })
    .then((user: ICareProvider) => {
      setSelectedCareProviders(user);
    })
    .catch(() => {});
  return (
    <View>
      <Menu
        style={styles.item}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} textColor="white">
            {translation("mainMenu")} - {selectedCareProvider?.full_name}
          </Button>
        }
      >
        {Object.values(careProviders).map((careProvider) => (
          <Menu.Item
            disabled={careProvider.idf_id === selectedCareProvider?.idf_id}
            onPress={() => {
              storage.save({ key: STORAGE.USER, data: careProvider });
              navigation.navigate(ROUTES.HOME);
              closeMenu();
            }}
            title={`${careProvider.full_name}, ${careProvider.idf_id}`}
          />
        ))}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {},
  item: {},
});
