import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse } from "msw";

import { MOVE_ACTIVITY } from "../../constants/APIPaths.ts";
import {
  createActivity,
  createEmptyMeta,
  createNodesMap,
  createTopic,
  rootTopicId,
} from "../../pages/learning-path/NodeLocation/NodeLocation.testUtils.ts";
import defaultPreloadedState from "../../store/__fixtures__/stateSnapshot.json";
import type { AppState } from "../../types/reduxTypes.ts";
import {
  getHelpers,
  overrideAPI,
  updateObjectByPaths,
} from "../../utilities/testUtils.tsx";
import MoveActivityModal from "./MoveActivityModal.tsx";

const activityId = 101;

function renderMoveActivityModal({
  onClose = vi.fn(),
  stateUpdates = {},
}: {
  onClose?: (value?: unknown) => void;
  stateUpdates?: Record<string, unknown>;
} = {}) {
  const nodes = createNodesMap();
  const { store, wrapper } = getHelpers({
    preloadedState: updateObjectByPaths(
      defaultPreloadedState as unknown as AppState,
      {
        "workflow.rootTopicId": rootTopicId,
        "workflow.nodes": nodes,
        ...stateUpdates,
      },
    ),
  });

  render(<MoveActivityModal data={{ activityId }} onClose={onClose} />, {
    wrapper,
  });

  return { onClose, store };
}

function openFolderSelect() {
  fireEvent.click(screen.getByRole("combobox", { name: "Folder" }));
}

async function selectFolderOption(name: string) {
  openFolderSelect();
  fireEvent.click(await screen.findByRole("option", { name }));
}

describe("MoveActivityModal component", () => {
  it("renders the move activity dialog with folder and placement fields", () => {
    renderMoveActivityModal();

    expect(
      screen.getByRole("dialog", { name: "Choose Activity's Location" }),
    ).toBeVisible();
    expect(screen.getByText("Choose location for")).toBeVisible();
    expect(screen.getByRole("combobox", { name: "Folder" })).toBeVisible();
    expect(screen.getByRole("combobox", { name: "Placement" })).toBeVisible();
    expect(screen.getByRole("button", { name: "SAVE" })).toBeDisabled();
  });

  it("returns null when the activity is missing from workflow state", () => {
    const nodes = {
      topics: {
        10: createTopic({ id: 10, order: 0 }),
        20: createTopic({ id: 20, name: "Other folder", order: 1 }),
      },
      activities: {
        100: createActivity({ id: 100, parentId: 10, order: 0 }),
      },
      meta: {
        [rootTopicId]: createEmptyMeta([10, 20]),
        10: createEmptyMeta([100]),
        20: createEmptyMeta(),
        100: createEmptyMeta(),
      },
    };

    renderMoveActivityModal({
      stateUpdates: {
        "workflow.nodes": nodes,
      },
    });

    expect(
      screen.queryByRole("dialog", { name: "Choose Activity's Location" }),
    ).not.toBeInTheDocument();
  });

  it("closes the modal after a successful save", async () => {
    const onClose = vi.fn();
    renderMoveActivityModal({ onClose });

    await selectFolderOption("Other folder");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "SAVE" })).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole("button", { name: "SAVE" }));

    await waitFor(() => expect(onClose).toHaveBeenCalledWith(true));
  });

  it("shows a danger toast when saving fails", async () => {
    overrideAPI(MOVE_ACTIVITY, "put", () =>
      HttpResponse.json({ message: "Move failed" }, { status: 500 }),
    );

    const { onClose, store } = renderMoveActivityModal();

    await selectFolderOption("Other folder");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "SAVE" })).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole("button", { name: "SAVE" }));

    await waitFor(() => {
      expect(store.getState().workflow.toasts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: "Failed to update an activity",
            variant: "danger",
          }),
        ]),
      );
    });
    expect(onClose).not.toHaveBeenCalledWith(true);
  });

  it("closes the modal without saving when cancel is clicked", () => {
    const onClose = vi.fn();
    renderMoveActivityModal({ onClose });

    fireEvent.click(screen.getByRole("button", { name: "CANCEL" }));

    expect(onClose).toHaveBeenCalledWith(false);
  });
});
