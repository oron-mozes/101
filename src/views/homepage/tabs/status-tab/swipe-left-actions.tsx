import { RectButton } from "react-native-gesture-handler";
import { Animated, StyleSheet, Alert } from "react-native";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { usePatientRecordsStore } from "../../../../store/patients.record.store";
import { BodyPicker } from "../../../../components/body-picker";
import { generateXLSX } from "../../../../utils/export-to-xlsx";
import { useRef, useState } from "react";
import { createPDFWithImage } from "../../../../utils/create-pdf";

export function RenderLeftActions({
  progressAnimatedValue,
  dragX,
  swipeable,
  patient,
}) {
  const scale = dragX.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const deletePatient = usePatientRecordsStore((state) => state.deletePatient);
  const image = usePatientRecordsStore(
    (state) => state.injuriesImage?.[patient.id]
  );

  const translation = useTranslation();
  const confirmDelete = () => {
    Alert.alert(
      "מחיקת תיק רפואי",
      "הינכם עומדים למחוק תיק רפואי. אנא וודאו שהעברתם את התיק למכשיר אחר או שייצאתם את הפרטים לפני כן.",
      [
        {
          text: "ביטול",
          style: "cancel",
        },
        {
          text: "אני מאשר.ת",
          onPress: () => {
            deletePatient(patient.id);
          },
        },
      ]
    );
  };
  return (
    <>
      <RectButton
        style={{ width: 200, flexDirection: "row" }}
        onPress={this.close}
      >
        <Animated.Text
          style={[
            { backgroundColor: "pink" },
            {
              transform: [{ translateX: scale }],
            },
            styles.item,
          ]}
          onPress={() => {
            createPDFWithImage(image, patient);
          }}
        >
          {translation("exportRecord")}
        </Animated.Text>
        <Animated.Text
          style={[
            { backgroundColor: "green" },
            {
              transform: [{ translateX: scale }],
            },
            styles.item,
          ]}
          onPress={confirmDelete}
        >
          {translation("deleteRecord")}
        </Animated.Text>
      </RectButton>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    textAlign: "center",
    verticalAlign: "middle",
  },
});
