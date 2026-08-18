import { z } from "zod";

import { COURSE_SERVICES } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const CourseMetadataSchema = z.object({
  gatewayCourse: z.string(),
  institutionId: z.string(),
  isbnGroup: z.object({
    sso: z.string(),
  }),
  edition: z.string(),
  discipline: z.string(),
  title: z.string(),
  courseSource: z.string(),
  platform: z.string(),
  courseName: z.string(),
  courseKey: z.string(),
  authorGroup: z.object({
    author: z.array(
      z.object({
        givenNames: z.string(),
      }),
    ),
  }),
  copyrightYearGroup: z.object({
    copyrightYear: z.string(),
  }),
  instructorId: z.string(),
});
export type CourseMetadata = z.infer<typeof CourseMetadataSchema>;

export const courseMetadataQuery = (cgi: string) =>
  HttpService.get(`${COURSE_SERVICES}/${cgi}/metadata`, {
    context: {
      errorDescription: "fetch course services metadata",
    },
  }).json(CourseMetadataSchema);
