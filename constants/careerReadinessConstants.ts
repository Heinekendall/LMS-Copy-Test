export const COMPETENCIES = {
  COMMUNICATION: "Communication",
  CRITICAL_THINKING: "Critical Thinking",
  PROFESSIONALISM: "Professionalism",
  TECHNOLOGY: "Technology",
  CAREER_AND_SELF_DEVELOPMENT: "Career & Self-Development",
  EQUITY_AND_INCLUSION: "Equity & Inclusion",
  LEADERSHIP: "Leadership",
  TEAMWORK: "Teamwork",
} as const;
export type Competencies = (typeof COMPETENCIES)[keyof typeof COMPETENCIES];
