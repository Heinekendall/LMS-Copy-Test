import { z } from "zod";

import * as APIPaths from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";
import { CapabilitiesSchema, RolesSchema } from "../../../../types/schemas.ts";

export const UserProfileDataSchema = z.object({
  id: z.number(),
  user: z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    imsSourceName: z.string(),
    imsSourceId: z.string(),
    email: z.string(),
  }),
  org: z.object({
    id: z.number(),
    name: z.string(),
    type: z.number(),
    externalId: z.string(),
    path: z.string(),
    courseCount: z.number(),
    courseSearchCount: z.number(),
    userSearchCount: z.number(),
    instructors: z.array(z.unknown()),
    settings: z.object({}),
  }),
  role: RolesSchema,
  permissions: z.array(z.string()),
  capabilities: CapabilitiesSchema.array(),
  evoBetaUser: z.string().optional(),
  orgParentId: z.number().optional(),
  sseToken: z.string(),
  sseHost: z.string(),
  isSsoInstructor: z.boolean(),
  isK12User: z.boolean(),
  amplitudeUserId: z.string(),
  amplitudeUserGuid: z.string(),
});
export type UserProfileData = z.infer<typeof UserProfileDataSchema>;

export const currentUserQuery = () =>
  HttpService.get(APIPaths.USER_PROFILE_DATA, {
    context: {
      errorDescription: "fetch user profile data",
    },
  }).json(UserProfileDataSchema);
