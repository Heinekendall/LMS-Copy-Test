import { KEEP_SESSION_ALIVE } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const keepAliveQuery = () =>
  HttpService.get(KEEP_SESSION_ALIVE, {
    headers: { "Cache-Control": "no-cache", Accept: "text/plain" },
    context: {
      errorDescription: "renew session",
    },
  }).text();
