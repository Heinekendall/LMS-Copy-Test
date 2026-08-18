import { Paragraph, TypographyVisualStyle } from "react-magma-dom";

import { filterXSS } from "../../../utilities/securityUtils.ts";
import { BookTitle } from "./BookCreditsContainer.styled.ts";

interface BookCreditsContainerProps {
  title: string;
  authorNames: string;
}

export default function BookCreditsContainer(props: BookCreditsContainerProps) {
  const { title, authorNames } = props;
  return (
    <>
      <Paragraph noMargins>Featuring</Paragraph>
      <BookTitle
        noMargins
        visualStyle={TypographyVisualStyle.bodyMedium}
        style={{ fontWeight: 600 }}
        dangerouslySetInnerHTML={{ __html: filterXSS(title) }}
      />
      <Paragraph noMargins>{authorNames}</Paragraph>
    </>
  );
}
