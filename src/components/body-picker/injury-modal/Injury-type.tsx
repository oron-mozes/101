import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { textColor } from "../../../form-components/shared-style";
import { useTranslation } from "../../../hooks/useMyTranslation";
import { colors } from "../../../shared-config";
import { E_InjuryType } from "../../../interfaces";

export function InjuryType({ onChange }: { onChange(value): void }) {
  const translation = useTranslation();
  const [data, setData] = useState<E_InjuryType>();

  const toggleValue = (value) => {
    data ? setData(null) : setData(value);
  };
  const shouldBeDisabled = (value) => {
    return !data ? false : data !== value;
  };
  useEffect(() => {
    onChange({ data });
  }, [data]);
  return (
    <View>
      <View
        style={{
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Text>{translation("injuryType")}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}
      >
        {[
          E_InjuryType.BURN,
          E_InjuryType.CUT,
          E_InjuryType.HIT,
          E_InjuryType.GUNSHOT,
        ].map((value) => (
          <Button
            key={value}
            mode="contained"
            onPress={(e) => {
              toggleValue(value);
            }}
            disabled={shouldBeDisabled(value)}
            style={[styles.container, data === value ? styles.checked : {}]}
            textColor={data === value ? "#fff" : textColor}
          >
            {translation(value.toLowerCase())}
          </Button>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checked: {
    backgroundColor: colors.active,
    color: colors.textInputBG,
  },
  container: {
    backgroundColor: colors.radio,
    borderRadius: 20,
    margin: 4,
    height: 40,
  },
});
