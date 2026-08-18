import { z } from "zod";

import { ANNOUNCEMENTS } from "../../constants/APIPaths.ts";
import { HttpService } from "../../services/httpService.ts";

export const AnnouncementSchema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string(),
  message: z.string(),
  isCluiAnnouncement: z.boolean().optional(),
});
export type Announcement = z.infer<typeof AnnouncementSchema>;

export const announcementsQuery = (query: string) =>
  HttpService.get(`${ANNOUNCEMENTS}/active${query}`, {
    context: {
      errorDescription: "fetch active announcements",
    },
  }).json(AnnouncementSchema.array());

// TODO add response schema
export const acknowledgeAnnouncementQuery = (announcement: Announcement) =>
  HttpService.post(`${ANNOUNCEMENTS}/dismiss`, {
    json: announcement,
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
    },
    context: {
      errorDescription: "acknowledge announcement",
    },
  }).json();
