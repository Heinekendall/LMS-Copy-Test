import { z } from "zod";

import { FEATURE_FLAGS } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const FeatureFlagsSchema = z.object({
  cuSidebarEnabled: z.boolean(),
  timePickerMinutesSupportEnabled: z.boolean(),
  performanceReportEnabled: z.boolean(),
  personalStudyPlanEnabled: z.boolean(),
  mtCoreBatchEditTimeEnabled: z.boolean(),
  splitWalkMe: z
    .object({
      treatmentName: z.string(),
      ssoIsbn: z.string(),
      userRole: z.string(),
      courseType: z.string(),
      snapshotId: z.number(),
      config: z
        .object({
          url: z.string(),
        })
        .optional(),
    })
    .partial(),
  PasswordProtectionEnabled: z.boolean(),
  latePenaltyRecalculationEnabled: z.boolean(),
  mastFeatureFlags: z.string().array(),
  delmarToLsasEnabled: z.boolean(),
  isEReaderCourse: z.boolean(),
  isEReaderEmbedded: z.boolean(),
  mtLdbSettingsEnabled: z.boolean(),
});
export type FeatureFlags = z.infer<typeof FeatureFlagsSchema>;

export const featureFlagsQuery = () =>
  HttpService.get(FEATURE_FLAGS, {
    context: {
      errorDescription: "fetch feature flags",
    },
  }).json(FeatureFlagsSchema);
