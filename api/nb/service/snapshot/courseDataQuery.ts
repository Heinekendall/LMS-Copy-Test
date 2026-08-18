import { z } from "zod";

import { COURSE_DATA } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { filterXSS } from "../../../../utilities/securityUtils.ts";

export const CourseDataSchema = z.object({
  id: z.number(),
  isbn: z.string(),
  componentISBN: z.string(),
  cgi: z.string().optional(),
  coreTextISBN: z.string(),
  snapshotId: z.number(),
  isMaster: z.literal(false),
  isReleased: z.boolean(),
  isReaderOnly: z.boolean(),
  isAdvancedPlacement: z.boolean(),
  readerLevel: z.string(),
  isHenley: z.boolean(),
  lastModifiedDate: z.number(),
  brandingDiscipline: z.string(),
  edition: z.string(),
  displayEdition: z.string().transform(filterXSS),
  title: z.string().transform(filterXSS),
  author: z.string(),
  qualityMatters: z.string().optional(),
  createdBy: z.string(),
  createDate: z.number(),
  isLocked: z.boolean(),
  isOverridePreventWorkingCopyCreation: z.boolean(),
  isPreventWorkingCopyCreation: z.boolean(),
  lastWorkingCopyCommitDate: z.string(),
  lastWorkingCopyCommitBy: z.string(),
  hasMathML: z.boolean(),
  sourceId: z.number(),
  isMindtapActivityProvisioned: z.boolean(),
  nbNodeId: z.number(),
  isDeleted: z.boolean(),
  isArchived: z.boolean(),
  componentStatuses: z.array(z.unknown()),
  nodeId: z.number(),
  name: z.string().transform(filterXSS),
  description: z.string(),
  parentId: z.number(),
  defaultPathId: z.number(),
  appData: z.object(),
  lpname: z.string().transform(filterXSS),
  orgId: z.number(),
  courseKey: z.string(),
  analyticsUrl: z.string(),
  gated: z.boolean(),
  parentCgi: z.string().optional(),
});
export type CourseData = z.infer<typeof CourseDataSchema>;

export const courseDataQuery = (snapshotId: number) =>
  HttpService.get(`${COURSE_DATA}/${snapshotId}`, {
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache,no-store,must-revalidate,max-age=-1,private",
    },
    context: {
      errorDescription: "fetch course data",
    },
  }).json(CourseDataSchema);
