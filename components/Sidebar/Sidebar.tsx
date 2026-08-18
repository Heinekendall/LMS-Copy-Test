import * as React from "react";
import {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  DrawerPosition,
  IconButton,
  useMediaQuery,
} from "react-magma-dom";
import {
  AppsIcon,
  AssessmentIcon,
  AssignmentIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HelpIcon,
  HelpOutlineIcon,
  HomeIcon,
  LogoutIcon,
  SettingsIcon,
} from "react-magma-icons";

import { logoutQuery } from "../../api/nb/service/system/logoutQuery.ts";
import type { UserProfileData } from "../../api/nb/service/userOrgProfile/currentUserQuery.ts";
import { IPAD_BREAKPOINT } from "../../constants/commonConstants.ts";
import { MODAL_TYPES } from "../../constants/modalConstants.ts";
import { APP_PAGES } from "../../constants/routingConstants.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import focusManager from "../../services/focusManager.ts";
import { GlobalSelectors } from "../../store/globalSelectors.ts";
import { ModalsActions } from "../../store/modals.ts";
import { SnapshotSelectors } from "../../store/snapshot/snapshot.ts";
import { SsoTokenSelectors } from "../../store/ssoToken.ts";
import { UserProfileSelectors } from "../../store/userProfile.ts";
import AppsFilledIcon from "../common/icons/AppsFilledIcon.tsx";
import AssessmentOutlineIcon from "../common/icons/AssessmentOutlineIcon.tsx";
import AssignmentOutlineIcon from "../common/icons/AssignmentOutlineIcon.tsx";
import HomeOutlineIcon from "../common/icons/HomeOutlineIcon.tsx";
import LightInfoIcon from "../common/icons/LightInfoIcon.tsx";
import SettingsOutlineIcon from "../common/icons/SettingsOutlineIcon.tsx";
import {
  SidebarButton,
  SidebarDrawer,
  SidebarExpandButton,
  SidebarLogo,
  SidebarMenu,
  SidebarStyled,
  SidebarUser,
} from "./Sidebar.styled.ts";
import SidebarLink from "./SidebarLink/SidebarLink.tsx";

interface SidebarProps {
  isVisible: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: SidebarProps) {
  const userProfile = useAppSelector(UserProfileSelectors.getUserProfile);
  const shouldShowDashboard = useAppSelector(
    GlobalSelectors.getShouldShowDashboard,
  );
  const [collapsed, setCollapsed] = React.useState(false);
  const isResponsive = useMediaQuery(`(max-width: ${IPAD_BREAKPOINT}px)`);
  const dispatch = useAppDispatch();
  const { snapshot } = useAppSelector(SnapshotSelectors.getSnapshotData);
  const ssoToken = useAppSelector(SsoTokenSelectors.getSsoToken);

  const openAboutModal = () => {
    void dispatch(
      ModalsActions.openModal(MODAL_TYPES.ABOUT, {
        snapshot,
        ssoToken: ssoToken ?? "",
      }),
    );
  };

  const logoutUser = () => {
    logoutQuery();
  };

  const sidebar = (
    <SidebarStyled collapsed={collapsed}>
      {isResponsive && (
        <SidebarUser>
          <IconButton
            aria-hidden="true"
            aria-label=""
            color={ButtonColor.marketing}
            icon={<>{getInitials(userProfile.user)}</>}
            tabIndex={-1}
          />
          <span>
            {userProfile.user.firstName} {userProfile.user.lastName}
          </span>
        </SidebarUser>
      )}

      {!isResponsive && (
        <SidebarLogo
          src={`${import.meta.env.BASE_URL}cengage-mindtap-logo.svg`}
          alt="Cengage Mindtap Logo"
          collapsed={collapsed}
        />
      )}

      <SidebarMenu>
        {shouldShowDashboard && (
          <SidebarLink
            icon={<HomeOutlineIcon />}
            altIcon={<HomeIcon />}
            label="Dashboard"
            link={APP_PAGES.Dashboard}
            collapsed={collapsed}
          />
        )}
        <SidebarLink
          icon={<AssignmentOutlineIcon />}
          altIcon={<AssignmentIcon />}
          label="Learning Path"
          link={APP_PAGES.LearningPath}
          collapsed={collapsed}
        />
        <SidebarLink
          icon={<SettingsOutlineIcon />}
          altIcon={<SettingsIcon />}
          label="Course Settings"
          link={APP_PAGES.CourseSettings}
          collapsed={collapsed}
        />
        <SidebarLink
          icon={<AssessmentOutlineIcon />}
          altIcon={<AssessmentIcon />}
          label="Gradebook"
          link={APP_PAGES.Gradebook}
          collapsed={collapsed}
        />
        <hr />
        <SidebarLink
          icon={<AppsIcon />}
          altIcon={<AppsFilledIcon />}
          label="More Tools"
          link={APP_PAGES.MoreTools}
          collapsed={collapsed}
        />
        <SidebarLink
          icon={<HelpOutlineIcon />}
          altIcon={<HelpIcon />}
          label="Support"
          link={APP_PAGES.Support}
          collapsed={collapsed}
        />

        {isResponsive && (
          <>
            <hr />

            <SidebarButton
              aria-label="Open about modal"
              variant={ButtonVariant.link}
              isFullWidth
              icon={<LightInfoIcon size={20} />}
              onClick={(event) => {
                openAboutModal();
                focusManager.save("about-modal", event.currentTarget);
              }}
            >
              About
            </SidebarButton>

            <SidebarButton
              variant={ButtonVariant.link}
              isFullWidth
              icon={<LogoutIcon size={20} />}
              onClick={() => logoutUser()}
            >
              Logout
            </SidebarButton>
          </>
        )}
      </SidebarMenu>

      <SidebarExpandButton
        aria-label={collapsed ? "Expand Sidebar menu" : "Collapse Sidebar menu"}
        icon={collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        onClick={() => setCollapsed(!collapsed)}
        color={ButtonColor.secondary}
        shape={ButtonShape.fill}
        size={ButtonSize.small}
      />
    </SidebarStyled>
  );

  if (isResponsive) {
    return (
      <SidebarDrawer
        ariaLabel="Sidebar menu"
        isOpen={props.isVisible}
        onClose={() => {
          props.onToggle(false);
          focusManager.restore("header-sidebar-button");
        }}
        position={DrawerPosition.left}
        showBackgroundOverlay={false}
        closeAriaLabel="Close sidebar menu"
        isModalClosingControlledManually={true}
      >
        {sidebar}
      </SidebarDrawer>
    );
  } else {
    return sidebar;
  }
}

const getInitials = (user: UserProfileData["user"]) =>
  user.firstName[0] + user.lastName[0];
