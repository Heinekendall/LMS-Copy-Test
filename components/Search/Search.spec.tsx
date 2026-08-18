import { fireEvent, render, screen } from "@testing-library/react";
import { AlertVariant } from "react-magma-dom";

import { ROLES } from "../../constants/roleConstants.ts";
import stateSnapshot from "../../store/__fixtures__/stateSnapshot.json";
import { SearchSelectors } from "../../store/search/search.ts";
import { WorkflowSelectors } from "../../store/workflow/workflow.ts";
import type { AppState } from "../../types/reduxTypes.ts";
import type { NormalizedSearchHit } from "../../types/types.ts";
import {
  getHelpers,
  updateObjectByPaths,
  waitForQueries,
} from "../../utilities/testUtils.tsx";
import Search from "./Search.tsx";

const initialSearchState = {
  hits: [],
  total: 0,
  hasMore: false,
  initial: false,
  isLoading: false,
  index: 0,
  maxBackendScore: 0,
};

const searchHit: NormalizedSearchHit = {
  score: 1,
  _source: {
    title: "Stored activity result",
    activityId: 43892049,
    bookmark: {},
    isGlossary: false,
    activityType: 5,
    docTitle: "",
    activityDesc: "Stored activity description",
  },
  highlight: {
    content: ["Stored activity description"],
  },
};

function renderSearch({
  onClose = vi.fn(),
  stateUpdates = {},
}: {
  onClose?: (restoreFocus?: boolean) => void;
  stateUpdates?: Record<string, unknown>;
} = {}) {
  const { store, wrapper } = getHelpers({
    preloadedState: updateObjectByPaths(stateSnapshot as AppState, {
      ...stateUpdates,
    }),
  });
  const view = render(<Search onClose={onClose} />, { wrapper });

  return { ...view, onClose, store };
}

describe("Search component", () => {
  it("renders the search input, close button, and search tips by default", () => {
    renderSearch();

    expect(
      screen.getByRole("textbox", { name: "Search this course" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Cancel Search" })).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "What can I search for?" }),
    ).toBeVisible();
    expect(screen.getByText("Activity")).toBeVisible();
  });

  it("calls onClose when the cancel button is clicked", () => {
    const { onClose } = renderSearch();

    fireEvent.click(screen.getByRole("button", { name: "Cancel Search" }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith();
  });

  it("calls onClose when Escape is pressed", () => {
    const { onClose } = renderSearch();

    fireEvent.keyDown(window, { code: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders existing search results from state", () => {
    renderSearch({
      stateUpdates: {
        search: {
          ...initialSearchState,
          hits: [searchHit],
          total: 1,
          initial: true,
          index: 10,
          maxBackendScore: 1,
        },
      },
    });

    expect(screen.getByText("1 results found")).toBeVisible();
    expect(screen.getByText("Stored activity result")).toBeVisible();
    expect(screen.getByText("Stored activity description")).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "What can I search for?" }),
    ).not.toBeInTheDocument();
  });

  it("renders the no results message after an empty search", () => {
    renderSearch({
      stateUpdates: {
        search: {
          ...initialSearchState,
          initial: true,
        },
      },
    });

    expect(
      screen.getByText(
        "Your search did not return any results. Check your criteria and try again.",
      ),
    ).toBeVisible();
  });

  it("loads search results when Enter is pressed in the search input", async () => {
    const { store } = renderSearch();
    const input = screen.getByRole("textbox", { name: "Search this course" });

    fireEvent.change(input, { target: { value: "Full" } });
    fireEvent.keyUp(input, { code: "Enter" });

    await waitForQueries();

    expect(screen.getByText("Full Book Plank changed name")).toBeVisible();
    expect(
      SearchSelectors.getSearchState(store.getState()).total,
    ).toBeGreaterThan(0);
  });

  it("clears search state on unmount", () => {
    const { store, unmount } = renderSearch({
      stateUpdates: {
        search: {
          ...initialSearchState,
          hits: [searchHit],
          total: 1,
          hasMore: true,
          initial: true,
          index: 10,
          maxBackendScore: 1,
        },
      },
    });

    unmount();

    expect(SearchSelectors.getSearchState(store.getState())).toEqual(
      initialSearchState,
    );
  });

  it("renders the populate button for super admins in non-master courses", () => {
    renderSearch({
      stateUpdates: {
        "userProfile.userProfileData.role": ROLES.SUPER_ADMIN,
      },
    });

    expect(
      screen.getByRole("button", { name: "Populate Search Data" }),
    ).toBeVisible();
  });

  it("requests search data population and shows a toast when the populate button is clicked", async () => {
    const { store } = renderSearch({
      stateUpdates: {
        "userProfile.userProfileData.role": ROLES.SUPER_ADMIN,
      },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Populate Search Data" }),
    );

    await waitForQueries();

    expect(WorkflowSelectors.getToasts(store.getState())).toEqual([
      expect.objectContaining({
        message: "Indexing your course. Please retry your search in 10 minutes",
        variant: AlertVariant.success,
      }),
    ]);
  });
});
