import { ACTIVITY_SETTINGS_CNC_DATA } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

// FIXME [Master] add schema
export const cncDataQuery = (snapshotId: number) =>
  HttpService.get(`${ACTIVITY_SETTINGS_CNC_DATA}/${snapshotId}`).json();
