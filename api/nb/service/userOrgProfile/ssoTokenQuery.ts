import { z } from "zod";

import * as APIPaths from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const SsoTokenSchema = z.object({
  ssoToken: z.string(),
  lastRefreshTime: z.number(),
});
export type SsoToken = z.infer<typeof SsoTokenSchema>;

export const ssoTokenQuery = () =>
  HttpService.get(APIPaths.SSO_TOKEN, {
    context: {
      errorDescription: "fetch SSO token",
    },
  }).json(SsoTokenSchema);
