import { SPLASH } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

const headers = {
  "Cache-control": "no-cache",
  "Content-Type": "application/json",
  Accept: "application/json",
};

const context = {
  errorDescription: "send visit page request",
};

export const visitPageQuery = (snapshotId: number) =>
  HttpService.post(`${SPLASH}/snapshot/${snapshotId}/visit`, {
    headers,
    context,
  }).json();
