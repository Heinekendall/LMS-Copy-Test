import { magma, Modal, styled } from "react-magma-dom";

const summaryBorder = "#e5e7eb";
const summaryText = "#101828";
const bodyText = "#364153";
const subduedText = "#4a5565";
const bulletText = "#99a1af";
const summarySurface = "#f9fafb";
const activityTypeBackground = "#e8e9f8";
const activityTypeBorder = "#8b91da";
const activityTypeText = "#292f7c";
const breakdownValue = "#155dfc";

export const AutoSetPointsModalShell = styled(Modal)`
  width: min(860px, calc(100vw - 48px));
  max-width: min(860px, calc(100vw - 48px));
  max-height: calc(100vh - 80px);
  max-height: calc(100dvh - 80px);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  > div[class*="ModalHeader"] {
    flex-shrink: 0;
    border-bottom: none;
  }

  > div[class*="ModalHeader"] h1 {
    border-bottom: none;
  }

  > div[class*="ModalWrapper"] {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    width: calc(100vw - 24px);
    max-width: calc(100vw - 24px);
    max-height: calc(100vh - 48px);
    max-height: calc(100dvh - 48px);
  }
`;

export const AutoSetPointsContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing07};
  min-height: 0;
  padding-right: ${magma.spaceScale.spacing02};
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const AutoSetPointsIntro = styled.p`
  max-width: 788px;
  margin: 0;
  color: ${bodyText};
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0;
`;

export const AutoSetPointsSummary = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing07};
  padding: ${magma.spaceScale.spacing07};
  border: 1px solid ${summaryBorder};
  border-radius: 14px;
  background-color: ${magma.colors.neutral100};
  box-shadow:
    0 1px 1.5px rgb(0 0 0 / 10%),
    0 1px 1px rgb(0 0 0 / 10%);

  @media (max-width: ${magma.breakpoints.small}px) {
    padding: ${magma.spaceScale.spacing05};
  }
`;

export const AutoSetPointsCourseTitle = styled.h2`
  margin: 0;
  color: ${summaryText};
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0;
`;

export const AutoSetPointsOverview = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 48px;

  @media (max-width: ${magma.breakpoints.medium}px) {
    flex-direction: column;
    gap: ${magma.spaceScale.spacing05};
  }
`;

export const AutoSetPointsStats = styled.div`
  display: grid;
  flex: 0 0 306px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${magma.spaceScale.spacing06};
  min-width: 0;

  @media (max-width: ${magma.breakpoints.medium}px) {
    flex-basis: auto;
    width: min(100%, 360px);
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    width: 100%;
  }
`;

export const AutoSetPointsStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing02};
  min-width: 0;
`;

export const AutoSetPointsStatValue = styled.span`
  color: ${summaryText};
  font-size: 36px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0;
`;

export const AutoSetPointsStatLabel = styled.span`
  color: ${subduedText};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
`;

export const AutoSetPointsActivityTypes = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(3, minmax(104px, 1fr));
  gap: 10px;
  max-width: 367px;
  min-width: 0;

  @media (max-width: ${magma.breakpoints.medium}px) {
    max-width: 100%;
    width: 100%;
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const AutoSetPointsActivityType = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 4px 12px;
  overflow: hidden;
  border: 1px solid ${activityTypeBorder};
  border-radius: ${magma.borderRadiusSmall};
  background-color: ${activityTypeBackground};
  color: ${activityTypeText};
  font-family: "Work Sans", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  white-space: nowrap;
`;

export const AutoSetPointsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing03};
  margin: 0;
  padding: 0;
  color: ${bodyText};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  list-style: none;
`;

export const AutoSetPointsListItem = styled.li`
  display: flex;
  gap: ${magma.spaceScale.spacing03};

  &::before {
    flex: 0 0 auto;
    color: ${bulletText};
    content: "\\2022";
  }
`;

export const AutoSetPointsBreakdown = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing06};
  padding-top: ${magma.spaceScale.spacing06};
  border-top: 1px solid ${summaryBorder};
`;

export const AutoSetPointsBreakdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${magma.spaceScale.spacing05};
`;

export const AutoSetPointsBreakdownTitle = styled.h3`
  margin: 0;
  color: ${summaryText};
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0;
`;

export const AutoSetPointsTotal = styled.span`
  color: ${summaryText};
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0;
  white-space: nowrap;
`;

export const AutoSetPointsBreakdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${magma.spaceScale.spacing05};

  @media (max-width: ${magma.breakpoints.small}px) {
    grid-template-columns: 1fr;
  }
`;

export const AutoSetPointsBreakdownCard = styled.article`
  display: grid;
  grid-template-rows: 1fr auto;
  gap: ${magma.spaceScale.spacing03};
  min-height: 118px;
  padding: ${magma.spaceScale.spacing05};
  border: 1px solid ${summaryBorder};
  border-radius: 10px;
  background-color: ${summarySurface};
`;

export const AutoSetPointsBreakdownCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${magma.spaceScale.spacing04};
`;

export const AutoSetPointsBreakdownName = styled.h4`
  margin: 0;
  color: ${summaryText};
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0;
`;

export const AutoSetPointsBreakdownFormula = styled.p`
  margin: ${magma.spaceScale.spacing02} 0 0;
  color: ${subduedText};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
`;

export const AutoSetPointsBreakdownPercent = styled.span`
  flex: 0 0 auto;
  color: ${breakdownValue};
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0;
  text-align: right;
  white-space: nowrap;
`;

export const AutoSetPointsBreakdownPoints = styled.p`
  margin: 0;
  color: ${summaryText};
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0;
`;
