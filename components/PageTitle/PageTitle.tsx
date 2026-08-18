import * as React from "react";
import { Heading, TypographyVisualStyle } from "react-magma-dom";

import { PageTitleStyled } from "./PageTitle.styled";

interface PageTitleProps {
  readonly children: React.ReactNode | undefined;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <PageTitleStyled>
      <Heading
        visualStyle={TypographyVisualStyle.headingMedium}
        level={1}
        noMargins
      >
        {children}
      </Heading>
    </PageTitleStyled>
  );
}
