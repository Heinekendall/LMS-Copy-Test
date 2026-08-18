import { z } from "zod";

import { COMPETENCY_TAGS_BY_ISBN_AND_CGI } from "../../constants/APIPaths.ts";
import { COMPETENCIES } from "../../constants/careerReadinessConstants.ts";
import { HttpService } from "../../services/httpService.ts";

const CompetencyTagSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.enum(COMPETENCIES).nullable(),
  description: z.string().nullable(),
});
const CompetencyActivitySchema = z.object({
  refId: z.string(),
  tags: z.array(z.string()),
  topLevelTags: z.array(z.string()),
});
const CompetencyDataSchema = z.object({
  tags: z.array(CompetencyTagSchema),
  activities: z.array(CompetencyActivitySchema),
});
export type CompetencyData = z.infer<typeof CompetencyDataSchema>;

export const competencyDataQuery = (isbn: string, cgi: string) =>
  HttpService.get(
    `${COMPETENCY_TAGS_BY_ISBN_AND_CGI}/isbn/${isbn}/cgi/${cgi}`,
    {
      context: {
        errorDescription: "fetch competency tags",
      },
    },
  ).json(CompetencyDataSchema);
