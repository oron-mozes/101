import { IPatientRecord, STATUS } from "../../../../interfaces";

const priority: Map<string, number> = new Map();
priority.set(STATUS.NEW_PATIENT, 0);
priority.set(STATUS.URGENT, 1);
priority.set(STATUS.TO_EVAC, 2);
priority.set(STATUS.ACTIVE, 4);
priority.set(STATUS.CLOSED, 5);
priority.set(STATUS.HOLD, 3);

export function sortByPriority(data: IPatientRecord[]): IPatientRecord[] {
  return data?.sort((recordA: IPatientRecord, recordB: IPatientRecord) =>
    priority.get(recordA.evacuation.status) <
    priority.get(recordB.evacuation.status)
      ? -1
      : 1
  );
}
