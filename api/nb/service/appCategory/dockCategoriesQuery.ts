import { z } from "zod";

import { FIND_DOCK_CATEGORIES } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { RolesSchema } from "../../../../types/schemas.ts";

export const DockAppSchema = z.object({
  uid: z.number(),
  id: z.number(),
  name: z.string(),
  displayName: z.string(),
  appVersion: z.string(),
  creator: z.string(),
  rootURI: z.string(),
  helpURI: z.string(),
  provisionType: z.string(),
  deployMode: z.string().optional(),
  authScheme: z.string(),
  createdDate: z.number(),
  createdBy: z.number(),
  modifiedDate: z.number(),
  modifiedBy: z.number(),
  supportReactivate: z.boolean(),
  supportsAttemptScore: z.boolean(),
  secureLaunch: z.boolean(),
  ltiCompliant: z.boolean(),
  ltiVersion: z.string(),
  sharedSecret: z.boolean(),
  categories: z.array(z.string()),
  features: z.record(z.string(), z.boolean()),
});
export type DockApp = z.infer<typeof DockAppSchema>;

export const DockAppCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
  description: z.string(),
  role: z.array(RolesSchema),
  modifiedDate: z.string(),
  apps: z.array(DockAppSchema).optional(),
});
export type DockAppCategory = z.infer<typeof DockAppCategorySchema>;

export const dockCategoriesQuery = (ssId: number) =>
  HttpService.get(FIND_DOCK_CATEGORIES, {
    searchParams: {
      ssId,
    },
    context: {
      errorDescription: "fetch dock apps categories data",
    },
  }).json(DockAppCategorySchema.array());
