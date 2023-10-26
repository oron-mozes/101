import { useNavigation } from "@react-navigation/native";
import validateFormData from "@rjsf/core/lib/validate";
import { JSONSchema7 } from "json-schema";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import ReactNativeForm from "rjsf-native";
import storage, { STORAGE } from "../../../storage";
import { ROUTES, StackNavigation } from "../../routes";
import { useTranslation } from "../../hooks/useMyTranslation";

export const initialState = {
  fullName: null,
  idf_id: null,
  rank: null,
  unit: null,
  role: null,
  expertise: null,
};

export default function UserScreen() {
  const navigation = useNavigation<StackNavigation>();
  const translation = useTranslation();
  const [userDetails, setUserDetails] = useState(initialState);
  const [allowNavigation, toggleAllowNavigation] = useState<boolean>(
    Boolean(userDetails.fullName)
  );

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e: any) => {
        if (allowNavigation) {
          return;
        }

        e.preventDefault();
      }),
    [allowNavigation, userDetails, navigation]
  );
  useEffect(() => {
    storage
      .load({
        key: STORAGE.USER,
      })
      .then((data) => {
        setUserDetails(data);
        toggleAllowNavigation(true);
      })
      .catch(() => {
        setUserDetails(initialState);
      });
  }, []);

  const schema: JSONSchema7 = {
    type: "object",
    required: ["fullName", "idf_id", "rank", "unit", "role", "expertise"],
    properties: {
      fullName: {
        title: translation("name"),
        type: "string",
      },
      idf_id: {
        title: translation("idfId"),
        type: "number",
      },
      rank: {
        title: translation("rank"),
        type: "string",
      },
      unit: {
        title: translation("idfUnit"),
        type: "string",
      },
      role: {
        title: translation("position"),
        type: "string",
      },
      expertise: {
        title: translation("expertise"),
        type: "string",
      },
    },
  };
  const form = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ReactNativeForm
          ref={form}
          showErrorList={false}
          formData={userDetails}
          onChange={(data) => {
            const { errors } = validateFormData(data.formData, schema);
            toggleAllowNavigation(errors.length === 0);
            setUserDetails(data.formData);
          }}
          onError={() => {
            toggleAllowNavigation(false);
          }}
          schema={schema}
          onSubmit={(form) => {
            storage.save({
              key: STORAGE.USER,
              data: form.formData,
            });
            toggleAllowNavigation(true);

            navigation.navigate(ROUTES.HOME);
          }}
        >
          <Button
            title={translation("save")}
            onPress={() => {
              form.current?.submit();
            }}
          />
        </ReactNativeForm>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    direction: "rtl",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    width: "100%",
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
