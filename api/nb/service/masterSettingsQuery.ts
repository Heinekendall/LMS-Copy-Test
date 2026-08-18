import { z } from "zod";

import { MASTER_SETTINGS } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const MasterSettingsSchema = z.object({
  isCustomGradebook: z.boolean(),
  gradebookSettings: z.object(),
  henleyMode: z.boolean(),
});
export type MasterSettings = z.infer<typeof MasterSettingsSchema>;

export const masterSettingsQuery = (isbn: string) =>
  HttpService.get(`${MASTER_SETTINGS}/${isbn}`, {
    context: {
      errorDescription: "fetch master settings",
    },
  }).json(MasterSettingsSchema);
