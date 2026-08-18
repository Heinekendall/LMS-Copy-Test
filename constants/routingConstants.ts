export const APP_PAGES = {
  Dashboard: "dashboard",
  Gradebook: "gradebook",
  LearningPath: "learning-path",
  CourseSettings: "course-settings",
  Support: "support",
  MoreTools: "more-tools",
} as const;
export const APP_PARAMS = {
  Activity: "activity/:activityId",
  Overview: "overview/:activityId",
  Take: "take?/:takeId?",
} as const;

export const COURSE_ENTRY_SETUP_PARAM = "courseEntrySetup";
export const COURSE_ENTRY_SETUP_PREVIEW = "preview";
export const COURSE_ENTRY_BREAKS_PARAM = "courseEntryBreaks";
export const COURSE_ENTRY_PREVIEW_VIEW_PARAM = "courseEntryPreviewView";
export const COURSE_ENTRY_PREVIEW_VIEW_WEEK = "week";
export const COURSE_ENTRY_SCHEDULE_DIALOG_OPEN = "true";
export const COURSE_ENTRY_SCHEDULE_DIALOG_PARAM = "courseEntryOpenSchedule";
export const COURSE_ENTRY_START_DATE_PARAM = "courseStartDate";
export const COURSE_ENTRY_END_DATE_PARAM = "courseEndDate";
export const COURSE_ENTRY_TIME_ZONE_PARAM = "courseTimeZone";
