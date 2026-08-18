import * as React from "react";
import { type IconProps, type SvgIcon } from "react-magma-icons";
import { useMatch } from "react-router-dom";

import { SidebarLinkStyled } from "../Sidebar.styled.ts";

interface SidebarLinkProps {
  collapsed: boolean;
  icon: React.ReactElement<IconProps, typeof SvgIcon>;
  altIcon?: React.ReactElement<IconProps, typeof SvgIcon>;
  label: string;
  link: string;
}

export default function SidebarLink(props: SidebarLinkProps) {
  const isActive = useMatch(props.link);

  return (
    <SidebarLinkStyled
      aria-current={isActive ? "page" : undefined}
      aria-label={`Switch to ${props.label} tab`}
      to={props.link}
      collapsed={props.collapsed}
    >
      {React.cloneElement(props.icon, {
        size: 20,
        "data-primary-icon": "true",
      } as React.HTMLAttributes<HTMLElement>)}

      {props.altIcon &&
        React.cloneElement(props.altIcon, {
          size: 20,
          "data-alt-icon": "true",
        } as React.HTMLAttributes<HTMLElement>)}

      {!props.collapsed && <span>{props.label}</span>}
    </SidebarLinkStyled>
  );
}
