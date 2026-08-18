import {
  magma,
  styled,
  TabPanelsContainer,
  Tabs,
  TypographyVisualStyle,
} from "react-magma-dom";

import { IPAD_BREAKPOINT } from "../../../constants/commonConstants.ts";

export const ContentStack = styled.div`
  display: grid;
  gap: ${magma.spaceScale.spacing05};
`;

export const TopArea = styled.div`
  display: grid;
  height: 194px;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  column-gap: ${magma.spaceScale.spacing02};

  @media (max-width: ${IPAD_BREAKPOINT}px) {
    grid-template-columns: 1fr;
  }
`;

export const HeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const FooterArea = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  column-gap: ${magma.spaceScale.spacing03};
  row-gap: ${magma.spaceScale.spacing03};

  @media (max-width: ${IPAD_BREAKPOINT}px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterColumn = styled.div`
  min-width: 0;
`;

export const FooterLinksColumn = styled(FooterColumn)`
  @media (max-width: ${IPAD_BREAKPOINT}px) {
    img,
    ul {
      margin-left: 0;
    }
  }
`;

export const RightAlignedTabs = styled(Tabs)`
  border-right: 1px solid ${magma.colors.neutral300};

  [role="tablist"] {
    margin-left: auto;
  }

  [role="tab"] {
    justify-content: flex-end;
  }
`;

export const StyledTabPanelsContainer = styled(TabPanelsContainer)`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  margin-top: -219px;
  height: 469px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const LogoImage = styled.img`
  width: 133px;
  height: 25px;
  margin-left: ${magma.spaceScale.spacing08};
`;

export const HorizontalList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${magma.spaceScale.spacing04};
  list-style-type: none;
  padding: 0;
  margin: 0 0 0 ${magma.spaceScale.spacing08};

  li a {
    color: ${magma.colors.neutral700};
    font-weight: 500;
    text-decoration-color: ${magma.colors.neutral400};
  }
`;

export const BookImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  overflow-y: hidden;
`;

export const HorizontalLine = styled.hr`
  width: 100%;
  margin: ${magma.spaceScale.spacing03} 0;
  border: none;
  border-top: 1px solid ${magma.colors.neutral300};
`;

const typographyStyle = (
  visualStyle: keyof typeof magma.typographyVisualStyles,
) => {
  const style = magma.typographyVisualStyles[visualStyle];

  const desktopLetterSpacing =
    "letterSpacing" in style.desktop
      ? `letter-spacing: ${style.desktop.letterSpacing};`
      : "";
  const fontWeight =
    "fontWeight" in style && style.fontWeight
      ? `font-weight: ${style.fontWeight};`
      : "";

  return `
    ${fontWeight}
      font-size: ${style.desktop.fontSize};
      ${desktopLetterSpacing}
      line-height: ${style.desktop.lineHeight};
    }
  `;
};

export const StyledContent = styled.div`
  color: ${magma.colors.neutral700};
  font-family: ${magma.bodyFont};

  h1,
  h2,
  h3,
  h4 {
    border-bottom: 2px solid transparent;
    color: ${magma.colors.primary600};
    font-family: ${magma.headingExpressiveFont};
    padding: 0;

    &:focus {
      border-bottom: 2px solid ${magma.colors.focus};
      outline: 0;
      transition: border 0.1s linear;
    }
  }

  h1 {
    ${typographyStyle(TypographyVisualStyle.headingXLarge)}
    margin: 0 0 ${magma.spaceScale.spacing05};
  }

  h2 {
    ${typographyStyle(TypographyVisualStyle.headingLarge)}
    margin: ${magma.spaceScale.spacing10} 0 ${magma.spaceScale.spacing05};
  }

  h3 {
    ${typographyStyle(TypographyVisualStyle.headingMedium)}
    margin: ${magma.spaceScale.spacing09} 0 ${magma.spaceScale.spacing05};
  }

  h4 {
    ${typographyStyle(TypographyVisualStyle.headingSmall)}
    margin: ${magma.spaceScale.spacing08} 0 ${magma.spaceScale.spacing05};
  }

  p {
    ${typographyStyle(TypographyVisualStyle.bodyMedium)}
    color: ${magma.colors.neutral700};
    font-family: ${magma.bodyFont};
    font-weight: normal;
    margin: ${magma.spaceScale.spacing06} 0;
  }

  a {
    color: ${magma.colors.primary700};
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: ${magma.colors.neutral400};
    font-weight: 500;

    &:hover,
    &:focus {
      color: ${magma.colors.primary700};
    }

    &:focus {
      outline: 2px solid ${magma.colors.focus};
      outline-offset: 2px;
    }
  }
`;
