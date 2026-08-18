import { ModalSize } from "react-magma-dom";

import type { ModalProps } from "../../types/modalTypes.ts";
import {
  AutoSetPointsActivityType,
  AutoSetPointsActivityTypes,
  AutoSetPointsBreakdown,
  AutoSetPointsBreakdownCard,
  AutoSetPointsBreakdownCardHeader,
  AutoSetPointsBreakdownFormula,
  AutoSetPointsBreakdownGrid,
  AutoSetPointsBreakdownHeader,
  AutoSetPointsBreakdownName,
  AutoSetPointsBreakdownPercent,
  AutoSetPointsBreakdownPoints,
  AutoSetPointsBreakdownTitle,
  AutoSetPointsContent,
  AutoSetPointsCourseTitle,
  AutoSetPointsIntro,
  AutoSetPointsList,
  AutoSetPointsListItem,
  AutoSetPointsModalShell,
  AutoSetPointsOverview,
  AutoSetPointsStat,
  AutoSetPointsStatLabel,
  AutoSetPointsStats,
  AutoSetPointsStatValue,
  AutoSetPointsSummary,
  AutoSetPointsTotal,
} from "./AutoSetPointsPossibleModal.styled.ts";

const courseStats = [
  { label: "weeks", value: "16" },
  { label: "Chapters", value: "9" },
  { label: "Activities", value: "87" },
];

const activityTypes = [
  "20 Readings",
  "10 Practice",
  "25 Homeworks",
  "4 Discussions",
  "20 Quizzes",
  "4 Tests",
];

const summaryItems = [
  "The folders are divided into four main sections: Learn It' for practice and homework, 'Study It' for notes, presentations and study tools, and 'Apply It' for quizzes and tests. This structure supports a thorough learning experience.",
  "One concept-check practice due every Monday",
  "Homework assignments distributed throughout the 12-week schedule",
  "Procedure or case test due every Friday",
  "Final competency resources kept in Week 12",
];

const pointBreakdown = [
  {
    formula: "25 \u00d7 10 points",
    name: "Homework",
    percent: "23.4%",
    points: "250 points",
  },
  {
    formula: "20 \u00d7 15 points",
    name: "Quizzes",
    percent: "28.0%",
    points: "300 points",
  },
  {
    formula: "4 \u00d7 100 points",
    name: "Tests",
    percent: "37.4%",
    points: "400 points",
  },
  {
    formula: "4 \u00d7 10 points",
    name: "Discussions",
    percent: "11.2%",
    points: "40 points",
  },
  {
    formula: "10 \u00d7 1 points",
    name: "Practice",
    percent: "0%",
    points: "10 points",
  },
  {
    formula: "20 \u00d7 0 points",
    name: "Reading",
    percent: "0%",
    points: "0 points",
  },
];

export default function AutoSetPointsPossibleModal({ onClose }: ModalProps) {
  return (
    <AutoSetPointsModalShell
      header="Auto Set Points Possible"
      headerLevel={1}
      isOpen
      onClose={() => onClose(false)}
      size={ModalSize.large}
    >
      <AutoSetPointsContent>
        <AutoSetPointsIntro>
          You built a 6-week Phlebotomy, Section A course using Chapters 1-9
          from a 20-chapter book skipping Chapters 3,4, and 18-20 plus
          Additional Resources. I mapped the book content to a repeating weekly
          cadence: concept-check practice on Monday, review-question homework
          due Wednesday at 11:49 PM, and a Friday procedure or case test.
        </AutoSetPointsIntro>

        <AutoSetPointsSummary aria-labelledby="auto-set-points-course-title">
          <AutoSetPointsCourseTitle id="auto-set-points-course-title">
            Phlebotomy, Section A
          </AutoSetPointsCourseTitle>

          <AutoSetPointsOverview>
            <AutoSetPointsStats aria-label="Course summary">
              {courseStats.map((stat) => (
                <AutoSetPointsStat key={stat.label}>
                  <AutoSetPointsStatValue>{stat.value}</AutoSetPointsStatValue>
                  <AutoSetPointsStatLabel>{stat.label}</AutoSetPointsStatLabel>
                </AutoSetPointsStat>
              ))}
            </AutoSetPointsStats>

            <AutoSetPointsActivityTypes aria-label="Activity types">
              {activityTypes.map((activityType) => (
                <AutoSetPointsActivityType key={activityType}>
                  {activityType}
                </AutoSetPointsActivityType>
              ))}
            </AutoSetPointsActivityTypes>
          </AutoSetPointsOverview>

          <AutoSetPointsList>
            {summaryItems.map((item) => (
              <AutoSetPointsListItem key={item}>{item}</AutoSetPointsListItem>
            ))}
          </AutoSetPointsList>

          <AutoSetPointsBreakdown aria-labelledby="auto-set-points-breakdown-title">
            <AutoSetPointsBreakdownHeader>
              <AutoSetPointsBreakdownTitle id="auto-set-points-breakdown-title">
                Course Points Breakdown
              </AutoSetPointsBreakdownTitle>
              <AutoSetPointsTotal>1,000</AutoSetPointsTotal>
            </AutoSetPointsBreakdownHeader>

            <AutoSetPointsBreakdownGrid>
              {pointBreakdown.map((breakdown) => (
                <AutoSetPointsBreakdownCard key={breakdown.name}>
                  <AutoSetPointsBreakdownCardHeader>
                    <div>
                      <AutoSetPointsBreakdownName>
                        {breakdown.name}
                      </AutoSetPointsBreakdownName>
                      <AutoSetPointsBreakdownFormula>
                        {breakdown.formula}
                      </AutoSetPointsBreakdownFormula>
                    </div>
                    <AutoSetPointsBreakdownPercent>
                      {breakdown.percent}
                    </AutoSetPointsBreakdownPercent>
                  </AutoSetPointsBreakdownCardHeader>
                  <AutoSetPointsBreakdownPoints>
                    {breakdown.points}
                  </AutoSetPointsBreakdownPoints>
                </AutoSetPointsBreakdownCard>
              ))}
            </AutoSetPointsBreakdownGrid>
          </AutoSetPointsBreakdown>
        </AutoSetPointsSummary>
      </AutoSetPointsContent>
    </AutoSetPointsModalShell>
  );
}
