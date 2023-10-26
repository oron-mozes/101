import { JSONSchema7 } from "json-schema";
import React from "react";
import ReactNativeForm from "rjsf-native";
import { useTranslation } from "../../../hooks/useMyTranslation";
import Context from "../context";
import { Text } from "react-native";

export function PersonalInformation() {
  const translation = useTranslation();

  const schema: JSONSchema7 = {
    type: "object",
    required: ["full_name", "idf_id"],
    properties: {
      full_name: {
        title: translation("name"),
        type: "string",
      },
      idf_id: {
        title: translation("idfId"),
        type: "number",
      },
    },
  };

  return (
    <Context.Consumer>
      {({ patient, update }) => {
        return (
          <ReactNativeForm
            showErrorList={false}
            formData={patient.personal_information}
            schema={schema}
            onChange={({ formData }) => {
              update({ personal_information: formData });
            }}
          >
            <Text></Text>
          </ReactNativeForm>
        );
      }}
    </Context.Consumer>
  );
}
