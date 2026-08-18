import { z } from "zod";

import { MASTER } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { CourseDataSchema } from "../snapshot/courseDataQuery.ts";

const ComponentStatusSchema = z.object({
  description: z.string(),
  endTime: z.number().optional(),
  errorText: z.string().optional(),
  id: z.number(),
  lastModifiedDate: z.number(),
  operation: z.string(),
  startTime: z.number().optional(),
  status: z.string(),
  uuid: z.string(),
});

export const MasterDataSchema = CourseDataSchema.pick({
  id: true,
  isbn: true,
  componentISBN: true,
  cgi: true,
  coreTextISBN: true,
  snapshotId: true,
  isReleased: true,
  isReaderOnly: true,
  isAdvancedPlacement: true,
  readerLevel: true,
  isHenley: true,
  lastModifiedDate: true,
  brandingDiscipline: true,
  edition: true,
  displayEdition: true,
  title: true,
  author: true,
  qualityMatters: true,
  createdBy: true,
  createDate: true,
  isLocked: true,
  isOverridePreventWorkingCopyCreation: true,
  isPreventWorkingCopyCreation: true,
  lastWorkingCopyCommitDate: true,
  lastWorkingCopyCommitBy: true,
  hasMathML: true,
  isMindtapActivityProvisioned: true,
  nbNodeId: true,
  isDeleted: true,
  isArchived: true,
  nodeId: true,
  name: true,
  description: true,
  defaultPathId: true,
  appData: true,
  lpname: true,
}).extend({
  isMaster: z.literal(true),
  status: z.number(),
  refreshStatus: z.number(),
  workingCopyId: z.number(),
  credits: z.string(),
  componentStatuses: z.array(ComponentStatusSchema),
});
export type MasterData = z.infer<typeof MasterDataSchema>;

export const masterDataQuery = (snapshotId: number) =>
  HttpService.get(`${MASTER}/${snapshotId}`, {
    context: {
      errorDescription: "fetch master data",
    },
  }).json(MasterDataSchema);
