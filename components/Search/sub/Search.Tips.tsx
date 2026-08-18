import { Heading, Paragraph, TypographyVisualStyle } from "react-magma-dom";

import { SearchTipsContainer } from "../Search.styled.ts";

export default function SearchTips() {
  return (
    <SearchTipsContainer>
      <Heading level={3} noMargins isInverse>
        What can I search for?
      </Heading>
      <div>
        <Paragraph
          noMargins
          isInverse
          visualStyle={TypographyVisualStyle.headingXSmall}
        >
          Activity
        </Paragraph>
        <Paragraph noMargins isInverse>
          Enter keywords to search for an activity name or activity description.
        </Paragraph>
      </div>
    </SearchTipsContainer>
  );
}
