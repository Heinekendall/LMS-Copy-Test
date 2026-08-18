import { z } from "zod";

import { COURSE_DATA } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

const ReindexQuerySchema = z.object({
  status: z.string(),
  message: z.string(),
});
export type ReindexQuery = z.infer<typeof ReindexQuerySchema>;

export const reindexQuery = (snapshotId: number) =>
  HttpService.post(`${COURSE_DATA}/${snapshotId}/reindex`, {
    context: {
      errorDescription: "send populate search data request",
    },
  }).json(ReindexQuerySchema);
