import * as React from "react";
import {
  Tab,
  TabsAlignment,
  TabsBorderPosition,
  TabsContainer,
  TabsOrientation,
  TabsTextTransform,
} from "react-magma-dom";

import { filterXSS } from "../../../utilities/securityUtils.ts";
import { ABOUT_CONTENT } from "../AboutModal.constants.ts";
import { getCopyRightMessage } from "../AboutModal.utils.tsx";
import {
  RightAlignedTabs,
  StyledContent,
  StyledTabPanelsContainer,
} from "../AboutModalContent/AboutModalContent.styled.ts";
import type { AboutContentItem } from "../AboutModalContent/AboutModalContent.tsx";
import {
  PanelsColumn,
  StyledTabPanel,
  TabsColumn,
  TabsLayout,
} from "./AboutModalTabsContainer.styled.ts";

interface AboutModalTabsContainerProps {
  aboutContent: AboutContentItem[];
  numberOfTabs: number;
}

export default function AboutModalTabsContainer(
  props: AboutModalTabsContainerProps,
) {
  const { aboutContent, numberOfTabs } = props;
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  React.useEffect(() => {
    document.getElementById(`tab-${activeTabIndex}`)?.focus();
  }, [activeTabIndex]);

  const tabPanelsContainerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    tabPanelsContainerRef.current?.scrollTo({
      top: 0,
      left: 0,
    });

    document.getElementById(`tab-${activeTabIndex}`)?.focus();
  }, [activeTabIndex]);

  const handleTabChange = (code: string) => {
    let increment = 0;
    if (code === "ArrowDown") {
      increment = 1;
    } else if (code === "ArrowUp") {
      increment = -1;
    }

    const newTabIndex =
      (activeTabIndex + increment + numberOfTabs) % numberOfTabs;
    setActiveTabIndex(newTabIndex);
  };

  const contentsWithNonFocusableFirstElement = [
    ABOUT_CONTENT.ABOUT_MINDTAP,
    ABOUT_CONTENT.SUPPORT_INFORMATION,
  ];

  return (
    <TabsContainer activeIndex={activeTabIndex}>
      <TabsLayout>
        <TabsColumn>
          <RightAlignedTabs
            alignment={TabsAlignment.right}
            orientation={TabsOrientation.vertical}
            borderPosition={TabsBorderPosition.right}
            onChange={(newActiveIndex) => setActiveTabIndex(newActiveIndex)}
            onKeyDown={(e) => handleTabChange(e.code)}
            textTransform={TabsTextTransform.none}
          >
            {aboutContent.map((content, index) => {
              return (
                <Tab key={index} id={`tab-${index}`}>
                  <span>{content.title}</span>
                </Tab>
              );
            })}
          </RightAlignedTabs>
        </TabsColumn>
        <PanelsColumn>
          <StyledTabPanelsContainer ref={tabPanelsContainerRef}>
            {aboutContent.map((content, index) => {
              const copyRight = getCopyRightMessage(content);
              const isFirstElementNonFocusable =
                contentsWithNonFocusableFirstElement.includes(content.title);

              return (
                <StyledTabPanel
                  key={index}
                  tabIndex={isFirstElementNonFocusable ? 0 : undefined}
                >
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
                </StyledTabPanel>
              );
            })}
          </StyledTabPanelsContainer>
        </PanelsColumn>
      </TabsLayout>
    </TabsContainer>
  );
}
