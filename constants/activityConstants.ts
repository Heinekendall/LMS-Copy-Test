export const GRADEBOOK_APP_NAME = "Cengage.Progress";

export const PSP_APP_NAME = "Cengage.PSP";
export const LTI_APP_NAME = "Cengage.LTI";
export const SCORM_APP_NAME = "Cengage.SCORM";
export const DELMAR_LTI_APP_NAME = "DLMT.LTI";
export const DELMAR_SCORM_APP_NAME = "DLMT.LearningLabs";
export const MT_ACTIVITY_APP_NAME = "MindTap.Activity";
export const CENGAGE_STUDY_APP_NAME = "Cengage.Study";
export const STP_ACTIVITY_APP_NAME = "Cengage.STP";
export const CER_ACTIVITY_APP_NAME = "Cengage.eReader";
export const AYR_APP_NAME = "Cengage.AYR";

export const DELMAR_APPS = [DELMAR_LTI_APP_NAME, DELMAR_SCORM_APP_NAME];
export const LSAS_APPS = [LTI_APP_NAME, SCORM_APP_NAME];

export const NODE_TYPES = {
  ACTIVITY: "ACTIVITY",
  GROUP: "GROUP",
  NEXTBOOK: "NEXTBOOK",
  PATH: "PATH",
} as const;

export const ACTIVITY_TYPES = {
  OTHER: 0,
  READING: 1,
  ASSESSMENT: 2,
  HOMEWORK: 3,
  GOOGLE_DOCS: 4,
  MEDIA: 5,
  FLASHCARDS: 6,
  KALTURA: 7,
  RSS_FEED: 8,
  WEB_LINKS: 9,
  STUDY_GUIDE: 10,
  CONCEPT_MAP1: 11,
  NON_MINDTAP: 12,
  EXTERNAL_READING: 13,
  FILE_DOWNLOAD: 14,
  TEST_PREP: 15, // new type added for STP
};
export const ACTIVITY_TYPE_TO_ALT_TEXT_MAP = {
  [ACTIVITY_TYPES.OTHER]: "Assignment",
  [ACTIVITY_TYPES.READING]: "Reading activity",
  [ACTIVITY_TYPES.ASSESSMENT]: "Assessment",
  [ACTIVITY_TYPES.HOMEWORK]: "Homework assignment",
  [ACTIVITY_TYPES.GOOGLE_DOCS]: "Google doc activity",
  [ACTIVITY_TYPES.MEDIA]: "Media activity",
  [ACTIVITY_TYPES.FLASHCARDS]: "Flashcard activity",
  [ACTIVITY_TYPES.KALTURA]: "Kaltura activity",
  [ACTIVITY_TYPES.RSS_FEED]: "RSS feed activity",
  [ACTIVITY_TYPES.WEB_LINKS]: "Weblink activity",
  [ACTIVITY_TYPES.STUDY_GUIDE]: "Study Guide activity",
  [ACTIVITY_TYPES.CONCEPT_MAP1]: "Concept Map activity",
  [ACTIVITY_TYPES.NON_MINDTAP]: "Non-MindTap activity",
  [ACTIVITY_TYPES.EXTERNAL_READING]: "External Reading activity",
  [ACTIVITY_TYPES.FILE_DOWNLOAD]: "File download activity",
  [ACTIVITY_TYPES.TEST_PREP]: "Student Test Prep activity",
};

//Internal Activity App Names
export const FLASHCARD_APP_NAMES = ["Cengage.FlashCard"];
export const MEDIA_APP_NAME = "Cengage.Media";
export const EREADER_APP_NAMES = ["Cengage.eReader"];
export const BONGO_APP_NAMES = [
  "Cengage.YouSeeU",
  "Cengage.YouSeeU.Staging",
  "Cengage.YouSeeU.QA",
  "Cengage.YouSeeU.Test",
];
export const MOBLAB_APP_NAMES = ["MoblabGames", "MoblabGamesTest"];
export const CEREGO_APP_NAMES = ["Cerego", "CeregoV4"];
export const TURNITIN_APP_NAMES = ["TurnItIn", "TurnItIn.test"];
export const SAM_APP_NAMES = [
  "SAM.appification.QA1",
  "SAM.appification.QA3",
  "SAM.appificaiton.INT",
  "SAM.appification.PROD",
  "SAM.appification.STG",
  "SAM.appification.PERF",
];
export const SAM_APP_SUBTYPES = {
  Exam: "Exam",
  Project: "Project",
  Training: "Training",
};
export const MT_ACTIVITY_SUBTYPES = {
  CSFI_POST_TEST: "csfi-post-test",
  CSFI_PRE_TEST: "csfi-pre-test",
  SAA_SURVEY: "survey",
  SAA_NUMERIC_SURVEY: "numeric-survey",
};
export const SAM_APP_TEMPLATE_CcExam = "CcExam";
export const DIETWELLNESSPLUS_APP_NAMES = ["Cengage.Diet.Wellness.Plus"];
export const COGLABS_APP_NAMES = ["Coglab", "Coglab-Purdue", "Coglab-Staging"];

//External Activity App Names
export const WEBLINK_APP_NAMES = ["Cengage.WebLink", "Cengage.WebLink.QA"];
export const WEBVIDEO_APP_NAMES = ["WebVideo.App", "WebVideo_test.App"];
export const GOOGLEDRIVE_APP_NAMES = ["Cengage.Google.Doc"];
export const ONEDRIVE_APP_NAMES = [
  "Cengage.OneDrive",
  "Cengage.OneDrive.QA",
  "Cengage.OneDrive.Local",
];
export const CAREER_READINESS_AI_SIMULATION_APP_NAMES = [
  "CareerReadiness.AISimulation",
];
export const NONACTIVITY_APP_NAMES = ["Cengage.non-mt-activity"];
export const LTI_APP_NAMES = ["Cengage.LTI"];
export const SCORM_APP_NAMES = ["Cengage.SCORM"];
export const AYR_APP_NAMES = ["Cengage.AYR"];
export const GROVE_APP_NAMES = ["Cengage.excel.online"];
export const OUTLINE_BUILDER_APP_NAMES = ["Cengage.Outline.Speech"];

export const INTERNAL_MAST_ACTIVITIES = [
  FLASHCARD_APP_NAMES,
  BONGO_APP_NAMES,
  MOBLAB_APP_NAMES,
  CEREGO_APP_NAMES,
  TURNITIN_APP_NAMES,
  SAM_APP_NAMES,
  DIETWELLNESSPLUS_APP_NAMES,
  COGLABS_APP_NAMES,
  GROVE_APP_NAMES,
  OUTLINE_BUILDER_APP_NAMES,
].flat();

export const EXTERNAL_MAST_ACTIVITIES = [
  WEBLINK_APP_NAMES,
  WEBVIDEO_APP_NAMES,
  GOOGLEDRIVE_APP_NAMES,
  ONEDRIVE_APP_NAMES,
  CAREER_READINESS_AI_SIMULATION_APP_NAMES,
  NONACTIVITY_APP_NAMES,
].flat();

export const MAST_ACTIVITIES_WITH_ATTEMPTS = [
  AYR_APP_NAMES,
  BONGO_APP_NAMES,
  CEREGO_APP_NAMES,
  GROVE_APP_NAMES,
  OUTLINE_BUILDER_APP_NAMES,
  LTI_APP_NAMES,
  MT_ACTIVITY_APP_NAME,
  SAM_APP_NAMES,
  SCORM_APP_NAMES,
  TURNITIN_APP_NAMES,
].flat();

export const USAGE_STATUS = {
  PENDING_AUTOGRADING: 3,
  COMPLETED: 2,
  IN_PROGRESS: 1,
};

export const INTERACTION = {
  CONTINUOUS: "continuous",
};

export const NON_DELETABLE_ACTIVITY_TYPES = [
  ACTIVITY_TYPES.READING,
  ACTIVITY_TYPES.FILE_DOWNLOAD,
];

//mindApp groups by available kebab menu options
export const APPS_WITH_MANAGE_ACTIVITY_SETTINGS_ITEM = [
  BONGO_APP_NAMES,
  MT_ACTIVITY_APP_NAME,
  AYR_APP_NAME,
  SAM_APP_NAMES,
].flat();
export const APPS_WITH_EDIT_ACTIVITY_TITLE_AND_CONTENT_ITEM = [
  BONGO_APP_NAMES,
  MT_ACTIVITY_APP_NAME,
].flat();
export const APPS_WITH_MANAGE_ACTIVITY_TITLE_AND_SETTINGS_ITEM = [
  WEBVIDEO_APP_NAMES,
  WEBLINK_APP_NAMES,
  ONEDRIVE_APP_NAMES,
  GOOGLEDRIVE_APP_NAMES,
  CEREGO_APP_NAMES,
  COGLABS_APP_NAMES,
  DIETWELLNESSPLUS_APP_NAMES,
  NONACTIVITY_APP_NAMES,
  EREADER_APP_NAMES,
  FLASHCARD_APP_NAMES,
  LTI_APP_NAMES,
  SCORM_APP_NAMES,
  MOBLAB_APP_NAMES,
  [MEDIA_APP_NAME],
  TURNITIN_APP_NAMES,
  GROVE_APP_NAMES,
  OUTLINE_BUILDER_APP_NAMES,
].flat();
export const APPS_WITH_EDIT_ACTIVITY_CONTENT_ITEM = [
  WEBVIDEO_APP_NAMES,
  WEBLINK_APP_NAMES,
  ONEDRIVE_APP_NAMES,
  GOOGLEDRIVE_APP_NAMES,
  FLASHCARD_APP_NAMES,
  [MEDIA_APP_NAME],
].flat();

export const APPS_WITH_SETTINGS_MODAL = [
  BONGO_APP_NAMES,
  CEREGO_APP_NAMES,
  COGLABS_APP_NAMES,
  DIETWELLNESSPLUS_APP_NAMES,
  FLASHCARD_APP_NAMES,
  SAM_APP_NAMES,
  GOOGLEDRIVE_APP_NAMES,
  CAREER_READINESS_AI_SIMULATION_APP_NAMES,
  NONACTIVITY_APP_NAMES,
  ONEDRIVE_APP_NAMES,
  WEBLINK_APP_NAMES,
  WEBVIDEO_APP_NAMES,
  AYR_APP_NAMES,
  [MEDIA_APP_NAME],
  TURNITIN_APP_NAMES,
  GROVE_APP_NAMES,
  MOBLAB_APP_NAMES,
  OUTLINE_BUILDER_APP_NAMES,
].flat();

export const APPS_WITH_MANAGE_MORE_ACTIVITY_OPTIONS_ITEM = [
  SAM_APP_NAMES,
  GROVE_APP_NAMES,
  OUTLINE_BUILDER_APP_NAMES,
  TURNITIN_APP_NAMES,
].flat();

export const MINDAPP_LAUNCH_TYPES = {
  ACTIVITY: "ACTIVITY",
  ADD_ACTIVITY: "ADD_ACTIVITY",
  ADD_INLINE_ACTIVITY: "ADD_INLINE_ACTIVITY",
  EDIT_ACTIVITY: "EDIT_ACTIVITY",
  EDIT_INLINE_ACTIVITY: "EDIT_INLINE_ACTIVITY",
  EDIT_INLINE_ANNOTATION: "EDIT_INLINE_ANNOTATION",
  EMBEDDED_ACTIVITY: "EMBEDDED_ACTIVITY",
  APPDOCK: "APPDOCK",
  FRAME_ID: "_NB_Main_IFrame",
};

export const FULL_SCREEN_DOCK_APPS = [
  "Cengage.StudyCenter",
  "Cengage.FlashCard",
  "Cengage.Progress",
  "Cengage.YouSeeU",
  "Cengage.Diet.Wellness.Plus",
  "Cengage.Outline.Speech",
  "Cengage.Evernote",
  "Cengage.Kaltura",
];

export const DOCK_APPS_CACHE_BLACKLIST = ["Cengage.Progress", "Cengage.Media"];
export const DOCK_ACTIONS_CACHE_BLACKLIST = ["Enlarged View"];

export const SCORE_STRATEGY = {
  Best: 1,
  Average: 2,
  Last: 3,
} as const;
export type ScoreStrategy = typeof SCORE_STRATEGY;

export const ATTEMPT_STATUS = {
  NotStarted: 0,
  InProgress: 1,
  Completed: 2,
  PendingAutograding: 3,
} as const;
export type AttemptStatus = typeof ATTEMPT_STATUS;

export const SUBTYPES = [
  "survey",
  "numeric-survey",
  "csfi-pre-test",
  "csfi-post-test",
  "lrno-activity",
  "excel-online",
  "Training",
] as const;
export type SubTypes = (typeof SUBTYPES)[number] | null;

export const GRADABLE = "COUNTS TOWARDS GRADE" as const;
export const SCORABLE = "PRACTICE" as const;
export const HIDDENACTIVITY = "" as const;
