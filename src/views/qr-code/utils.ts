import { compress, trimUndefinedRecursively } from "compress-json";
import { IPatientRecord } from "../../interfaces";
import _ from "lodash";

function removeNulls(obj) {
  return _.transform(obj, (result, value, key) => {
    if (_.isObject(value)) {
      result[key] = removeNulls(value); // Recursively call removeNulls for nested objects.
    } else if (!_.isNull(value)) {
      result[key] = value; // Keep non-null values.
    }
  });
}
export function getByteSize(str) {
  // Use the `Buffer` class in Node.js
  if (typeof Buffer === "function") {
    return Buffer.from(str).length;
  }

  // For Expo or browser environments, you can use Blob
  if (typeof Blob === "function") {
    const blob = new Blob([str]);
    return blob.size;
  }

  // Fallback for environments that do not support Buffer or Blob
  // This may not be as accurate, especially for non-ASCII characters
  return str.length * 2;
}

export function splicePatient(patient: IPatientRecord) {
  const buckets: any[] = [];
  let temp = {};

  for (const key in patient) {
    const maxString = JSON.stringify({ ...temp, [key]: patient[key] });

    if (maxString.length > 2000) {
      const partialData = {
        id: patient.personal_information.patientId,
        data: temp,
      };
      removeNulls(partialData);

      const decodedPatient = compress({ partialData });
      console.log({
        IN: true,
        B: getByteSize(decodedPatient),
        L: JSON.stringify(decodedPatient).length,
      });
      buckets.push(decodedPatient);
      temp = { [key]: patient[key] };
    } else {
      temp = { ...temp, [key]: patient[key] };
    }
  }

  if (Object.keys(temp).length !== 0) {
    const partialData = {
      id: patient.personal_information.patientId,
      data: temp,
    };

    removeNulls(partialData);
    const decodedPatient = compress({ partialData });
    console.log({
      IN: false,
      B: getByteSize(decodedPatient),
      L: JSON.stringify(decodedPatient).length,
    });
    buckets.push(decodedPatient);
  }
  console.log(buckets[0]);
  return buckets;
}

/**
 * QR CODE
 * 
 *  const route = useRoute<RouteProp<RootStackParamList>>();
  const patient = useMemo(() => route.params.patient, []);
  const [qrCodes, setQxCodes] = useState<any[]>([]);
  const [qrIndex, setQrIndex] = useState<number>(1);
  const translation = useTranslation();
  const navigation = useNavigation<StackNavigation>();
  const savePatient = usePatientRecordsStore((state) => state.savePatient);
  const setActivePatient = usePatientRecordsStore(
    (state) => state.setActivePatient
  );
  const patients = usePatientRecordsStore((state) => state.patients);

  const reportEvac = async () => {
    const updatedPatient: IPatientRecord = {
      ...patient,
      evacuation: {
        ...patient.evacuation,
        status: STATUS.CLOSED,
      },
    };
    setActivePatient(updatedPatient);
    savePatient();

    goBackHome();
  };
  const goBackHome = () => navigation.navigate(ROUTES.HOME);

  useEffect(() => {
    patient && setQxCodes(splicePatient(patient));
  }, [patient]);

 */

/**
   * RECIVER
   * 
  const handleBarcodeRead = (event) => {
    if (event.data) {
      const parsed = JSON.parse(event.data);
      const patient = decompress(parsed);
      console.log(event.data, patient);
      // storage.save({
      //   key: STORAGE.PATIENTS_RECORD,
      //   id: patient.id,
      //   data: {
      //     ...patient,
      //     evacuation: {
      //       ...patient.evacuation,
      //       status: STATUS.NEW_PATIENT,
      //     },
      //   },
      // });
      // navigation.navigate(ROUTES.HOME, { tab: TAB_STATUS.STATUS });
    }
  };
   */
