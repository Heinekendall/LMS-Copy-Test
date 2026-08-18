import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { HttpResponse } from "msw";

import App from "./App.tsx";
import { COURSE_DATA, USER_PROFILE_DATA } from "./constants/APIPaths.ts";
import { mindtapRoutes } from "./router.tsx";
import stateSnapshot from "./store/__fixtures__/stateSnapshot.json";
import type { AppState } from "./types/reduxTypes.ts";
import {
  getHelpers,
  overrideAPI,
  updateObjectByPaths,
  waitForQueries,
} from "./utilities/testUtils.tsx";

describe("App", () => {
  function setAppLocation(pathname = "/learning-path", extraSearch = "") {
    window.history.pushState(
      {},
      "",
      `${pathname}?snapshotId=217422&eISBN=9798214120959${extraSearch}`,
    );
  }

  beforeEach(() => {
    setAppLocation();
  });

  async function renderApp() {
    const { wrapper, store } = getHelpers({
      preloadedState: {} as AppState,
      routeChildren: mindtapRoutes,
    });
    const view = render(<App />, { wrapper });

    return { view, store };
  }

  test("must render loading indicator", async () => {
    setAppLocation();
    await renderApp();
    expect(screen.getByText(/loading/i)).toBeVisible();

    await waitForQueries();

    expect(
      screen.getByRole("heading", { name: "Learning Path" }),
    ).toBeVisible();
  });

  test("must produce state equal to initial loading", async () => {
    setAppLocation();
    const { store } = await renderApp();

    await waitForQueries();

    expect(store.getState()).toEqual(stateSnapshot);
  });

  test("must render critical error modal instead of UI if some API call fails", async () => {
    setAppLocation();
    overrideAPI(
      USER_PROFILE_DATA,
      "get",
      () => new HttpResponse(null, { status: 500 }),
    );
    await renderApp();
    await waitForQueries();
    expect(
      screen.getByRole("dialog", { name: "Something went wrong" }),
    ).toBeVisible();
  });

  test("must show unarchive modal if snapshot is archived", async () => {
    setAppLocation();
    overrideAPI(`${COURSE_DATA}/:snapshotId`, "get", () =>
      import("../mocks/__fixtures__/nb.service.snapshot+id.json").then(
        ({ default: json }) =>
          HttpResponse.json(
            updateObjectByPaths(json, {
              isArchived: true,
            }),
          ),
      ),
    );
    await renderApp();
    await waitForQueries();

    expect(
      screen.getByRole("dialog", { name: "Archived course" }),
    ).toBeVisible();

    vi.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: "Unarchive now" }));

    expect(screen.getByText("Loading, please wait")).toBeInTheDocument();

    vi.advanceTimersByTime(1000);

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading, please wait"),
    );
    expect(
      screen.queryByRole("dialog", { name: "Archived course" }),
    ).toBeNull();
  });

  describe("Tab navigation", () => {
    test("must render Learning Path by default", async () => {
      setAppLocation();
      await renderApp();
      await waitForQueries();

      expect(
        screen.getByRole("heading", { name: "Learning Path" }),
      ).toBeVisible();
      expect(document.location.pathname).toBe("/learning-path");
    });

    test("must hide app navigation in course preview mode", async () => {
      setAppLocation("/learning-path", "&courseEntrySetup=preview");
      await renderApp();
      await waitForQueries();

      expect(
        screen.getByRole("region", { name: "Course Preview" }),
      ).toBeVisible();
      expect(
        screen.queryByText(
          "COMPTIA LINUX+ AND LPIC-1 GUIDE TO LINUX CERTIFICATION",
        ),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "Switch to Learning Path tab" }),
      ).not.toBeInTheDocument();
    });

    test("must render dashboard route", async () => {
      setAppLocation("/dashboard");
      await renderApp();
      await waitForQueries();

      expect(screen.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    });

    test("must render specific tab if route matches", async () => {
      setAppLocation("/course-settings");
      await renderApp();
      await waitForQueries();

      expect(
        screen.getByRole("heading", { name: "Course Settings" }),
      ).toBeVisible();
    });

    test("must navigate to specific tab", async () => {
      setAppLocation();
      await renderApp();
      await waitForQueries();

      fireEvent.click(
        screen.getByRole("link", { name: "Switch to More Tools tab" }),
      );

      expect(screen.getByRole("heading", { name: "More Tools" })).toBeVisible();
    });
  });
});
