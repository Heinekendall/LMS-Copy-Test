import { z } from "zod";

import * as APIPaths from "../../../constants/APIPaths.ts";
import {
  SA_ACTIVITY_STATUS,
  SA_COURSE_STATUS,
} from "../../../constants/studentAssistantConstants.ts";
import { HttpService } from "../../../services/httpService.ts";

export const StudentAssistantSettingsSchema = z.object({
  courseStatus: z.enum(SA_COURSE_STATUS),
  activityStatuses: z.record(z.string(), z.enum(SA_ACTIVITY_STATUS)),
  supportedAppIds: z.string().array(),
});
export type StudentAssistantSettings = z.infer<
  typeof StudentAssistantSettingsSchema
>;

export const studentAssistantQuery = (snapshotId: number) =>
  HttpService.post(
    `${APIPaths.STUDENT_ASSISTANT_SETTINGS}/${snapshotId}/fetch`,
    {
      context: {
        errorDescription: "fetch student assistant settings",
      },
    },
  ).json(StudentAssistantSettingsSchema);

export const studentAssistantUpdateQuery = (
  snapshotId: number,
  enabled: boolean,
) =>
  HttpService.put(
    `${APIPaths.STUDENT_ASSISTANT_COURSE_SETTINGS}/${snapshotId}?saEnabled=${enabled}`,
    {
      context: {
        errorDescription: "batch edit student assistant course settings",
      },
    },
  ).json(StudentAssistantSettingsSchema);
