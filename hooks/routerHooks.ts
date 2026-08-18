import * as React from "react";
import {
  type NavigateFunction,
  type NavigateOptions,
  type To,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { updateSearch } from "../utilities/routingUtils.ts";

export function useAppNavigate(): NavigateFunction {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return React.useCallback(
    (to: number | To, options?: NavigateOptions) => {
      if (typeof to === "number") {
        return navigate(to);
      }

      if (typeof to === "string") {
        const path = to + "?" + searchParams.toString();
        return navigate(path, options);
      }

      return navigate({
        pathname: to.pathname,
        search: updateSearch(location.search, to.search),
        hash: to.hash,
      });
    },
    [navigate, searchParams, location],
  );
}
