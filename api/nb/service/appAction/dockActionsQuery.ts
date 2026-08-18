import { z } from "zod";

import { FIND_DOCK_ACTIONS } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { CapabilitiesSchema, RolesSchema } from "../../../../types/schemas.ts";

export const DockAppActionSchema = z.object({
  appId: z.number(),
  appName: z.string(),
  uid: z.number(),
  actionName: z.string(),
  actionLabel: z.string(),
  actionIcon: z.string().optional(),
  actionURI: z.string(),
  hidden: z.boolean(),
  extendSelection: z.boolean(),
  supportsMobile: z.boolean(),
  mode: z.string(),
  height: z.string(),
  width: z.string(),
  launchLikeActivity: z.boolean(),
  supportsNotification: z.boolean(),
  roles: z.array(z.object({ role: RolesSchema })).optional(),
  capabilities: z
    .array(z.object({ capability: CapabilitiesSchema }))
    .optional(),
  categories: z.array(z.string()),
  status: z.string(),
  errorMessage: z.string().nullable(),
});
export type DockAppAction = z.infer<typeof DockAppActionSchema>;

export const dockActionsQuery = (ssId: number) =>
  HttpService.get(FIND_DOCK_ACTIONS, {
    searchParams: {
      ssId,
    },
    context: {
      errorDescription: "fetch dock apps data",
    },
  }).json(DockAppActionSchema.array());
