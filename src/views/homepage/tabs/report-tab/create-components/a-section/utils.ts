import { TOGGLE } from "../../../../../../interfaces";

export function isSuccessful(successful?: boolean) {
  return successful === null ? null : successful ? TOGGLE.YES : TOGGLE.NO;
}
