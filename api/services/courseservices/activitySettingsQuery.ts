import { COURSE_SERVICES } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

// FIXME [WL] add schema
export const activitySettingsQuery = (cgi: string) =>
  HttpService.get(`${COURSE_SERVICES}/${cgi}/settings`).json();
