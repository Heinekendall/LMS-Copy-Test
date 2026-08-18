import {
  Paragraph,
  TypographyContextVariant,
  VisuallyHidden,
} from "react-magma-dom";

import type { CourseData } from "../../../api/nb/service/snapshot/courseDataQuery.ts";
import { useIntl } from "../../../hooks/hooks.ts";
import type { TransformedAboutData } from "../../../types/types.ts";
import { formatCourseDuration } from "../AboutModal.utils.tsx";
import { HorizontalLine } from "../AboutModalContent/AboutModalContent.styled.ts";
import { CourseNameHeading } from "./SnapshotInfoContainer.styled.ts";

interface SnapshotInfoContainerProps {
  snapshot: CourseData;
  aboutData: TransformedAboutData;
}

export default function SnapshotInfoContainer(
  props: SnapshotInfoContainerProps,
) {
  const { snapshot, aboutData } = props;
  const { locale } = useIntl();

  if (snapshot.isMaster || snapshot.isReaderOnly) {
    return null;
  }

  const courseDateInfo = formatCourseDuration(
    aboutData.startDate,
    aboutData.endDate,
    aboutData.timeZone,
    aboutData.timeZoneCode,
    locale,
  );
  return (
    <div>
      <CourseNameHeading
        contextVariant={TypographyContextVariant.expressive}
        level={4}
        noMargins
      >
        <VisuallyHidden>
          {" "}
          <span>About </span>{" "}
        </VisuallyHidden>
        {aboutData.courseName ? aboutData.courseName : "Course name"}
      </CourseNameHeading>
      {aboutData.sectionName && (
        <Paragraph noMargins>{aboutData.sectionName}</Paragraph>
      )}
      <Paragraph noMargins>{courseDateInfo}</Paragraph>
      <HorizontalLine />
    </div>
  );
}
