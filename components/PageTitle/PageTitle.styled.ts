import { magma, styled } from "react-magma-dom";

import { IPAD_BREAKPOINT } from "../../constants/commonConstants.ts";

const ss = magma.spaceScale;

export const PageTitleStyled = styled.div`
  width: 100%;
  padding: ${ss.spacing05} ${ss.spacing06};

  @media (min-width: ${magma.breakpoints.small}px) {
    padding: ${ss.spacing03} ${ss.spacing06} ${ss.spacing05};
  }

  @media (min-width: ${IPAD_BREAKPOINT}px) {
    padding: ${ss.spacing06} ${ss.spacing06} ${ss.spacing05};
  }
`;
