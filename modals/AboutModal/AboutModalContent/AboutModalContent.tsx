import * as React from "react";
import { useMediaQuery } from "react-magma-dom";

import type { CourseData } from "../../../api/nb/service/snapshot/courseDataQuery.ts";
import { IPAD_BREAKPOINT } from "../../../constants/commonConstants.ts";
import type { TransformedAboutData } from "../../../types/types.ts";
import { ABOUT_CONTENT, COPYRIGHT_TEXT } from "../AboutModal.constants.ts";
import {
  concatAuthorNames,
  getAboutContentLength,
} from "../AboutModal.utils.tsx";
import AboutModalAccordion from "../AboutModalAccordion/AboutModalAccordion.tsx";
import AboutModalLinksContainer from "../AboutModalLinksContainer/AboutModalLinksContainer.tsx";
import AboutModalTabsContainer from "../AboutModalTabsContainer/AboutModalTabsContainer.tsx";
import BookCreditsContainer from "../BookCreditsContainer/BookCreditsContainer.tsx";
import CopyrightContainer from "../CopyrightContainer/CopyrightContainer.tsx";
import SnapshotInfoContainer from "../SnapshotInfoContainer/SnapshotInfoContainer.tsx";
import {
  BookImage,
  ContentStack,
  FooterArea,
  FooterColumn,
  FooterLinksColumn,
  HeaderColumn,
  HorizontalLine,
  LogoImage,
  TopArea,
} from "./AboutModalContent.styled.ts";

export type AboutContentItem = {
  title: string;
  body: string | React.ReactNode;
  copyRight?: string;
};

interface AboutModalContentProps {
  snapshot: CourseData;
  aboutData: TransformedAboutData;
  ssoToken: string;
}

export default function AboutModalContent(props: AboutModalContentProps) {
  const { snapshot, aboutData, ssoToken } = props;

  const isResponsive = useMediaQuery(`(max-width: ${IPAD_BREAKPOINT}px)`);
  const bookInfo = aboutData.books[0];
  const authorNames = concatAuthorNames(bookInfo.authors);
  const aboutContent: AboutContentItem[] = [
    {
      title: ABOUT_CONTENT.BOOK_COVER,
      body: bookInfo.coverImageUrl ? (
        <BookImage
          src={bookInfo.coverImageUrl}
          alt={(bookInfo.title || "").replace(/(<([^>]+)>)/gi, "")}
        />
      ) : null,
    },
    {
      title: ABOUT_CONTENT.ABOUT_THE_AUTHORS,
      body: bookInfo.authorsInfo,
    },
    {
      title: ABOUT_CONTENT.COPYRIGHT_STATEMENT,
      body: bookInfo.copyrightStatement,
    },
    {
      title: ABOUT_CONTENT.ABOUT_MINDTAP,
      body: aboutData.aboutPlatform,
      copyRight: COPYRIGHT_TEXT,
    },
    {
      title: ABOUT_CONTENT.SUPPORT_INFORMATION,
      body: snapshot.isMaster ? null : aboutData.supportInfo,
    },
  ];

  const filteredAboutContent: AboutContentItem[] = aboutContent.filter(
    (content) => content.body && content.body !== "",
  );

  return (
    <>
      <HorizontalLine />
      <ContentStack>
        <TopArea>
          <HeaderColumn>
            <SnapshotInfoContainer snapshot={snapshot} aboutData={aboutData} />
            <BookCreditsContainer
              title={bookInfo.title}
              authorNames={authorNames}
            />
            {!isResponsive && <HorizontalLine />}
          </HeaderColumn>
        </TopArea>

        <div>
          {isResponsive ? (
            <AboutModalAccordion aboutContent={filteredAboutContent} />
          ) : (
            <AboutModalTabsContainer
              aboutContent={filteredAboutContent}
              numberOfTabs={getAboutContentLength(snapshot, bookInfo)}
            />
          )}
        </div>
        {!isResponsive && <HorizontalLine />}

        <FooterArea>
          <FooterColumn>
            <CopyrightContainer bookInfo={bookInfo} />
          </FooterColumn>
          <FooterLinksColumn>
            <LogoImage
              src={`${import.meta.env.BASE_URL}cengage_logo.svg`}
              alt={"Cengage"}
            />
            <AboutModalLinksContainer snapshot={snapshot} ssoToken={ssoToken} />
          </FooterLinksColumn>
        </FooterArea>
      </ContentStack>
    </>
  );
}
