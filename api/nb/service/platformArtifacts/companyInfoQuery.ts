import { z } from "zod";

import { COMPANY_SPLASH_CONTENT } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const CompanyInfoSchema = z.object({
  companyInfo: z.string(),
});

export type CompanyInfo = z.infer<typeof CompanyInfoSchema>;

export const companyInfoQuery = () =>
  HttpService.get(`${COMPANY_SPLASH_CONTENT}`, {
    context: {
      errorDescription: "fetch company info",
    },
  }).json(CompanyInfoSchema);
