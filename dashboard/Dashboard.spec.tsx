import { render, screen } from "@testing-library/react";

import defaultPreloadedState from "../../store/__fixtures__/stateSnapshot.json";
import type { AppState } from "../../types/reduxTypes.ts";
import { getHelpers, updateObjectByPaths } from "../../utilities/testUtils.tsx";
import Dashboard from "./Dashboard.tsx";

function getStateWithoutDashboard() {
  return updateObjectByPaths(defaultPreloadedState as AppState, {
    "instructorInsights.isActive": false,
    "instructorInsights.updatedOn": null,
  });
}

describe("Dashboard page", () => {
  beforeEach(() => {
    document.location.pathname = "/";
    document.location.search = "?snapshotId=217422&eISBN=9798214120959";
  });

  it("renders the Dashboard page title when dashboard is enabled", () => {
    const { wrapper } = getHelpers();

    render(<Dashboard />, { wrapper });

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });

  it("redirects to Learning Path when dashboard is disabled", async () => {
    const { wrapper } = getHelpers({
      extraRoutes: [{ path: "/learning-path", element: null }],
      preloadedState: getStateWithoutDashboard(),
    });

    render(<Dashboard />, { wrapper });

    expect(
      screen.queryByRole("heading", { name: "Dashboard" }),
    ).not.toBeInTheDocument();
    await vi.waitFor(() => {
      expect(document.location.pathname).toBe("/learning-path");
    });
    expect(document.location.search).toBe(
      "?snapshotId=217422&eISBN=9798214120959",
    );
  });
});
