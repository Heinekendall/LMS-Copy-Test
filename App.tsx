import { Outlet, useLocation } from "react-router-dom";

import {
  useInstallGTM,
  useLoadInitialData,
  useShowSidebar,
} from "./App.hooks.ts";
import { AppMain, AppPageContainer, AppStyled } from "./App.styled.ts";
import AppHeading from "./components/AppHeading/AppHeading.tsx";
import DevPanel from "./components/DevPanel/DevPanel.tsx";
import Loading from "./components/Loading/Loading.tsx";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.tsx";
import ModalsContainer from "./components/ModalsContainer/ModalsContainer.tsx";
import SessionTimer from "./components/SessionTimer/SessionTimer.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import { ToastsAnnouncer } from "./components/ToastsAnnouncer/ToastsAnnouncer.tsx";
import {
  COURSE_ENTRY_SETUP_PARAM,
  COURSE_ENTRY_SETUP_PREVIEW,
} from "./constants/routingConstants.ts";
import { useAppSelector } from "./hooks/reduxHooks.ts";
import CriticalErrorModal from "./modals/CriticalErrorModal/CriticalErrorModal.tsx";
import { ErrorSelectors } from "./store/error.ts";
import { SnapshotSelectors } from "./store/snapshot/snapshot.ts";

// TODO Announcements
// TODO Toolbar functionality - Splash page, first time tour
// TODO MathJax init

function App() {
  const shouldRenderLpn = useAppSelector(SnapshotSelectors.getShouldRenderLPN);
  const { hasCriticalError } = useAppSelector(ErrorSelectors.getErrorState);
  const [showSidebar, setShowSidebar] = useShowSidebar();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shouldHideAppChrome =
    searchParams.get(COURSE_ENTRY_SETUP_PARAM) === COURSE_ENTRY_SETUP_PREVIEW;

  useLoadInitialData();
  useInstallGTM();

  if (hasCriticalError) {
    return <CriticalErrorModal />;
  }

  if (!shouldRenderLpn) {
    return <LoadingScreen />;
  }

  return (
    <AppStyled data-preview-mode={shouldHideAppChrome || undefined}>
      <DevPanel />
      {!shouldHideAppChrome && (
        <Sidebar isVisible={showSidebar} onToggle={setShowSidebar} />
      )}

      <AppPageContainer>
        {!shouldHideAppChrome && <AppHeading toggleSidebar={setShowSidebar} />}

        <AppMain data-preview-mode={shouldHideAppChrome || undefined}>
          <Outlet />
        </AppMain>
      </AppPageContainer>

      <SessionTimer />
      <ModalsContainer />
      <ToastsAnnouncer />
      <Loading />
    </AppStyled>
  );
}

export default App;
