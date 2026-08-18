import { Hyperlink, HyperlinkIconPosition, magma } from "react-magma-dom";
import { OpenInNewIcon } from "react-magma-icons";

import type { CourseData } from "../../../api/nb/service/snapshot/courseDataQuery.ts";
import { getSupportURL } from "../../../utilities/constantUtils.ts";
import {
  ABOUT_CENGAGE_LINK,
  ACCESSIBILITY_LINK,
  CUSTOMER_SUPPORT,
  FEEDBACK_URL,
  LINKS,
  PIRACY_LINK,
  PRIVACY_LINK,
  TERMS_OF_USE,
} from "../AboutModal.constants.ts";
import { getSupportUrlParams } from "../AboutModal.utils.tsx";
import { HorizontalList } from "../AboutModalContent/AboutModalContent.styled.ts";

interface AboutModalLinksContainerProps {
  snapshot: CourseData;
  ssoToken: string;
}

export default function AboutModalLinksContainer(
  props: AboutModalLinksContainerProps,
) {
  const { snapshot, ssoToken } = props;
  const customerSupportUrl =
    getSupportURL(window.location.hostname) +
    getSupportUrlParams(snapshot, ssoToken);
  const links = [
    {
      link: ABOUT_CENGAGE_LINK,
      linkText: LINKS.ABOUT_CENGAGE_LINK,
    },
    {
      link: customerSupportUrl,
      linkText: CUSTOMER_SUPPORT,
    },
    {
      link: FEEDBACK_URL,
      linkText: LINKS.FEEDBACK,
    },
    {
      link: ACCESSIBILITY_LINK,
      linkText: LINKS.ACCESSIBILITY,
    },
    {
      link: PRIVACY_LINK,
      linkText: LINKS.PRIVACY,
    },
    {
      link: TERMS_OF_USE,
      linkText: LINKS.TERMS_OF_USE,
    },
    {
      link: PIRACY_LINK,
      linkText: LINKS.PIRACY,
    },
  ];

  return (
    <HorizontalList>
      {links.map(({ link, linkText }) => (
        <li key={linkText}>
          <Hyperlink
            to={link}
            opensInNewTab={linkText !== LINKS.FEEDBACK}
            icon={<OpenInNewIcon aria-hidden size={magma.iconSizes.small} />}
            iconPosition={HyperlinkIconPosition.right}
          >
            {linkText}
          </Hyperlink>
        </li>
      ))}
    </HorizontalList>
  );
}
