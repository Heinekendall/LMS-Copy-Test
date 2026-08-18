import { z } from "zod";

import { INSIGHT_ASSISTANT } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const InsightAssistantMetadataSchema = z.object({
  isActive: z.boolean(),
  title: z.string().nullable(),
  endpoints: z
    .looseObject({
      dashboard: z.string().optional(),
    })
    .nullable(),
  updatedOn: z.number().nullable(),
});
export type InsightAssistantMetadata = z.infer<
  typeof InsightAssistantMetadataSchema
>;

export const insightAssistantQuery = (snapshotId: number) =>
  HttpService.get(`${INSIGHT_ASSISTANT}/metadata/${snapshotId}`, {
    context: {
      errorDescription: "fetch Instructor Insights settings",
    },
  }).json(InsightAssistantMetadataSchema);
