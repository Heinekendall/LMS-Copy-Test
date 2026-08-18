import { magma, styled } from "react-magma-dom";

const instructorNavy = "#191d58";
const instructorBlue = "#2b33b7";
const instructorText = "#303030";

export const CanvasShell = styled.div`
  display: grid;
  grid-template-columns: 72px 220px minmax(0, 1fr);
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background: #f6f6f6;
  color: ${instructorText};
  font-family: Arial, Helvetica, sans-serif;

  @media (max-width: ${magma.breakpoints.medium}px) {
    grid-template-columns: 72px minmax(0, 1fr);
  }
`;

export const CanvasGlobalNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 0;
  background: #344955;
  color: #ffffff;
`;

export const CanvasGlobalNavItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 72px;
  min-height: 62px;
  background: ${({ active }) => (active ? "#ffffff" : "transparent")};
  color: ${({ active }) => (active ? "#1976d2" : "#ffffff")};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
`;

export const CanvasCourseNav = styled.aside`
  overflow-y: auto;
  border-right: 1px solid #d4d4d4;
  background: #ffffff;

  @media (max-width: ${magma.breakpoints.medium}px) {
    display: none;
  }
`;

export const CanvasCourseNavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 34px 22px;
`;

export const CanvasCourseNavItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 38px;
  border-left: 3px solid ${({ active }) => (active ? "#344955" : "transparent")};
  padding-left: ${({ active }) => (active ? "10px" : "13px")};
  color: ${({ active }) => (active ? "#303030" : "#1976d2")};
  font-size: 16px;
  line-height: 24px;
`;

export const CanvasMain = styled.main`
  height: 100vh;
  min-width: 0;
  overflow-y: auto;
`;

export const CengageAppShell = styled.section`
  display: flex;
  flex-direction: column;
  width: min(1180px, calc(100% - 64px));
  min-height: calc(100vh - 96px);
  margin: 32px auto;
  border: 1px solid #d4d4d4;
  background: #ffffff;
  box-shadow: 0 1px 5px rgb(0 0 0 / 12%);
`;

export const CengageAppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 54px;
  padding: 0 28px;
  border-bottom: 1px solid #d4d4d4;
  background: #ffffff;
`;

export const CengageLogo = styled.img`
  display: block;
  width: 126px;
  height: auto;
`;

export const CengageHeroLogo = styled.img`
  display: block;
  width: 44px;
  height: auto;
`;

export const CanvasExitButton = styled.button`
  min-width: 56px;
  min-height: 34px;
  border: 1px solid #8b91da;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${instructorBlue};
    outline-offset: 2px;
  }
  color: ${instructorBlue};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 18%);
  }
`;

export const CengageFormatLanding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  padding: 56px 48px 72px;
  text-align: center;
`;

export const CengageFormatHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  h1 {
    margin: 0;
    color: #454545;
    font-size: 28px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 0;
  }

  p {
    margin: 0;
    color: #454545;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0;
  }
`;

export const CanvasFormatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  width: 100%;

  @media (max-width: ${magma.breakpoints.large}px) {
    grid-template-columns: 1fr;
  }
`;

export const CanvasFormatCard = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  min-height: 252px;
  padding: 46px 32px 34px;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  background: #ffffff;
`;

export const CanvasFormatGraphic = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #8b91da;

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #8b91da;
  }
`;

export const CanvasFormatCopy = styled.div`
  color: #454545;
  font-size: 16px;
  line-height: 24px;

  h2 {
    margin: 0 0 8px;
    color: #454545;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0;
  }

  p {
    margin: 0;
  }
`;

export const CanvasPrimaryActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 26px;
  border: 1px solid ${instructorBlue};
  border-radius: 8px;
  background: ${instructorBlue};
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 22%);
  }

  &:disabled {
    border-color: #b8b8b8;
    background: #bfc2df;
    color: #f1f1f1;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const CengageStepper = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  padding: 30px 150px 28px;
  border-bottom: 1px solid #d4d4d4;
  list-style: none;

  @media (max-width: ${magma.breakpoints.large}px) {
    padding-right: 48px;
    padding-left: 48px;
  }
`;

export const CengageStep = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #454545;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  text-align: center;

  &::before {
    position: absolute;
    top: 15px;
    right: 50%;
    left: -50%;
    height: 2px;
    background: #d4d4d4;
    content: "";
  }

  &:first-of-type::before {
    display: none;
  }

  &[data-state="active"],
  &[data-state="complete"] {
    color: #454545;
  }

  &[data-state="active"]::before,
  &[data-state="complete"]::before {
    background: ${instructorBlue};
  }
`;

export const CengageStepCircle = styled.span`
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 2px solid #d4d4d4;
  border-radius: 999px;
  background: #ffffff;
  color: transparent;
  font-size: 12px;
  font-weight: 700;

  &[data-state="active"] {
    border-color: ${instructorBlue};
    color: transparent;
  }

  &[data-state="complete"] {
    border-color: ${instructorBlue};
    background: ${instructorBlue};
    color: #ffffff;
  }
`;

export const CanvasFlowContent = styled.div`
  flex: 1 0 auto;
  padding: 34px 48px 104px;
`;

export const CanvasFlowHeading = styled.div`
  margin-bottom: 26px;

  h1 {
    margin: 0;
    color: #454545;
    font-size: 26px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0;
  }
`;

export const CanvasSearchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
`;

export const CanvasSearchInput = styled.input`
  width: min(480px, 100%);
  height: 42px;
  padding: 0 14px;
  border: 1px solid #777777;
  border-radius: 8px;
  color: #454545;
  font-size: 16px;
  letter-spacing: 0;
`;

export const CanvasFilterButton = styled.button`
  border: 0;
  background: transparent;
  color: #454545;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
  cursor: pointer;
`;

export const CanvasTitleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CanvasTitleCard = styled.article`
  padding: 18px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;

  h2 {
    margin: 0 0 20px;
    color: #454545;
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 0;
  }
`;

export const CanvasTitleOption = styled.button`
  display: grid;
  grid-template-columns: 74px auto minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  width: 100%;
  min-height: 92px;
  padding: 12px 16px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
  color: #454545;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &[aria-pressed="true"] {
    border-color: ${instructorBlue};
    box-shadow: 0 0 0 2px rgb(43 51 183 / 20%);
  }
`;

export const CanvasRadio = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 2px solid #777777;
  border-radius: 999px;

  &[data-selected="true"] {
    border: 4px solid ${instructorBlue};
  }
`;

export const CanvasCourseCover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 64px;
  border: 1px solid #d4d4d4;
  background:
    linear-gradient(145deg, rgb(0 112 160 / 24%), transparent 48%),
    linear-gradient(24deg, rgb(43 51 183 / 20%), transparent 46%), #f6fbfd;
  color: ${instructorBlue};
  font-size: 12px;
  font-weight: 700;
  text-align: center;
`;

export const CanvasTitleMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #454545;
  font-size: 15px;
  line-height: 22px;

  strong {
    font-weight: 700;
  }
`;

export const CanvasSelectedCoursePanel = styled.div`
  margin-bottom: 28px;
  border: 1px solid #0076ce;
  background: #eaf6ff;
`;

export const CanvasSelectedCourseHero = styled.div`
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 28px;
  align-items: center;
  padding: 24px 28px;
  background: ${instructorNavy};
  color: #ffffff;

  h2 {
    margin: 0 0 12px;
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
  }

  p {
    margin: 0 0 10px;
    color: #ffffff;
    font-size: 16px;
    line-height: 24px;
  }
`;

export const CanvasInfoBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  color: #006298;
  font-size: 20px;
  line-height: 28px;
`;

export const CanvasIntegrationOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CanvasIntegrationOption = styled.button`
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 92px;
  padding: 22px 28px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
  color: #454545;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  text-align: left;
  cursor: pointer;

  &[aria-pressed="true"] {
    border-color: ${instructorBlue};
    box-shadow: 0 0 0 2px rgb(43 51 183 / 20%);
  }

  &[aria-disabled="true"],
  &:disabled {
    color: #707070;
    cursor: default;
    opacity: 0.72;
    box-shadow: none;
  }
`;

export const CanvasSourceCourseTable = styled.div`
  margin-top: -8px;
  margin-bottom: 4px;
  padding: 0 28px 28px 84px;
  border: 1px solid #d4d4d4;
  border-top: 0;
  border-radius: 0 0 8px 8px;
  background: #ffffff;

  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #d4d4d4;
    color: #454545;
    font-size: 18px;
    line-height: 26px;
  }
`;

export const CanvasSourceCourseHeader = styled.th`
  padding: 10px 12px;
  border-bottom: 1px solid #d4d4d4;
  background: #f3f3f3;
  color: #454545;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

export const CanvasSourceCourseCell = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid #d4d4d4;
  color: #454545;
  font-size: 18px;
  line-height: 26px;
`;

export const CanvasSourceCourseOption = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #454545;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 24%);
  }
`;

export const CourseDetailsSection = styled.section`
  color: #454545;

  > p {
    margin: -12px 0 22px;
    color: #707070;
    font-size: 15px;
    line-height: 22px;
  }
`;

export const CourseDetailsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const CourseDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: ${magma.breakpoints.medium}px) {
    grid-template-columns: 1fr;
  }
`;

export const CourseDetailsField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #454545;
  font-size: 15px;
  font-weight: 700;
  line-height: 22px;

  input {
    width: 100%;
    min-height: 42px;
    padding: 0 12px;
    border: 1px solid #777777;
    border-radius: 8px;
    background: #ffffff;
    color: #454545;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0;
  }

  span {
    color: #707070;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
`;

export const IntegratedSuccessView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 600px;
  padding: 64px 48px;
  background: #f7f7f7;
  color: #454545;
  text-align: center;

  h1 {
    margin: 18px 0 28px;
    font-size: 26px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0;
  }

  strong {
    color: #454545;
    font-size: 16px;
    line-height: 24px;
  }

  p {
    max-width: 560px;
    margin: 24px 0 30px;
    color: #707070;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0;
  }
`;

export const IntegratedSuccessIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: #07850f;
  color: #ffffff;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
`;

export const IntegratedActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const IntegratedActionButton = styled.button`
  min-height: 42px;
  padding: 0 28px;
  border: 1px solid #8b91da;
  border-radius: 8px;
  background: #ffffff;
  color: ${instructorBlue};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
  cursor: pointer;

  &[data-variant="primary"] {
    border-color: ${instructorBlue};
    background: ${instructorNavy};
    color: #ffffff;
  }

  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 22%);
  }
`;

export const CanvasSelectContentToolbar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 26px;
  margin-bottom: 14px;
  color: #707070;
  font-size: 16px;
  line-height: 24px;

  button {
    border: 0;
    background: transparent;
    color: ${instructorBlue};
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

export const CanvasSelectContentCard = styled.div`
  margin-bottom: 32px;
  border: 1px solid #d4d4d4;
  border-radius: 6px;
  overflow: hidden;
`;

export const CanvasSelectContentRow = styled.div`
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto auto 32px;
  align-items: center;
  gap: 14px;
  min-height: 46px;
  padding: 0 12px;
  border-bottom: 1px solid #d4d4d4;
  color: #707070;
  font-size: 18px;
  line-height: 26px;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }

  button {
    width: fit-content;
    padding: 0;
    border: 0;
    background: transparent;
    color: #0033a1;
    font: inherit;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
  }

  strong {
    color: #707070;
    font-weight: 400;
  }
`;

export const CanvasSelectContentFooter = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  margin: 18px -48px -104px;
  padding: 0 48px;
  background: #ffffff;
  box-shadow: 0 -2px 8px rgb(0 0 0 / 12%);
  color: #707070;
  font-size: 18px;
  line-height: 26px;
`;

export const CanvasFooterBar = styled.footer`
  position: sticky;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  min-height: 74px;
  padding: 0 28px;
  background: ${instructorNavy};
`;

export const CanvasBackButton = styled.button`
  border: 0;
  background: transparent;
  color: #ffffff;
  font-size: 18px;
  line-height: 28px;
  cursor: pointer;
`;

export const MobileWarning = styled.div`
  display: none;
  margin: 16px;
  padding: 12px 14px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
  color: #454545;
  font-size: 14px;
  line-height: 20px;

  @media (max-width: ${magma.breakpoints.small}px) {
    display: block;
  }
`;

export const ModalScrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 42px;
  padding-bottom: 42px;
  background: rgb(0 0 0 / 60%);
  overflow: auto;
`;

export const ScheduleBreaksDialog = styled.div`
  width: min(1024px, calc(100vw - 48px));
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 6px 18px rgb(0 0 0 / 28%);
  font-family: "Work Sans", Arial, Helvetica, sans-serif;
`;

export const ScheduleContent = styled.div`
  padding: 28px 32px 24px;
`;

export const ScheduleHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
`;

export const ScheduleIntro = styled.div`
  min-width: 0;

  h2 {
    margin: 0 0 8px;
    color: #0a0a0a;
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0;
  }

  p {
    margin: 0;
    color: #0a0a0a;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0;
  }
`;

export const ScheduleSection = styled.section`
  & + & {
    margin-top: 32px;
  }
`;

export const ScheduleSectionTitle = styled.h3`
  margin: 0 0 10px;
  color: #0a0a0a;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
`;

export const MeetingDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: ${magma.breakpoints.medium}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const MeetingDayButton = styled.button`
  min-height: 54px;
  padding: 0 16px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
  color: #454545;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  cursor: pointer;

  &[aria-pressed="true"] {
    border-color: ${instructorBlue};
    background: #eef1ff;
    color: #454545;
    font-weight: 600;
  }

  &:hover,
  &:focus-visible {
    border-color: ${instructorBlue};
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 22%);
  }
`;

export const ScheduleBreakCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: ${magma.breakpoints.small}px) {
    grid-template-columns: 1fr;
  }
`;

export const ScheduleBreakCalendarMonthCard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 101px;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  min-width: 0;
  min-height: 110px;
  padding: 8px 16px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${instructorBlue};
    outline-offset: 2px;
  }

  &[data-selected="true"] {
    border-color: #3942b0;
    background: #e8e9f8;
  }
`;

export const ScheduleBreakEditCard = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  width: 100%;
  min-width: 0;
  margin-bottom: 8px;
  padding: 16px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;

  &[data-placement="top"] {
    display: none;
  }

  &[data-placement="inline"] {
    grid-column: 1 / -1;
    margin-bottom: 0;
  }

  @media (max-width: ${magma.breakpoints.medium}px) {
    flex-wrap: wrap;
  }
`;

export const ScheduleBreakEditNameField = styled.label`
  display: flex;
  flex: 1 1 420px;
  flex-direction: column;
  gap: 8px;
  min-width: min(100%, 260px);
  color: #292f7c;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.16px;
`;

export const ScheduleBreakEditNameInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 8px;
  border: 1px solid #707070;
  border-radius: 8px;
  background: #ffffff;
  color: #454545;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;

  &:focus {
    border-color: ${instructorBlue};
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 18%);
  }
`;

export const ScheduleBreakEditDateField = styled.div`
  flex: 0 0 177px;
  min-width: 177px;

  @media (max-width: ${magma.breakpoints.medium}px) {
    flex: 1 1 177px;
  }
`;

export const ScheduleBreakEditActions = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 12px;
`;

export const ScheduleBreakEditCancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #8b91da;
  border-radius: 8px;
  background: #ffffff;
  color: ${instructorBlue};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 18%);
  }
`;

export const ScheduleBreakEditSaveButton = styled.button`
  min-width: 97px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid ${instructorBlue};
  border-radius: 8px;
  background: ${instructorBlue};
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 18%);
  }

  &:disabled {
    border-color: #b8b8b8;
    background: #d4d4d4;
    color: #707070;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const ScheduleBreakCalendarEventList = styled.div`
  display: block;
  width: 100%;
  min-width: 0;
`;

export const ScheduleBreakCalendarEvent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  min-height: 60px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;

  &[data-selected="true"] {
    border-color: transparent;
    background: transparent;
  }
`;

export const ScheduleBreakCalendarEventDetails = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 4px 0;
  color: #454545;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
`;

export const ScheduleBreakCalendarEventTitle = styled.span`
  max-width: 100%;
  overflow-wrap: anywhere;

  &[data-long-title="true"] {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const ScheduleBreakCalendarEventAction = styled.button`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #454545;
  cursor: pointer;

  svg {
    flex: 0 0 auto;
  }

  &:hover,
  &:focus-visible {
    color: #0033a1;
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 18%);
  }
`;

export const ScheduleBreakCalendarEventDateButton = styled.button`
  display: inline-flex;
  justify-content: flex-start;
  width: fit-content;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: #454545;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;
  text-decoration: none;
  text-transform: capitalize;
  cursor: pointer;

  &:hover {
    color: #454545;
    text-decoration: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 18%);
  }
`;

export const ScheduleBreakCalendarMonthList = styled.div`
  display: flex;
  justify-self: end;
  justify-content: flex-end;
  gap: 8px;
  width: 101px;
  max-width: 101px;
  min-width: 0;
  overflow: hidden;
  padding-bottom: 0;
`;

export const ScheduleBreakCalendarMonth = styled.div`
  flex: 0 0 101px;
  width: 101px;
  max-width: 101px;
  min-width: 0;
  padding: 0;
  background: #fbfbfb;
`;

export const ScheduleBreakCalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 1px;
  border-bottom: 1px solid #454545;
  color: #0a0a0a;
  font-size: 7px;
  font-weight: 700;
  line-height: 10px;
  letter-spacing: 0;
  text-transform: uppercase;
`;

export const ScheduleBreakCalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border-left: 1px solid #9b9b9b;
  border-top: 1px solid #9b9b9b;
`;

export const ScheduleBreakCalendarWeekday = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 11px;
  border-right: 1px solid #9b9b9b;
  border-bottom: 1px solid #9b9b9b;
  background: #ffffff;
  color: #0a0a0a;
  font-size: 7px;
  font-weight: 700;
  line-height: 10px;
  letter-spacing: 0;
`;

export const ScheduleBreakCalendarDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 11px;
  border-right: 1px solid #9b9b9b;
  border-bottom: 1px solid #9b9b9b;
  background: #ffffff;
  color: #303030;
  font-size: 7px;
  font-weight: 400;
  line-height: 10px;
  letter-spacing: 0;

  &[data-current-month="false"] {
    color: #9b9b9b;
  }

  &[data-selected="true"] {
    background: #ffe66c;
    color: #0a0a0a;
    font-weight: 700;
  }
`;

export const ScheduleCustomBreakButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 56px;
  margin-top: 16px;
  padding: 0 16px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
  color: #454545;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: ${instructorBlue};
    outline: none;
    box-shadow: 0 0 0 2px rgb(43 51 183 / 22%);
  }
`;

export const ScheduleCustomBreakPanel = styled.div`
  margin-top: 0;
  padding: 16px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
`;

export const ScheduleCustomBreakDateFields = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: ${magma.breakpoints.medium}px) {
    align-items: stretch;
  }
`;

export const ScheduleCustomBreakDateField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #292f7c;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0;

  &[data-size="name"] {
    flex: 1 1 320px;
    min-width: 220px;
  }

  &[data-size="date"] {
    flex: 0 0 177px;
    width: 177px;
  }

  @media (max-width: ${magma.breakpoints.medium}px) {
    &[data-size="name"],
    &[data-size="date"] {
      flex-basis: 100%;
      width: 100%;
    }
  }
`;

export const ScheduleCustomBreakDateInput = styled.input`
  min-width: 0;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #707070;
  border-radius: 8px;
  background: #ffffff;
  color: #454545;
  font: inherit;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #707070;
  }
`;

export const ScheduleCustomBreakDatePickerIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  margin-right: 4px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #454545;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgb(43 51 183 / 10%);
    color: ${instructorBlue};
    outline: none;
  }

  &[data-variant="outlined"] {
    width: 40px;
    height: 40px;
    margin-right: 0;
    border: 1px solid #8b91da;
    border-radius: 8px;
    background: #ffffff;
    color: ${instructorBlue};
  }

  &[data-variant="outlined"]:hover,
  &[data-variant="outlined"]:focus-visible {
    border-color: ${instructorBlue};
    background: rgb(43 51 183 / 8%);
  }
`;

export const ScheduleCustomBreakActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex: 0 0 auto;
  margin-top: 0;
`;

export const ScheduleCustomBreakSaveButton = styled.button`
  min-width: 96px;
  height: 40px;
  border: 1px solid ${instructorBlue};
  border-radius: 8px;
  background: ${instructorBlue};
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: #1f278f;
    outline: none;
  }

  &:disabled {
    border-color: #bcbcbc;
    background: #d8d8d8;
    color: #686868;
    cursor: not-allowed;
  }
`;

export const ScheduleFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;

  button {
    min-width: 170px;
    min-height: 52px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-transform: none;
  }
`;

export const DialogCloseButton = styled.button`
  border: 0;
  background: transparent;
  color: ${instructorBlue};
  font-size: 26px;
  line-height: 26px;
  cursor: pointer;
`;

export const DialogPrimaryButton = styled.button`
  min-width: 96px;
  min-height: 40px;
  border: 1px solid ${instructorBlue};
  border-radius: 6px;
  background: ${instructorBlue};
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
  cursor: pointer;
`;
