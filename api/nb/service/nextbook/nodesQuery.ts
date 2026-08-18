import { z } from "zod";

import {
  NODE_TYPES,
  SCORE_STRATEGY,
  SUBTYPES,
} from "../../../../constants/activityConstants.ts";
import { NODES } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { filterXSS } from "../../../../utilities/securityUtils.ts";

const NodeSchema = z.object({
  id: z.number(),
  name: z.string().transform(filterXSS),
  description: z.string().default("").transform(filterXSS),
  order: z.number(),
  visibleToStudent: z.boolean().optional(),
  dueDateExtended: z.boolean().optional(),
  originId: z.number().optional(),
  isPasswordProtected: z.boolean(),
});
export const NextbookSchema = z.object({
  ...NodeSchema.shape,
  type: z.literal(NODE_TYPES.NEXTBOOK),
});
export type NextbookNode = z.infer<typeof NextbookSchema>;
export const PathNodeSchema = z.object({
  ...NodeSchema.shape,
  type: z.literal(NODE_TYPES.PATH),
  parentId: z.number(),
  defaultPath: z.boolean(),
});
export type PathNode = z.infer<typeof PathNodeSchema>;
export const GroupSchema = z.object({
  ...NodeSchema.shape,
  type: z.literal(NODE_TYPES.GROUP),
  parentId: z.number(),
  refId: z.string().optional(),
});
export type GroupNode = z.infer<typeof GroupSchema>;
export const ActivitySchema = z.object({
  ...NodeSchema.shape,
  type: z.literal(NODE_TYPES.ACTIVITY),
  parentId: z.number(),
  startDate: z.number().optional(),
  endDate: z.number().optional(),
  gradable: z.boolean().optional(),
  scorable: z.boolean(),
  maxScore: z.number().optional(),
  maxTakes: z.number().optional(),
  scoreStrategy: z.enum(SCORE_STRATEGY).optional(),
  isTimed: z.boolean(),
  durationInSeconds: z.number().optional(),
  manuallyGraded: z.boolean(),
  refId: z.string().optional(),
  subType: z.enum(SUBTYPES).nullable().optional(),
  activityType: z.number(),
  studentStarted: z.boolean().optional(),
  scoreModified: z.boolean().optional(),
  gradableModified: z.boolean().optional(),
  appId: z.number(),
  appActivityId: z.number(),
  addURI: z.string().optional(),
  configureURI: z.string().optional(),
  indexURI: z.string().optional(),
  searchURI: z.string().optional(),
  viewActionURI: z.string().optional(),
  viewURI: z.string().optional(),
});
export type ActivityNode = z.infer<typeof ActivitySchema>;
export const NodesSchema = z.discriminatedUnion("type", [
  NextbookSchema,
  PathNodeSchema,
  GroupSchema,
  ActivitySchema,
]);
export type Nodes = z.infer<typeof NodesSchema>;

export const nodesQuery = (snapshotId: number) =>
  HttpService.get(`${NODES}/${snapshotId}/nodes`, {
    context: {
      errorDescription: "fetch nodes list",
    },
  }).json(NodesSchema.array());
