import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "react-magma-dom";

import { filterXSS } from "../../../utilities/securityUtils.ts";
import { getCopyRightMessage } from "../AboutModal.utils.tsx";
import { StyledContent } from "../AboutModalContent/AboutModalContent.styled.ts";
import type { AboutContentItem } from "../AboutModalContent/AboutModalContent.tsx";
import { StyledAccordion } from "./AboutModalAccordion.styled.ts";

interface AboutModalAccordionProps {
  aboutContent: AboutContentItem[];
}

export default function AboutModalAccordion(props: AboutModalAccordionProps) {
  const { aboutContent } = props;

  return (
    <StyledAccordion isMulti={false}>
      {aboutContent.map((content, index) => {
        const copyRight = getCopyRightMessage(content);

        return (
          <AccordionItem index={index} key={index}>
            <AccordionButton>{content.title}</AccordionButton>
            <AccordionPanel>
              {typeof content.body === "string" ? (
                <StyledContent
                  dangerouslySetInnerHTML={{
                    __html: filterXSS(content.body) + copyRight,
                  }}
                />
              ) : (
                <>
                  {content.body}
                  {copyRight}
                </>
              )}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </StyledAccordion>
  );
}
