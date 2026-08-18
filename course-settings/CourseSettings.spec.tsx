import { render, screen } from "@testing-library/react";

import defaultPreloadedState from "../../store/__fixtures__/stateSnapshot.json";
import type { AppState } from "../../types/reduxTypes.ts";
import { getHelpers, updateObjectByPaths } from "../../utilities/testUtils.tsx";
import { COURSE_SETTINGS_TILES } from "./CourseSettings.constants.ts";
import CourseSettings from "./CourseSettings.tsx";

function getStateWithStudentAssistant(
  courseStatus: AppState["studentAssistant"]["courseStatus"],
) {
  return updateObjectByPaths(defaultPreloadedState as AppState, {
    "studentAssistant.courseStatus": courseStatus,
    "studentAssistant.activityStatuses": {},
    "studentAssistant.supportedAppIds": [],
  });
}

describe("CourseSettings page", () => {
  it("renders visible course settings tiles with icon, title, and description", () => {
    const { wrapper } = getHelpers({
      preloadedState: getStateWithStudentAssistant("ENABLED"),
    });

    render(<CourseSettings />, { wrapper });

    const visibleTiles = COURSE_SETTINGS_TILES.filter((tile) => tile.visible);

    expect(
      screen.getByRole("heading", { name: "Course Settings" }),
    ).toBeVisible();
    expect(screen.getByRole("list", { name: "Course settings" })).toBeVisible();

    for (const tile of visibleTiles) {
      expect(screen.getByRole("heading", { name: tile.title })).toBeVisible();
      expect(screen.getByText(tile.description)).toBeVisible();
    }

    expect(
      screen.getByRole("heading", { name: "AI Tool Settings" }),
    ).toBeVisible();
  });

  it("hides AI Tool Settings tile when student assistant is not supported", () => {
    const { wrapper } = getHelpers({
      preloadedState: getStateWithStudentAssistant("NOT_SUPPORTED"),
    });

    render(<CourseSettings />, { wrapper });

    expect(
      screen.queryByRole("heading", { name: "AI Tool Settings" }),
    ).not.toBeInTheDocument();
  });
});
