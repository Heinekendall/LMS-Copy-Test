import { magma, TypographyVisualStyle } from "react-magma-dom";

import type { CourseSettingsTileConfig } from "../CourseSettings.constants.ts";
import {
  CourseSettingsTileBody,
  CourseSettingsTileCard,
  CourseSettingsTileDescription,
  CourseSettingsTileHeader,
  CourseSettingsTileHeading,
  CourseSettingsTileIcon,
} from "../CourseSettings.styled.ts";

interface CourseSettingsTileProps {
  tile: CourseSettingsTileConfig;
}

export default function CourseSettingsTile({ tile }: CourseSettingsTileProps) {
  const headingId = `course-settings-tile-${tile.id}`;
  const Icon = tile.icon;

  return (
    <CourseSettingsTileCard hasDropShadow role="listitem">
      <CourseSettingsTileBody aria-labelledby={headingId}>
        <CourseSettingsTileHeader>
          <CourseSettingsTileIcon aria-hidden="true">
            <Icon color={magma.colors.primary} size={24} />
          </CourseSettingsTileIcon>
          <CourseSettingsTileHeading
            id={headingId}
            level={3}
            noMargins
            visualStyle={TypographyVisualStyle.bodyMedium}
          >
            {tile.title}
          </CourseSettingsTileHeading>
        </CourseSettingsTileHeader>
        <CourseSettingsTileDescription
          noMargins
          visualStyle={TypographyVisualStyle.bodySmall}
        >
          {tile.description}
        </CourseSettingsTileDescription>
      </CourseSettingsTileBody>
    </CourseSettingsTileCard>
  );
}
