import { z } from "zod";

import { ATTEMPT_STATUS } from "../../../constants/activityConstants.ts";
import { ACTIVITY_OUTCOME } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const ActivityOutcomeSchema = z.object({
  takeId: z.string(),
  status: z.enum(ATTEMPT_STATUS),
});
export type ActivityOutcome = z.infer<typeof ActivityOutcomeSchema>;

export const generateTakeIdQuery = (activityId: number) =>
  HttpService.get(`${ACTIVITY_OUTCOME}/attempt/activity/${activityId}`, {
    context: {
      errorDescription: "generate new take ID",
    },
  }).json(ActivityOutcomeSchema);
