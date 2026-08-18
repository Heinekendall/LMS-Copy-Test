import { Drawer, IconButton, magma, styled } from "react-magma-dom";

import { IPAD_BREAKPOINT } from "../../constants/commonConstants.ts";
import LinkWithQuery from "../common/LinkWithQuery/LinkWithQuery.tsx";

export const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${magma.spaceScale.spacing05};
  width: ${(props) => (props.collapsed ? "72px" : "250px")};
  height: 100%;
  position: relative;

  @media (min-width: ${IPAD_BREAKPOINT}px) {
    padding-top: 20px;
    border-right: 1px solid ${magma.colors.border};
    flex-shrink: 0;
  }
`;

export const SidebarDrawer = styled(Drawer)`
  width: 250px !important;

  > span[class*="CloseBtn"] {
    top: 16px;
    right: 16px;
    z-index: 10;

    button {
      width: 36px;
      height: 36px;
    }
  }

  > div[class*="ModalWrapper"] {
    padding: 0;
  }
`;

export const SidebarLogo = styled.img<{ collapsed: boolean }>`
  display: block;
  width: ${(props) => (props.collapsed ? "22px" : "186px")};
  height: 20px;
  align-self: center;
  margin: 8px ${(props) => (props.collapsed ? "0" : "3px")} 8px 0; // 3px right to align logos
  object-fit: cover;
  object-position: left;
`;

export const SidebarUser = styled.div`
  padding: 16px 0 16px 16px;
  border-bottom: 1px solid ${magma.colors.neutral400};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${magma.spaceScale.spacing04};

  > span {
    display: -webkit-box;
    width: calc(100% - 32px - 40px - 16px - 36px);
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.15px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

export const SidebarExpandButton = styled(IconButton)`
  position: absolute;
  top: 24px;
  right: -14px;
  display: none;

  @media (min-width: ${IPAD_BREAKPOINT}px) {
    display: block;
  }
`;

export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing03};
  padding: 0 16px;

  @media (min-width: ${IPAD_BREAKPOINT}px) {
    padding: 0 16px;
  }

  hr {
    width: 100%;
    margin: ${magma.spaceScale.spacing03} 0;
    border-color: ${magma.colors.border};
  }
`;

// language=CSS
const swapIcons = `
  svg[data-primary-icon] {
    display: none;
  }

  svg[data-alt-icon] {
    display: inline-block;
  }
`;
export const SidebarLinkStyled = styled(LinkWithQuery, {
  shouldForwardProp: (propName) => propName !== "collapsed",
})<{ collapsed: boolean }>`
  padding: ${(props) => (props.collapsed ? "10px" : magma.spaceScale.spacing03)}
    ${magma.spaceScale.spacing04};
  border-radius: ${magma.borderRadius};
  display: inline-flex;
  align-items: center;
  justify-content: ${(props) => (props.collapsed ? "center" : "flex-start")};
  gap: ${magma.spaceScale.spacing03};
  color: ${magma.colors.neutral700};
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: ${magma.colors.primary100};
    color: ${magma.colors.primary};
  }

  &[aria-current] {
    background-color: ${magma.colors.primary100};
    color: ${magma.colors.primary};

    ${swapIcons};
  }

  svg {
    display: inline-block;
    flex-shrink: 0;
  }

  svg[data-alt-icon] {
    display: none;
  }
`;

export const SidebarButton = styled(IconButton)`
  padding: ${magma.spaceScale.spacing03} ${magma.spaceScale.spacing04};
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${magma.spaceScale.spacing03};
  color: ${magma.colors.neutral700};
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-transform: none;
`;
