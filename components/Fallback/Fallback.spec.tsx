import { act, render, screen } from "@testing-library/react";
import * as React from "react";

import { getHelpers } from "../../utilities/testUtils.tsx";
import Loading from "../Loading/Loading.tsx";
import Fallback from "./Fallback.ts";

describe("Fallback component", () => {
  it("should set loading state while acting as fallback for Suspense", async () => {
    const { wrapper } = getHelpers();
    const deferred = Promise.withResolvers<{
      default: React.ComponentType;
    }>();
    const Lazy = React.lazy(() => deferred.promise);
    render(
      <>
        <Loading />
        <React.Suspense fallback={<Fallback />}>
          <Lazy />
        </React.Suspense>
      </>,
      { wrapper },
    );
    expect(screen.getByText(/loading/i)).toBeVisible();
    act(() => {
      deferred.resolve({ default: () => <>Lazy loaded</> });
    });
    expect(await screen.findByText("Lazy loaded")).toBeVisible();
  });
});
