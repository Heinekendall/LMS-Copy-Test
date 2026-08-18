import { z } from "zod";

import { COURSE_SETTINGS } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const CourseSettingsSchema = z.object({
  dashboard: z.object({
    enabled: z.boolean(),
  }),
  defaultViewSelection: z.enum(["listview", "weekview", "unitview"]).optional(),
  timePickerDefaults: z.object({
    dueTimeDefault: z.string(),
    availableTimeDefault: z.string(),
  }),
  userInfoSettings: z
    .looseObject({
      customInstructions: z.string().optional(),
      numCharacters: z.string().optional(),
      studentIdsRequired: z.boolean().optional(),
    })
    .optional(),
  weekview: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
});
export type CourseSettings = z.infer<typeof CourseSettingsSchema>;

export const courseSettingsQuery = (snapshotId: number) =>
  // Although this function/service url is called course settings its actually just the data within dashboard settings
  HttpService.get(`${COURSE_SETTINGS}/${snapshotId}`, {
    context: {
      errorDescription: "fetch course settings",
    },
  }).json(CourseSettingsSchema);
