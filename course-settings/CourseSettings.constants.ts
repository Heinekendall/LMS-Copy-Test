import type { ComponentType } from "react";
import {
  AnalyticsIcon,
  AutoAwesomeIcon,
  HowToRegIcon,
  type IconProps,
  ListAltIcon,
  LocalLibraryIcon,
  RateReviewIcon,
  ViewCompactIcon,
} from "react-magma-icons";

export type CourseSettingsTileId =
  | "activity-settings-templates"
  | "gradebook-settings"
  | "instructor-and-ta-permissions"
  | "student-id-collection"
  | "academic-integrity"
  | "learning-path-settings"
  | "ai-tools-settings";

export interface CourseSettingsTileConfig {
  id: CourseSettingsTileId;
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
  visible: boolean;
}

export const COURSE_SETTINGS_TILES: CourseSettingsTileConfig[] = [
  {
    id: "activity-settings-templates",
    title: "Activity Settings Templates",
    description: "Manage settings profile and activity defaults",
    icon: ViewCompactIcon,
    visible: true,
  },
  {
    id: "gradebook-settings",
    title: "Gradebook Settings",
    description: "Manage gradebook settings",
    icon: AnalyticsIcon,
    visible: true,
  },
  {
    id: "instructor-and-ta-permissions",
    title: "Instructor and TA Permissions",
    description: "Manage access permissions for the system",
    icon: HowToRegIcon,
    visible: true,
  },
  {
    id: "student-id-collection",
    title: "Student ID Collection",
    description: "Requiring students to enter their Student ID when logging in",
    icon: LocalLibraryIcon,
    visible: true,
  },
  {
    id: "academic-integrity",
    title: "Academic Integrity",
    description: "Manage the secure testing and screen promoting settings",
    icon: RateReviewIcon,
    visible: true,
  },
  {
    id: "learning-path-settings",
    title: "Learning Path Settings",
    description: "Manage how you view your learning path",
    icon: ListAltIcon,
    visible: true,
  },
  {
    id: "ai-tools-settings",
    title: "AI Tool Settings",
    description: "Manage the settings for AI tools in your course",
    icon: AutoAwesomeIcon,
    visible: true,
  },
];
