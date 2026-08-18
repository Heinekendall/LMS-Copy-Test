import { z } from "zod";

import { PRODUCT_SPLASH_CONTENT } from "../../../../constants/APIPaths.ts";
import { HttpService } from "../../../../services/httpService.ts";

export const ProductInfoSchema = z.object({
  productInfo: z.string(),
});

export type ProductInfo = z.infer<typeof ProductInfoSchema>;

export const productInfoQuery = () =>
  HttpService.get(`${PRODUCT_SPLASH_CONTENT}`, {
    context: {
      errorDescription: "fetch product info",
    },
  }).json(ProductInfoSchema);
