import { z } from "zod";

import {
  SIDEBAR_POLICY_LOGOUT,
  USER_LOGOUT,
  WF_POLICY_LOGOUT,
} from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

const PAGES = ["/static/nb/login.html", "/static/nb/logout.html"];
const LogoutSchema = z.object({
  url: z.string().optional(),
  doubleLogoutIsRequired: z.boolean(),
});
export type Logout = z.infer<typeof LogoutSchema>;

export const logoutQuery = async () => {
  const response = await HttpService.get(USER_LOGOUT, {
    context: {
      errorDescription: "log out user",
    },
  }).json(LogoutSchema);

  window.location.href =
    PAGES.find((page) => response?.url?.includes(page)) ||
    response.doubleLogoutIsRequired
      ? WF_POLICY_LOGOUT
      : SIDEBAR_POLICY_LOGOUT;
};
