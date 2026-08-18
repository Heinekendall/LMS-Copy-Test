import { isFulfilled } from "@reduxjs/toolkit";
import { initGTM, installOneTrustConsentProvider } from "mt-gtm-lib";
import * as React from "react";
import { useMediaQuery } from "react-magma-dom";
import { useSearchParams } from "react-router-dom";

import { IPAD_BREAKPOINT } from "./constants/commonConstants.ts";
import { useAppDispatch } from "./hooks/reduxHooks.ts";
import { loadOneTrustScript } from "./services/oneTrust.ts";
import { ActivityTypesActions } from "./store/activityTypes.ts";
import { AnnouncementActions } from "./store/announcements.ts";
import { CareerReadinessActions } from "./store/careerReadiness.ts";
import { CourseSettingsActions } from "./store/courseSettings.ts";
import { CsrfTokenActions } from "./store/csrfToken.ts";
import { FeatureFlagsActions } from "./store/featureFlags.ts";
import { InstructorInsightsActions } from "./store/instructorInsights.ts";
import { LayoutContainerActions } from "./store/layoutContainer/layoutContainer.ts";
import { NotebookLMActions } from "./store/notebookLM.ts";
import {
  SnapshotActions,
  SnapshotSelectors,
} from "./store/snapshot/snapshot.ts";
import { SsoTokenActions } from "./store/ssoToken.ts";
import { StudentAssistantActions } from "./store/studentAssistant.ts";
import { UserCourseSettingsActions } from "./store/userCourseSettings.ts";
import {
  UserProfileActions,
  UserProfileSelectors,
} from "./store/userProfile.ts";
import { WorkflowActions } from "./store/workflow/workflow.ts";
import type { AppThunkAction } from "./types/reduxTypes.ts";
import { isWLCourse } from "./utilities/courseUtils.ts";
import { isInstructorLikeRole } from "./utilities/userProfileUtils.ts";

const handleCourseMetadata =
  (): AppThunkAction<Promise<void>> => async (dispatch, getState) => {
    const state = getState();
    const { snapshot } = SnapshotSelectors.getSnapshotData(state);
    const { role } = UserProfileSelectors.getUserProfile(state);
    let discipline = "";

    // Some masters do not have a CGI because they don't have an LCS workspace.
    // In that case the child snapshots also won't have a CGI.
    if (snapshot.cgi) {
      const metadata = await dispatch(SnapshotActions.requestCourseMetadata());
      if (isFulfilled(metadata)) {
        discipline = metadata.payload.discipline;
      }
    }

    const flags = await dispatch(
      SnapshotActions.requestCheckCgiAdditionalFlags(),
    );

    if (
      isFulfilled(flags) &&
      flags.payload.careerReadinessFeatures.includes("skillsTagging")
    ) {
      await dispatch(CareerReadinessActions.requestCompetencyData());
    }

    await Promise.all([
      dispatch(CourseSettingsActions.requestDashboardSettings()),
      snapshot.cgi &&
        isWLCourse(discipline) &&
        dispatch(CourseSettingsActions.requestActivitySettings()),
      dispatch(CourseSettingsActions.requestGradebookSettings()),
      !snapshot.isMaster &&
        !snapshot.isReaderOnly &&
        isInstructorLikeRole(role) &&
        dispatch(CourseSettingsActions.requestUserPermissions()),
      dispatch(UserCourseSettingsActions.requestUserCourseSettings()),
    ]);
  };

const handleSnapshotAndSettingsData =
  (snapshotId: number, isMaster: boolean): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    // FIXME show error if not MAST course
    const snapshot = await dispatch(
      SnapshotActions.requestSnapshotData({ snapshotId, isMaster }),
    );

    if (!isFulfilled(snapshot)) return;

    await Promise.all([
      dispatch(ActivityTypesActions.requestActivityTypesData()),
      dispatch(FeatureFlagsActions.requestFeatureFlags()),
      !isMaster && dispatch(StudentAssistantActions.requestSASettings()),
      dispatch(NotebookLMActions.requestNotebookLMSettings()),
      dispatch(InstructorInsightsActions.requestAiiaMetadata()),
      dispatch(WorkflowActions.requestNodes()),
      dispatch(WorkflowActions.requestWeightedActivities()),
      dispatch(LayoutContainerActions.requestDockActionsData()),
      dispatch(AnnouncementActions.requestAnnouncements()),
      dispatch(handleCourseMetadata()),
    ]);
    dispatch(SnapshotActions.setShouldRenderLPN(true));
  };

export function useLoadInitialData() {
  const dispatch = useAppDispatch();
  const [query] = useSearchParams();
  const snapshotId = parseInt(query.get("snapshotId") ?? "");
  const isMaster = query.get("isMaster") === "true";

  React.useEffect(() => {
    if (!snapshotId) return;

    (async () => {
      // FIXME redirect to 401 if user is student
      const userProfile = await dispatch(
        UserProfileActions.requestUserProfileData(),
      );

      if (!isFulfilled(userProfile)) return;

      await Promise.all([
        dispatch(handleSnapshotAndSettingsData(snapshotId, isMaster)),
        dispatch(SsoTokenActions.requestSsoToken()),
        dispatch(CsrfTokenActions.requestCsrfToken()),
      ]);
    })();
  }, [dispatch, snapshotId, isMaster]);
}

export function useInstallGTM() {
  React.useEffect(() => {
    initGTM();
    loadOneTrustScript();
    installOneTrustConsentProvider();
  }, []);
}

export function useShowSidebar() {
  const isResponsive = useMediaQuery(`(max-width: ${IPAD_BREAKPOINT}px)`);
  const [showSidebar, setShowSidebar] = React.useState(!isResponsive);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSidebar(!isResponsive);
  }, [isResponsive]);

  return [showSidebar, setShowSidebar] as const;
}
