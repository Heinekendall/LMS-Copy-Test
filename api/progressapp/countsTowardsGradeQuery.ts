import { z } from "zod";

import { CATEGORY_WEIGHTING } from "../../constants/APIPaths.ts";
import { HttpService } from "../../services/httpService.ts";

export const CountsTowardsGradeSchema = z.array(z.number());
export type CountsTowardsGrade = z.infer<typeof CountsTowardsGradeSchema>;

export const countsTowardsGradeQuery = (snapshotId: number) =>
  HttpService.get(
    `${CATEGORY_WEIGHTING}/${snapshotId}/countsTowardsGrade`,
  ).json(CountsTowardsGradeSchema);
