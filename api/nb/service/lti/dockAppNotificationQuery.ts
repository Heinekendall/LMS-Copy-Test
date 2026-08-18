import { z } from "zod";

import { LTI_LAUNCH_DATA } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const DockAppNotificationSchema = z.object({
  notify: z.boolean(),
});
export type DockAppNotification = z.infer<typeof DockAppNotificationSchema>;

export const dockAppNotificationQuery = (snapshotId: number, appUid: number) =>
  HttpService.get(`${LTI_LAUNCH_DATA}/${snapshotId}/notification/${appUid}`, {
    context: {
      errorDescription: "fetch dock app notification",
    },
  }).json(DockAppNotificationSchema);
