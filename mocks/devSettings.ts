import type { JsonBodyType } from "msw";
import { DateTime } from "luxon";

export function setIsMaster(json: unknown): JsonBodyType {
  const settings = JSON.parse(localStorage.getItem("mindtap-ui-dev") || "null");

  if (settings?.useMaster) {
    // @ts-ignore
    json.isMaster = settings.useMaster;
  }

  return json as JsonBodyType;
}

export function setHasSkillsTagging(json: unknown): JsonBodyType {
  const settings = JSON.parse(localStorage.getItem("mindtap-ui-dev") || "null");

  if (settings?.useSkillsTagging) {
    // @ts-ignore
    if (!json.careerReadinessFeatures?.includes("skillsTagging")) {
      // @ts-ignore
      json.careerReadinessFeatures.push("skillsTagging");
    }
  }

  return json as JsonBodyType;
}

export function setHasDueDateActivityToday(json: unknown): JsonBodyType {
  const settings = JSON.parse(localStorage.getItem("mindtap-ui-dev") || "null");

  if (settings?.useDueDateActivityToday) {
    // @ts-ignore
    const activity = json.find((activity) => activity.id === 43891944);
    if (activity) activity.endDate = DateTime.now().plus({ hour: 1 }).valueOf();
  }

  return json as JsonBodyType;
}

export function setHasDueDateActivityTomorrow(json: unknown): JsonBodyType {
  const settings = JSON.parse(localStorage.getItem("mindtap-ui-dev") || "null");

  if (settings?.useDueDateActivityTomorrow) {
    // @ts-ignore
    const activity = json.find((activity) => activity.id === 43891944);
    if (activity)
      activity.endDate = DateTime.now().plus({ day: 1 }).valueOf();
  }

  return json as JsonBodyType;
}
