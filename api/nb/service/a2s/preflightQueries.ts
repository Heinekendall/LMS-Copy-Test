import { A2S_PREFLIGHT } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

const headers = {
  "Cache-control": "no-cache",
  "Content-Type": "application/json",
  Accept: "application/json",
};
const context = {
  errorDescription: "send A2S preflight request",
};

export const instructorPreviewPreflightQuery = (json: {
  activityId: number;
  externalTakeId: string;
}) =>
  HttpService.post(A2S_PREFLIGHT + "/instructorPreview", {
    json,
    headers,
    context,
  }).text();
