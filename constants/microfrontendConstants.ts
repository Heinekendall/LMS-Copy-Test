export const REMOTE_MODULES = {
  AssessmentUI: {
    name: "AssessmentUI",
    entry: "/assessment-ui/remoteEntry.js",
    entryHash: "/assessment-ui/remoteEntryHash.json",
    type: "module",
    components: [
      "AssessmentUiComponent",
      "SaaNumericalReportComponent",
      "CsfiReportComponent",
    ],
  },
} as const;

export type TRemoteModules = typeof REMOTE_MODULES;
