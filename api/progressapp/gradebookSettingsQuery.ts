import { z } from "zod";

import { GRADEBOOK_SETTINGS } from "../../constants/APIPaths.ts";
import { HttpService } from "../../services/httpService.ts";

export const GradebookSettingsSchema = z.object({
  zeroGradeRule: z.enum(["ACTIVITIES_ONLY", "ACTIVITIES_COURSE"]),
  isLmsGradeSyncEnabled: z.boolean(),
  isLmsSyncAutoZero: z.boolean(),
  lmsDateSyncSettings: z.object({
    isLmsDateSyncEnabled: z.boolean(),
    activityIds: z.array(z.number()),
  }),
});
export type GradebookSettings = z.infer<typeof GradebookSettingsSchema>;

export const gradebookSettingsQuery = (snapshotId: number) =>
  HttpService.get(`${GRADEBOOK_SETTINGS}/${snapshotId}`, {
    headers: {
      Accept: "*/*",
    },
    context: {
      errorDescription: "fetch gradebook settings",
    },
  }).json(GradebookSettingsSchema);
