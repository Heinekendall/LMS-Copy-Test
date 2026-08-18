import * as React from "react";

import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import { APP_PAGES } from "../../constants/routingConstants.ts";
import { useAppSelector } from "../../hooks/reduxHooks.ts";
import { useAppNavigate } from "../../hooks/routerHooks.ts";
import { GlobalSelectors } from "../../store/globalSelectors.ts";

export default function Dashboard() {
  const shouldShowDashboard = useAppSelector(
    GlobalSelectors.getShouldShowDashboard,
  );
  const navigate = useAppNavigate();

  React.useEffect(() => {
    if (!shouldShowDashboard) {
      navigate(APP_PAGES.LearningPath, { replace: true });
    }
  }, [navigate, shouldShowDashboard]);

  if (!shouldShowDashboard) return null;

  return <PageTitle>Dashboard</PageTitle>;
}
