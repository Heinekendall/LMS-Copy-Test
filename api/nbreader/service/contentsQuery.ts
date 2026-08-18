import z from "zod";

import { SPLASH_CONTENT } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const AboutSectionSchema = z.object({
  sectionId: z.string(),

  sectionLabel: z.string().nullable(),
  sectionTitle: z.string(),
  sectionMarkupTitle: z.string(),

  innerSectionLabel: z.string().nullable(),
  innerSectionTitle: z.string().nullable(),
  innerSectionMarkupTitle: z.string().nullable(),
  innerSectionType: z.string().nullable(),
  innerSectionId: z.string().nullable(),

  sectionType: z.string(),
  sectionHidden: z.boolean(),
  idSequence: z.number(),
  nonBook: z.boolean(),

  content: z.string(),
});

export const AboutContentsSchema = z.object({
  _id: z.object({
    $oid: z.string(),
  }),

  contentKey: z.string(),
  bookId: z.string(),

  sections: z.record(z.string(), AboutSectionSchema),
});

export type AboutContents = z.infer<typeof AboutContentsSchema>;

export const contentsQuery = (isbn: string) =>
  HttpService.get(`${SPLASH_CONTENT}/${isbn}/splashContent`, {
    context: {
      errorDescription: "fetch splash content",
    },
  }).json(AboutContentsSchema);
