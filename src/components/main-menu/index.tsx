import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Menu } from "react-native-paper";
import { useTranslation } from "../../hooks/useMyTranslation";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../routes";
import { StackNavigation } from "../../interfaces";

export default function MainMenu() {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const translation = useTranslation();
  const closeMenu = () => setVisible(false);
  const navigation = useNavigation<StackNavigation>();
  return (
    <View>
      <Menu
        style={styles.item}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} textColor="white">
            {translation("mainMenu")}
          </Button>
        }
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item
          onPress={() => {
            navigation.navigate(ROUTES.ACCOUNT);
            closeMenu();
          }}
          title={translation("accountTitle")}
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {},
  item: {},
});
