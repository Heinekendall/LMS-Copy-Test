import { z } from "zod";

import { COURSE_ACTIVITIES_PLANK_DATA } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { RolesSchema } from "../../../../types/schemas.ts";

export const CourseActivityDataSchema = z.object({
  id: z.number(),
  role: RolesSchema,
  parentId: z.number(),
  courseEndDate: z.number(),
  submissionCutoffDate: z.number(),
  maxLpDays: z.number(),
  latePenaltyExtension: z.number().optional(),
  lpType: z.enum([
    "flat-deduction",
    "deduction-per-hour",
    "no-penalty",
    "none",
  ]),
  penaltyIncrement: z.string().optional(),
  totalStudentCount: z.number(),
  submissionCount: z.number(),
  cncThreshold: z.number().optional(),
  latePenalty: z.number().optional(),
  classAvg: z.string().optional(),
});
export type CourseActivityData = z.infer<typeof CourseActivityDataSchema>;

export const courseActivitiesDataQuery = (snapshotId: number) =>
  HttpService.get(`${COURSE_ACTIVITIES_PLANK_DATA}/${snapshotId}`, {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    context: {
      errorDescription: "fetch course activities data",
    },
  }).json(CourseActivityDataSchema.array());
