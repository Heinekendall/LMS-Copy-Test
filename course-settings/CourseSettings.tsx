import PageTitle from "../../components/PageTitle/PageTitle.tsx";
import { useAppSelector } from "../../hooks/reduxHooks.ts";
import { StudentAssistantSelectors } from "../../store/studentAssistant.ts";
import { isSACourseSupported } from "../../utilities/studentAssistantUtils.ts";
import { COURSE_SETTINGS_TILES } from "./CourseSettings.constants.ts";
import { CourseSettingsGrid } from "./CourseSettings.styled.ts";
import CourseSettingsTile from "./CourseSettingsTile/CourseSettingsTile.tsx";

export default function CourseSettings() {
  const { courseStatus } = useAppSelector(
    StudentAssistantSelectors.getStudentAssistantSettings,
  );

  const tiles = COURSE_SETTINGS_TILES.filter((tile) => {
    if (tile.id === "ai-tools-settings") {
      return isSACourseSupported(courseStatus);
    }

    return tile.visible;
  });

  return (
    <>
      <PageTitle>Course Settings</PageTitle>
      <CourseSettingsGrid aria-label="Course settings" role="list">
        {tiles.map((tile) => (
          <CourseSettingsTile key={tile.id} tile={tile} />
        ))}
      </CourseSettingsGrid>
    </>
  );
}
