import z from "zod";

import { SPLASH } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { CourseForSnapshotSchema } from "../course/courseForSnapshotQuery.ts";

export const AboutDataSchema = z.object({
  isMaster: z.boolean(),
  isReaderOnly: z.boolean(),
  nextbookTitle: z.string(),
  isbn: z.string(),
  ssoISBN: z.string(),
  intro: z.string(),
  qualityMatters: z.string(),
  snapshotTitle: z.string(),
  author: z.string(),
  copyright: z.string(),
  mtCopyright: z.string(),
  edition: z.string(),
  displayEdition: z.string(),
  credits: z.string(),
  brandingDiscipline: z.string(),
  course: CourseForSnapshotSchema.optional(),
});

export type AboutData = z.infer<typeof AboutDataSchema>;

export const splashDataQuery = (snapshotId: number) =>
  HttpService.get(`${SPLASH}/${snapshotId}`, {
    context: {
      errorDescription: "fetch splash data",
    },
  }).json(AboutDataSchema);
