import { z } from "zod";

import { GOPHER } from "../../../constants/APIPaths.ts";
import { HttpService } from "../../../services/httpService.ts";

export const GopherQuerySchema = z.object({
  count: z.number(),
  messages: z.string().array(),
  entities: z
    .object({
      entity: z.object({
        _index: z.string(),
        _id: z.string(),
        _score: z.number(),
        _type: z.string(),
        _source: z.object({
          instanceId: z.string(),
          attributes: z.record(z.string(), z.unknown()),
        }),
      }),
    })
    .array(),
  metadata: z.object({ filters: z.object() }),
});
export type GopherQuery = z.infer<typeof GopherQuerySchema>;

/**
 * communicates with Cengage's GOPHER API
 * for docs and query examples, see https://stash.cengage.com/projects/INC/repos/gopher/browse
 */
export const gopherQuery = (json: unknown) =>
  HttpService.post(`${GOPHER}/query`, {
    json,
    headers: {
      "Cache-Control": "no-cache",
      "X-Consumer-Name": "mindtap-mtevo",
      Accept: "*/*",
    },
    context: {
      errorDescription: "execute gopher query",
    },
  }).json(GopherQuerySchema);
