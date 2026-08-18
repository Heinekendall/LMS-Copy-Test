import { ACTIVITY, MOVE_ACTIVITY } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { toFormBody } from "../../../../utilities/httpUtils.ts";
import { type ActivityNode, ActivitySchema } from "../nextbook/nodesQuery.ts";

const activityMutationHeaders = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/x-www-form-urlencoded",
};

function putActivity(
  url: string,
  activity: ActivityNode,
  errorDescription: string,
) {
  return HttpService.put(url, {
    body: toFormBody(activity),
    headers: activityMutationHeaders,
    context: { errorDescription },
  }).json(ActivitySchema);
}

export const moveActivityQuery = (activity: ActivityNode) =>
  putActivity(MOVE_ACTIVITY, activity, "move activity");

export const updateActivityQuery = (activity: ActivityNode) =>
  putActivity(ACTIVITY, activity, "update activity");

export const createActivityQuery = (activity: ActivityNode) =>
  HttpService.post(ACTIVITY, {
    body: toFormBody(activity),
    headers: activityMutationHeaders,
    context: { errorDescription: "create activity" },
  }).json(ActivitySchema);
