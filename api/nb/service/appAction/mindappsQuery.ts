import { z } from "zod";

import { INTERACTION } from "../../../../constants/activityConstants.ts";
import { SNAPSHOT_MINDAPPS } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const MindappSchema = z.object({
  uid: z.number(),
  id: z.number(),
  name: z.string(),
  displayName: z.string(),
  appVersion: z.string(),
  creator: z.string(),
  rootURI: z.string(),
  helpURI: z.string().optional(),
  provisionType: z.string(),
  authScheme: z.string(),
  createdBy: z.number(),
  modifiedDate: z.number(),
  modifiedBy: z.number(),
  supportReactivate: z.boolean(),
  supportsAttemptScore: z.boolean(),
  secureLaunch: z.boolean(),
  ltiCompliant: z.boolean(),
  ltiVersion: z.string(),
  ltiPublicKey: z.string().optional(),
  sharedSecret: z.boolean().optional(),
  deploymentId: z.string().optional(),
  deployMode: z.string().optional(),
  ltiClientId: z.string().optional(),
  ltiConsumerKey: z.string().optional(),
  categories: z.array(z.string()).optional(),
  features: z.partialRecord(z.string(), z.boolean()),
  activities: z.partialRecord(
    z.string(),
    z.object({
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
      interaction: z.enum(INTERACTION).optional(),
    }),
  ),
});
export type Mindapp = z.infer<typeof MindappSchema>;

export const mindappsQuery = (snapshotId: number) =>
  HttpService.get(`${SNAPSHOT_MINDAPPS}/${snapshotId}/apps`, {
    context: {
      errorDescription: "fetch snapshot MindApps",
    },
  }).json(MindappSchema.array());
