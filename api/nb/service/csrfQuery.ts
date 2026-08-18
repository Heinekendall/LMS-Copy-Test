import { CSRF_DATA } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const csrfQuery = () =>
  HttpService.get(CSRF_DATA, {
    headers: { Accept: "text/plain" },
    context: {
      errorDescription: "generate CSRF token",
    },
  }).text();
