import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import storage, { STORAGE } from "../../../../../storage";
import { useTranslation } from "../../../../hooks/useMyTranslation";
import { IPatientRecord, STATUS } from "../../../../interfaces";
import { gutter } from "../../../../shared-config";
import Context from "./context";
import { PatientDetails } from "./create-components/patient-details";
import { Avpu } from "./create-components/avpu";

export const emptyPatient: IPatientRecord = {
  personal_information: {
    full_name: "",
    idf_id: 0,
  },
  incident_information: {
    injury_time: new Date().getTime(),
    care_time: new Date().getTime(),
    date: new Date().getTime(),
    status: STATUS.ACTIVE,
  },
  care_team: [],
  injuries: [],
  consciousness: [],
};
export function ReportTab({ patient }: { patient?: IPatientRecord }) {
  const translation = useTranslation();
  const [patientRecord, setPatientRecord] = useState<IPatientRecord>(
    patient || emptyPatient
  );
  const id = useMemo(() => new Date().getTime().toString(), []);

  return (
    <Context.Provider
      value={{
        patient: patientRecord,
        update: (value) => {
          const selectedId = patientRecord.id || id;

          const updateData: IPatientRecord = {
            ...patientRecord,
            ...value,
            id: selectedId,
          };

          setPatientRecord(updateData);
          storage.save({
            key: STORAGE.PATIENTS_RECORD,
            id: selectedId,
            data: updateData,
          });
        },
      }}
    >
      <View>
        <PatientDetails />
        <Avpu />
      </View>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: gutter * 3,
    borderRadius: 8,
  },
  content: { paddingTop: 0, paddingLeft: 0, paddingRight: 0 },
});
