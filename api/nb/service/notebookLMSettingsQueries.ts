import { z } from "zod";

import { NOTEBOOK_LM_SETTINGS } from "../../../constants/APIPaths.ts";
import { NOTEBOOK_LM_COURSE_STATUS } from "../../../constants/notebookLMConstants.ts";
import { HttpService } from "../../../services/httpService.ts";

export const NotebookLMSettingsSchema = z.object({
  courseStatus: z.enum(NOTEBOOK_LM_COURSE_STATUS),
});
export type NotebookLMSettings = z.infer<typeof NotebookLMSettingsSchema>;

export const notebookLMSettingsQuery = (snapshotId: number) =>
  HttpService.get(`${NOTEBOOK_LM_SETTINGS}/${snapshotId}`, {
    context: {
      errorDescription: "fetch Notebook LM settings",
    },
  }).json(NotebookLMSettingsSchema);

export const notebookLMUpdateSettingsQuery = (
  snapshotId: number,
  enabled: boolean,
) =>
  HttpService.put(
    `${NOTEBOOK_LM_SETTINGS}/${snapshotId}?nlmEnabled=${enabled}`,
    {
      context: {
        errorDescription: "update Notebook LM settings",
      },
    },
    // FIXME validate schema match
  ).json(NotebookLMSettingsSchema);
