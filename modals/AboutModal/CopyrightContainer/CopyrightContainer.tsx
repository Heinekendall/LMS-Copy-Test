import { Paragraph, TypographyVisualStyle } from "react-magma-dom";

import type { TransformedAboutData } from "../../../types/types.ts";
import {
  COPYRIGHT,
  MINDTAP_ISBN,
  PRINT_EDITION_ISBN,
} from "../AboutModal.constants.ts";
import { CopyrightContainerStyled } from "./CopyrightContainer.styled.ts";

interface CopyrightContainerProps {
  bookInfo: TransformedAboutData["books"][0];
}

export default function CopyrightContainer(props: CopyrightContainerProps) {
  const { bookInfo } = props;
  return (
    <CopyrightContainerStyled>
      <Paragraph noMargins visualStyle={TypographyVisualStyle.bodyXSmall}>
        {PRINT_EDITION_ISBN} {bookInfo.printIsbn}
      </Paragraph>
      {bookInfo.copyrightInfo ? (
        <Paragraph noMargins visualStyle={TypographyVisualStyle.bodyXSmall}>
          {COPYRIGHT} {bookInfo.copyrightInfo}
        </Paragraph>
      ) : null}
      <Paragraph noMargins visualStyle={TypographyVisualStyle.bodyXSmall}>
        {MINDTAP_ISBN} {bookInfo.mtIsbn}
      </Paragraph>
      <Paragraph noMargins visualStyle={TypographyVisualStyle.bodyXSmall}>
        {COPYRIGHT} {bookInfo.mtCopyrightInfo}
      </Paragraph>
    </CopyrightContainerStyled>
  );
}
