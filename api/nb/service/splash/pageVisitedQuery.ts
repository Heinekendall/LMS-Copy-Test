import { z } from "zod";

import { SPLASH } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const PageVisitedSchema = z.object({ visited: z.boolean() });
export type PageVisited = z.infer<typeof PageVisitedSchema>;

export const pageVisitedQuery = (snapshotId: number) =>
  HttpService.get(`${SPLASH}/snapshot/${snapshotId}`, {
    context: {
      errorDescription: "fetch page visited data",
    },
  }).json(PageVisitedSchema);
