import { z } from "zod";

import { INTERACTION } from "../../../../constants/activityConstants.ts";
import { ACTIVITY_TYPES } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { CapabilitiesSchema, RolesSchema } from "../../../../types/schemas.ts";

const AppActionSchema = z.object({
  uid: z.number(),
  actionName: z.string(),
  actionLabel: z.string(),
  actionURI: z.string().optional(),
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
  categories: z.array(z.unknown()),
});
export const ActivityAppSchema = z.object({
  id: z.number(),
  icon: z.string().optional(),
  appDisplayName: z.string(),
  supportsMobile: z.boolean(),
  titleEditable: z.boolean(),
  descriptionEditable: z.boolean(),
  optionEditable: z.boolean(),
  startDate: z.string(),
  startDateWithGating: z.string(),
  supportsLatePenalty: z.boolean(),
  endDate: z.string(),
  endDateWithGating: z.string(),
  reviewInProgressAllowed: z.boolean(),
  skipActivityOverview: z.boolean(),
  placement: z.string(),
  appId: z.number(),
  appName: z.string(),
  displayName: z.string(),
  description: z.string(),
  ignoreGradeUpdatesAfterEndDate: z.boolean(),
  category: z.string(),
  name: z.string(),
  supportsAnnotations: z.boolean(),
  supportsContextMenu: z.boolean(),
  interaction: z.enum(INTERACTION).optional(),
  addAction: AppActionSchema.optional(),
  configureAction: AppActionSchema.optional(),
  gradeAction: AppActionSchema.optional(),
});
export type ActivityApp = z.infer<typeof ActivityAppSchema>;
export const AddibleEditableActivityAppsSchema = z.object({
  add: ActivityAppSchema.array(),
  edit: ActivityAppSchema.array(),
});
export type AddibleEditableActivityApps = z.infer<
  typeof AddibleEditableActivityAppsSchema
>;

export const activityTypesQuery = (
  ssId: number,
  placementType: "distinct" | "inline",
) =>
  HttpService.get(ACTIVITY_TYPES, {
    searchParams: {
      ssId,
      placementType,
    },
    context: {
      errorDescription: "fetch activity types",
    },
  }).json(AddibleEditableActivityAppsSchema);
