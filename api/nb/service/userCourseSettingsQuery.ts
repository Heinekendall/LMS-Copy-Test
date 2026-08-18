import { z } from "zod";

import { USER_COURSE_SETTINGS } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const UserCourseSettingsSchema = z.looseObject({
  displayStudentAiModal: z.boolean().optional(),
});
export type UserCourseSettings = z.infer<typeof UserCourseSettingsSchema>;

export const userCourseSettingsQuery = () =>
  HttpService.get(USER_COURSE_SETTINGS, {
    context: {
      errorDescription: "fetch user course settings",
    },
  }).json(UserCourseSettingsSchema);
