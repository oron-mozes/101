import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { QrIcon } from "../../../../components/qr-icon/qr";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { colors } from "../../../../shared-config";

export function TableActions({ active }: { active: boolean }) {
  const [checked, setChecked] = useState(false);
  const [enabled, setEnabled] = useState(active);
  useEffect(() => {
    setEnabled(checked || active);
  }, [checked, active]);
  const translation = useTranslation();
  const quickLinks = [
    {
      label: translation("nfcTransfer"),
      role: "nfc",
    },
    {
      role: "qr",
      label: translation("qrTransfer"),
    },
    {
      label: translation("deletePatient"),
      role: "delete",
    },
  ];

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        height: 52,
        alignItems: "center",
        padding: 10,
        marginTop: 10,
      }}
    >
      <View style={[styles.item, { flex: 0.5, paddingRight: 10 }]}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text
          testID="table-action-all"
          style={[styles.text, { borderRightWidth: 0 }]}
        >
          {translation("all")}
        </Text>
      </View>
      {quickLinks.map((link, index) => {
        return (
          <View
            key={index}
            style={[
              styles.item,
              index === quickLinks.length - 1 ? { borderRightWidth: 0 } : {},
            ]}
          >
            {link.role === "qr" && (
              <QrIcon color={enabled ? colors.primary : colors.disabled} />
            )}

            <Text
              testID={`table-action-${index}`}
              style={[
                styles.text,
                { color: enabled ? colors.primary : colors.disabled },
              ]}
            >
              {link.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    height: "100%",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    marginLeft: 4,
  },
});
