import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HelpOutlineIcon } from "react-magma-icons";
import { Outlet } from "react-router-dom";

import { mindtapRoutes } from "../../router.tsx";
import defaultPreloadedState from "../../store/__fixtures__/stateSnapshot.json";
import type { AppState } from "../../types/reduxTypes.ts";
import {
  getHelpers,
  setMediaQueryMatches,
  updateObjectByPaths,
} from "../../utilities/testUtils.tsx";
import Sidebar from "./Sidebar";
import SidebarLink from "./SidebarLink/SidebarLink.tsx";

function getStateWithoutDashboard() {
  return updateObjectByPaths(defaultPreloadedState as AppState, {
    "instructorInsights.isActive": false,
    "instructorInsights.updatedOn": null,
  });
}

describe("Sidebar component", () => {
  beforeEach(() => {
    document.location.pathname = "/";
    document.location.search = "?snapshotId=217422&eISBN=9798214120959";
  });

  function renderSidebar({
    isResponsive = false,
    isVisible = true,
    onToggle = vi.fn(),
    preloadedState,
  }: {
    isResponsive?: boolean;
    isVisible?: boolean;
    onToggle?: () => void;
    preloadedState?: AppState;
  }) {
    setMediaQueryMatches(isResponsive);

    const { wrapper } = getHelpers({
      preloadedState,
      routeChildren: mindtapRoutes,
    });

    render(
      <>
        <Sidebar isVisible={isVisible} onToggle={onToggle} />
        <Outlet />
      </>,
      { wrapper },
    );

    return { onToggle };
  }

  it("renders desktop navigation links without Dashboard when it is disabled", () => {
    renderSidebar({ preloadedState: getStateWithoutDashboard() });

    expect(screen.getByAltText("Cengage Mindtap Logo")).toBeVisible();
    expect(
      screen.queryByRole("link", { name: "Switch to Dashboard tab" }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(screen.getAllByRole("link").map((el) => el.textContent))
      .toMatchInlineSnapshot(`
      [
        "Learning Path",
        "Course Settings",
        "Gradebook",
        "More Tools",
        "Support",
      ]
    `);
  });

  it("renders Dashboard when the course has active insights data", () => {
    document.location.pathname = "/dashboard";
    renderSidebar({});

    expect(screen.getAllByRole("link")).toHaveLength(6);
    expect(
      screen.getByRole("link", { name: "Switch to Dashboard tab" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("collapses and expands the desktop navigation labels", () => {
    renderSidebar({});

    fireEvent.click(
      screen.getByRole("button", { name: "Collapse Sidebar menu" }),
    );

    expect(
      screen.getByRole("button", { name: "Expand Sidebar menu" }),
    ).toBeVisible();
    expect(screen.queryByText("Learning Path")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Switch to Learning Path tab" }),
    ).toBeVisible();

    fireEvent.click(
      screen.getByRole("button", { name: "Expand Sidebar menu" }),
    );

    expect(
      screen.getByRole("button", { name: "Collapse Sidebar menu" }),
    ).toBeVisible();
    expect(screen.getByText("Learning Path")).toBeVisible();
  });

  it("changes document URL on link nav", () => {
    document.location.pathname = "/dashboard";
    renderSidebar({});

    expect(document.location.pathname).toBe("/dashboard");

    fireEvent.click(
      screen.getByRole("link", { name: "Switch to Learning Path tab" }),
    );

    expect(document.location.pathname).toBe("/learning-path");

    fireEvent.click(
      screen.getByRole("link", { name: "Switch to Support tab" }),
    );

    expect(document.location.pathname).toBe("/support");
  });

  it("renders responsive drawer content and closes it", async () => {
    const { onToggle } = renderSidebar({
      isResponsive: true,
    });

    expect(screen.getByRole("dialog", { name: "Sidebar menu" })).toBeVisible();
    expect(screen.getByText("TestInst Kyrylo")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Close sidebar menu" }));

    await waitFor(() => {
      expect(onToggle).toHaveBeenCalledWith(false);
    });
  });
});

describe("SidebarLink component", () => {
  beforeEach(() => {
    document.location.pathname = "/";
    document.location.search = "?snapshotId=217422&eISBN=9798214120959";
    setMediaQueryMatches(false);
  });

  it("renders without an alternate active icon", () => {
    const { wrapper } = getHelpers();
    const { container } = render(
      <SidebarLink
        collapsed={false}
        icon={<HelpOutlineIcon />}
        label="Help"
        link="help"
      />,
      { wrapper },
    );

    expect(
      screen.getByRole("link", { name: "Switch to Help tab" }),
    ).toBeVisible();
    expect(container.querySelector("[data-primary-icon]")).toBeInTheDocument();
    expect(container.querySelector("[data-alt-icon]")).not.toBeInTheDocument();
  });
});
