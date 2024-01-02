import React from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { Divider, Text } from "react-native-paper";
import { IPatientRecord } from "../../../../interfaces";
import { colors, gutter, inputFontSize } from "../../../../shared-config";

export function QuickView({ patient }: { patient: IPatientRecord }) {
  const translation = useTranslation();
  return (
    <View style={{ margin: gutter * 2 }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={styles.title}>{translation("injuryReason")}</Text>
          <Text style={{ fontSize: inputFontSize }}>
            {patient.injuryReason.reasons.length !== 0
              ? patient.injuryReason.reasons
                  .map((reason) => translation(reason))
                  .join(", ")
              : translation("unknown")}
          </Text>
        </View>
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: colors.textInputBorderColor,
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={styles.title}>{translation("bloodPressureClean")}</Text>
          <Text style={{ fontSize: inputFontSize }}>
            {patient.measurements.bloodPressure ?? translation("unknown")}
          </Text>
        </View>
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: colors.textInputBorderColor,
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={styles.title}>{translation("puls")}</Text>
          <Text style={{ fontSize: inputFontSize }}>
            {patient.measurements.puls ?? translation("unknown")}
          </Text>
        </View>
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: colors.textInputBorderColor,
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={styles.title}>{translation("saturation")}</Text>
          <Text style={{ fontSize: inputFontSize }}>
            {patient.breathing.saturation?.toString() ?? translation("unknown")}
          </Text>
        </View>
      </View>
      <View style={{ margin: gutter, marginTop: 20 }}>
        <Text style={styles.title}>{translation("medicationsAndFluid")}</Text>
        <Text style={{ fontSize: inputFontSize }}>
          {patient.medicationsAndFluids.actions.length !== 0
            ? patient.medicationsAndFluids.actions
                .map(
                  (action) =>
                    `${
                      action.treatment && !action.type
                        ? translation(action.treatment)
                        : ""
                    } ${action.type ? translation(action.type) : ""} ${
                      action.dose ? translation(action.dose) : ""
                    } ${action.other ? action.other : ""}`
                )
                .join("   |   ")
            : ""}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
