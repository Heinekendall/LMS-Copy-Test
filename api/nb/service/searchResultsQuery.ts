import { z } from "zod";

import { SEARCH } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

const SearchHitSchema = z.object({
  index: z.union([
    z.literal("activity"),
    z.literal("annotation"),
    z.literal("glossary"),
  ]),
  score: z.number(),
  fields: z.object({
    activityName: z.string().optional(),
    activityId: z.number(),
    activityType: z.number(),
    activityDesc: z.string().optional(),
    bookmark: z.string().optional(),
    definition: z.string().optional(),
    docTitle: z.string().optional(),
    term: z.string().optional(),
  }),
  highlight: z.object({
    content: z.array(z.string()),
  }),
});
export type SearchHit = z.infer<typeof SearchHitSchema>;

export const SearchResultsSchema = z.object({
  hits: z.object({
    total: z.number(),
    hits: z.array(SearchHitSchema),
  }),
});
export type SearchResults = z.infer<typeof SearchResultsSchema>;

export const searchResultsQuery = (
  snapshotId: number,
  query: string,
  index: number,
) =>
  HttpService.get(`${SEARCH}/${snapshotId}`, {
    searchParams: {
      q: query,
      from: index,
      size: "10",
    },
    headers: { Accept: "application/vnd.search.v1+json" },
    context: {
      errorDescription: "fetch search results",
    },
  }).json(SearchResultsSchema);
