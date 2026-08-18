import { z } from "zod";

import { COURSE_FOR_SNAPSHOT } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const CourseForSnapshotSchema = z.object({
  id: z.number(),
  instructorGuid: z.string(),
  startDate: z.number(),
  endDate: z.number(),
  courseType: z.string(),
  timezone: z.string(),
  timeZone: z.string().optional(),
  timezoneCd: z.string(),
  sectionNumber: z.string().optional(),
  org: z.object({
    id: z.number(),
    name: z.string(),
    type: z.number(),
    externalId: z.string(),
    path: z.string(),
    courseCount: z.number(),
    courseSearchCount: z.number(),
    userSearchCount: z.number(),
    instructors: z.array(z.unknown()),
    settings: z.record(z.string(), z.unknown()),
    parentId: z.number(),
    parentName: z.string(),
    parentExternalId: z.string(),
  }),
  locationId: z.string().optional(),
});
export type CourseForSnapshot = z.infer<typeof CourseForSnapshotSchema>;

export const courseForSnapshotQuery = (snapshotId: number) =>
  HttpService.get(`${COURSE_FOR_SNAPSHOT}/${snapshotId}`, {
    context: {
      errorDescription: "fetch course for snapshot",
    },
  }).json(CourseForSnapshotSchema);
