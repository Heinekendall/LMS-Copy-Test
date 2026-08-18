import { z } from "zod";

import { ADDITIONAL_FEATURES_FLAGS } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const AdditionalFeatureFlagsSchema = z.object({
  batchScorePossibleEditEnabled: z.boolean(),
  courseUseOptionSetsEnabled: z.boolean(),
  careerReadinessFeatures: z.array(z.string()),
});
export type AdditionalFeatureFlags = z.infer<
  typeof AdditionalFeatureFlagsSchema
>;

export const additionalFeatureFlagsQuery = (
  courseKey: string,
  ssoIsbn: string,
  discipline: string,
) =>
  HttpService.get(ADDITIONAL_FEATURES_FLAGS, {
    searchParams: {
      courseKey,
      ssoIsbn,
      discipline,
    },
    context: {
      errorDescription: "fetch course CGI additional feature flags",
    },
  }).json(AdditionalFeatureFlagsSchema);
