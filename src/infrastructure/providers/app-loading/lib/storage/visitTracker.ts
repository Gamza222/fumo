import { VISIT_KEY } from "../../model/constants/constants";

export const hasVisitedBefore = (): boolean => {
  try {
    return localStorage.getItem(VISIT_KEY) === "true";
  } catch {
    return false;
  }
};

export const markVisited = (): void => {
  try {
    localStorage.setItem(VISIT_KEY, "true");
  } catch {}
};

export const clearVisit = (): void => {
  try {
    localStorage.removeItem(VISIT_KEY);
  } catch {}
};
