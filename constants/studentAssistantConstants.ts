export const SA_COURSE_STATUS = {
  DISABLED: "DISABLED",
  ENABLED: "ENABLED",
  NOT_SUPPORTED: "NOT_SUPPORTED",
  NOT_INITIALIZED: "NOT_INITIALIZED",
} as const;
export type SACourseStatus =
  (typeof SA_COURSE_STATUS)[keyof typeof SA_COURSE_STATUS];

export const SA_ACTIVITY_STATUS = {
  DISABLED: "DISABLED",
  ENABLED: "ENABLED",
} as const;
export type SAActivityStatus =
  (typeof SA_ACTIVITY_STATUS)[keyof typeof SA_ACTIVITY_STATUS];
