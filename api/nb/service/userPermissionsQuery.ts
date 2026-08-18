import { z } from "zod";

import { COURSE_SETTINGS_USERS_PERMISSIONS } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";
import { RolesSchema } from "../../../types/schemas.ts";

const CapabilitySchema = z.object({
  id: z.number(),
  name: z.string(),
  displayOrder: z.number(),
  isAllowed: z.boolean(),
  get children() {
    return z.array(CapabilitySchema).optional();
  },
});
export const UserPermissionsSchema = z.object({
  userId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  userOrgProfileId: z.number(),
  role: RolesSchema,
  orgId: z.number(),
  capabilities: z.array(CapabilitySchema),
});
export type UserPermissions = z.infer<typeof UserPermissionsSchema>;

export const userPermissionsQuery = (orgId: number, snapshotId: number) =>
  HttpService.get(
    `${COURSE_SETTINGS_USERS_PERMISSIONS}/${orgId}/${snapshotId}`,
    {
      headers: {
        Accept: "application/json",
      },
      context: {
        errorDescription: "fetch users permissions settings",
      },
    },
  ).json(UserPermissionsSchema.array());
