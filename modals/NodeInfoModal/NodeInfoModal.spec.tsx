import { fireEvent, render, screen } from "@testing-library/react";

import type { ActivityNode } from "../../api/nb/service/nextbook/nodesQuery.ts";
import {
  ACTIVITY_TYPES,
  NODE_TYPES,
} from "../../constants/activityConstants.ts";
import focusManager from "../../services/focusManager.ts";
import defaultPreloadedState from "../../store/__fixtures__/stateSnapshot.json";
import type { AppState } from "../../types/reduxTypes.ts";
import type { NodeMetadata } from "../../types/types.ts";
import { getHelpers, updateObjectByPaths } from "../../utilities/testUtils.tsx";
import NodeInfoModal from "./NodeInfoModal.tsx";

const futureStartDate = Date.UTC(2030, 0, 15, 17, 30);

function createActivity(overrides: Partial<ActivityNode> = {}): ActivityNode {
  return {
    id: 1001,
    name: "Practice <strong>Quiz</strong>",
    description: "Complete <em>chapter one</em> before class.",
    order: 1,
    visibleToStudent: true,
    isPasswordProtected: false,
    type: NODE_TYPES.ACTIVITY,
    parentId: 10,
    scorable: true,
    maxScore: 10.25,
    isTimed: false,
    manuallyGraded: false,
    activityType: ACTIVITY_TYPES.ASSESSMENT,
    appId: 20,
    appActivityId: 30,
    ...overrides,
  };
}

function createMetadata(
  overrides: NodeMetadata["metadata"] = {},
): NodeMetadata["metadata"] {
  return {
    totalStudentCount: 5,
    submissionCount: 3,
    classAvg: "84%",
    ...overrides,
  };
}

function renderNodeInfoModal({
  activity = createActivity(),
  metadata = createMetadata(),
  stateUpdates = {},
  onClose = vi.fn(),
}: {
  activity?: ActivityNode;
  metadata?: NodeMetadata["metadata"];
  stateUpdates?: Record<string, unknown>;
  onClose?: () => void;
} = {}) {
  const { wrapper } = getHelpers({
    preloadedState: updateObjectByPaths(defaultPreloadedState as AppState, {
      ...stateUpdates,
    }),
  });

  render(<NodeInfoModal data={{ activity, metadata }} onClose={onClose} />, {
    wrapper,
  });

  return { onClose };
}

describe("NodeInfoModal component", () => {
  it("renders unlocked scorable activity details and summary metrics", () => {
    renderNodeInfoModal();

    expect(
      screen.getByRole("dialog", { name: "Activity Detail" }),
    ).toBeVisible();
    expect(screen.getByText("Practice")).toBeVisible();
    expect(screen.getByText("Quiz")).toBeVisible();
    expect(screen.getByText("Complete", { exact: false })).toHaveTextContent(
      "Complete chapter one before class.",
    );
    expect(screen.getByText("3/5 submitted")).toBeVisible();
    expect(screen.getByText("60% submitted")).toBeVisible();
    expect(screen.getByText("84% avg score")).toBeVisible();
    expect(screen.getByText("10.3 points")).toBeVisible();
    expect(screen.queryByText(/Unlocks/)).not.toBeInTheDocument();
    expect(screen.queryByText("password required")).not.toBeInTheDocument();
  });

  it("renders password protection when the feature flag and activity setting are enabled", () => {
    renderNodeInfoModal({
      activity: createActivity({ isPasswordProtected: true }),
      stateUpdates: {
        "featureFlags.PasswordProtectionEnabled": true,
      },
    });

    expect(screen.getByText("password required")).toBeVisible();
  });

  it("does not render password protection when the feature flag is disabled", () => {
    renderNodeInfoModal({
      activity: createActivity({ isPasswordProtected: true }),
      stateUpdates: {
        "featureFlags.PasswordProtectionEnabled": false,
      },
    });

    expect(screen.queryByText("password required")).not.toBeInTheDocument();
  });

  it("renders locked activity information without open submission metrics", () => {
    renderNodeInfoModal({
      activity: createActivity({
        startDate: futureStartDate,
      }),
    });

    expect(screen.getByText(/Unlocks Jan 15 @/)).toBeVisible();
    expect(screen.queryByText("3/5 submitted")).not.toBeInTheDocument();
    expect(screen.queryByText("60% submitted")).not.toBeInTheDocument();
    expect(screen.queryByText("84% avg score")).not.toBeInTheDocument();
    expect(screen.getByText("10.3 points")).toBeVisible();
  });

  it("renders accessible fallback text when the average score is unavailable", () => {
    renderNodeInfoModal({
      metadata: createMetadata({
        classAvg: undefined,
        submissionCount: 0,
      }),
    });

    expect(screen.queryByText("0/5 submitted")).not.toBeInTheDocument();
    expect(screen.getByText("0% submitted")).toBeVisible();
    expect(screen.getByText("Average score not available")).toBeInTheDocument();
    expect(screen.getByText("- - avg score")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("omits optional description and scoring details for non-scorable activities", () => {
    renderNodeInfoModal({
      activity: createActivity({
        description: "",
        scorable: false,
        maxScore: undefined,
      }),
    });

    expect(
      screen.queryByText("Complete", { exact: false }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/submitted/)).not.toBeInTheDocument();
    expect(screen.queryByText(/avg score/)).not.toBeInTheDocument();
    expect(screen.queryByText(/points/)).not.toBeInTheDocument();
  });

  it("closes the modal and restores focus to the info trigger", async () => {
    const restoreSpy = vi.spyOn(focusManager, "restore");
    const { onClose } = renderNodeInfoModal();

    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));

    await vi.waitFor(() => expect(onClose).toHaveBeenCalledOnce());
    expect(restoreSpy).toHaveBeenCalledWith("open-activity-info-modal");
  });
});
