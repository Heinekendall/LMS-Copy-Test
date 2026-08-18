import { z } from "zod";

import { CAP_CLIENT_CONFIG } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const GlobalCapClientConfigSchema = z.object({
  titleIsbn: z.string().optional(),
  userGUID: z.string(),
  institutionId: z.string(),
  analyticsEndpoint: z.string(),
  userEnvironment: z.string(),
  userPlatform: z.string(),
  amplitudeApiKey: z.string(),
  userId: z.number(),
  analyticsApiKey: z.string(),
  hostPlatform: z.string(),
  hostEnvironment: z.string(),
  courseKey: z.string().optional(),
  productEnvironment: z.string(),
  userRole: z.string(),
  productPlatform: z.string(),
});
export type GlobalCapClientConfig = z.infer<typeof GlobalCapClientConfigSchema>;

export const globalCapClientConfigQuery = () =>
  HttpService.get(CAP_CLIENT_CONFIG, {
    context: {
      errorDescription: "fetch global CAP client config",
    },
  }).json(GlobalCapClientConfigSchema);
