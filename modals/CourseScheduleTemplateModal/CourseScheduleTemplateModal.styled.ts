import { Button, magma, Modal, styled } from "react-magma-dom";

const dayButtonBorder = "#e5e7eb";
const fieldBorder = "#d1d5dc";
const customBreakBackground = "#f9fafb";
const subduedText = "#4a5565";
const blackText = "#0a0a0a";
const calendarLine = "#e5e7eb";
const calendarSurface = "#f8fafc";
const activityBlue = "#3434b8";

export const CourseScheduleModalShell = styled(Modal)`
  width: min(1180px, calc(100vw - 48px));
  max-width: min(1180px, calc(100vw - 48px));
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

export const CourseScheduleModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${magma.spaceScale.spacing07};
  min-height: 0;
  padding-right: ${magma.spaceScale.spacing02};
  overflow-y: auto;
  overscroll-behavior: contain;
  color: ${blackText};

  &[data-step="week-template"] {
    overflow: hidden;
  }
`;

export const CourseScheduleIntro = styled.p`
  margin: 0;
  color: ${subduedText};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
`;

export const CourseScheduleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing03};
`;

export const CourseScheduleSectionTitle = styled.h2`
  margin: 0;
  color: ${blackText};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
`;

export const CourseScheduleDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${magma.spaceScale.spacing04};

  @media (max-width: ${magma.breakpoints.medium}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    grid-template-columns: 1fr;
  }
`;

export const CourseScheduleDayButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: ${magma.spaceScale.spacing04};
  border: 2px solid ${dayButtonBorder};
  border-radius: 10px;
  background-color: ${magma.colors.neutral100};
  color: ${blackText};
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  cursor: pointer;

  &[aria-pressed="true"] {
    border-color: ${magma.colors.primary500};
    background-color: ${magma.colors.primary100};
    color: ${magma.colors.primary600};
  }

  &:hover,
  &:focus-visible {
    border-color: ${magma.colors.primary400};
    outline: none;
  }
`;

export const CourseScheduleBreaksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${magma.spaceScale.spacing04};

  @media (max-width: ${magma.breakpoints.small}px) {
    grid-template-columns: 1fr;
  }
`;

export const CourseScheduleBreakButton = styled.button`
  min-height: 68px;
  padding: 14px;
  border: 2px solid ${dayButtonBorder};
  border-radius: 10px;
  background-color: ${magma.colors.neutral100};
  color: ${blackText};
  font: inherit;
  text-align: left;
  cursor: pointer;

  &[aria-pressed="true"] {
    border-color: ${magma.colors.primary500};
    background-color: ${magma.colors.primary100};
  }

  &:hover,
  &:focus-visible {
    border-color: ${magma.colors.primary400};
    outline: none;
  }
`;

export const CourseScheduleBreakName = styled.span`
  display: block;
  overflow: hidden;
  color: ${blackText};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CourseScheduleBreakDate = styled.span`
  display: block;
  overflow: hidden;
  color: ${subduedText};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CourseScheduleAddBreakButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${magma.spaceScale.spacing03};
  min-height: 52px;
  width: 100%;
  border: 2px dashed #d1d5dc;
  border-radius: 10px;
  background-color: ${magma.colors.neutral100};
  color: ${subduedText};
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: ${magma.colors.primary400};
    color: ${magma.colors.primary600};
    outline: none;
  }
`;

export const CourseScheduleCustomBreakRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) 40px;
  align-items: end;
  gap: ${magma.spaceScale.spacing03};
  padding: ${magma.spaceScale.spacing04};
  border-radius: 10px;
  background-color: ${customBreakBackground};

  @media (max-width: ${magma.breakpoints.medium}px) {
    grid-template-columns: 1fr;
  }
`;

export const CourseScheduleCustomBreakField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing03};
  min-width: 0;
`;

export const CourseScheduleCustomBreakLabel = styled.label`
  color: ${blackText};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;
`;

export const CourseScheduleCustomBreakInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 ${magma.spaceScale.spacing04};
  border: 1px solid ${fieldBorder};
  border-radius: 10px;
  background-color: ${magma.colors.neutral100};
  color: ${blackText};
  font: inherit;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;

  &::placeholder {
    color: ${subduedText};
  }

  &:focus {
    border-color: ${magma.colors.primary400};
    box-shadow: 0 0 0 1px ${magma.colors.primary400};
    outline: none;
  }
`;

export const CourseScheduleRemoveCustomBreakButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 42px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background-color: transparent;
  color: ${subduedText};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: ${magma.colors.neutral100};
    color: ${magma.colors.primary500};
    outline: none;
  }

  @media (max-width: ${magma.breakpoints.medium}px) {
    justify-self: end;
  }
`;

export const CourseScheduleWeekTemplateLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(560px, 1fr) minmax(360px, 430px);
  gap: ${magma.spaceScale.spacing06};
  flex: 1;
  min-height: 0;
  overflow: hidden;

  @media (max-width: 1220px) {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
`;

export const CourseScheduleWeekTemplateMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing04};
  min-height: 0;
  min-width: 0;
  padding-right: ${magma.spaceScale.spacing02};
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const CourseScheduleCalendarHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${magma.spaceScale.spacing04};

  @media (max-width: ${magma.breakpoints.small}px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const CourseScheduleCalendarTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${magma.spaceScale.spacing03};
  min-width: 0;
  color: ${blackText};
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0;

  svg {
    flex-shrink: 0;
    color: ${activityBlue};
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const CourseScheduleCalendarNav = styled.div`
  display: inline-flex;
  flex-shrink: 1;
  align-items: center;
  gap: ${magma.spaceScale.spacing03};
  min-width: 0;
  color: ${subduedText};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 1px solid ${fieldBorder};
    border-radius: 8px;
    background: ${magma.colors.neutral100};
    color: ${activityBlue};
    cursor: pointer;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }

  button:not(:disabled):hover,
  button:not(:disabled):focus-visible {
    border-color: ${magma.colors.primary400};
    outline: none;
  }
`;

export const CourseScheduleCalendar = styled.div`
  flex: 1 1 auto;
  width: 100%;
  min-height: 220px;
  max-height: min(42vh, 460px);
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid ${calendarLine};
  border-radius: 8px;
  background: ${magma.colors.neutral100};
  overscroll-behavior: contain;
`;

export const CourseScheduleCalendarGrid = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows:
    48px
    minmax(
      max(220px, calc((var(--calendar-max-day-events, 1) * 52px) + 16px)),
      1fr
    );
  grid-auto-rows: max(
    220px,
    calc((var(--calendar-max-day-events, 1) * 52px) + 16px)
  );
  min-width: 0;
  min-height: calc(
    48px + max(220px, calc((var(--calendar-max-day-events, 1) * 52px) + 16px))
  );
  background: ${magma.colors.neutral100};
`;

export const CourseScheduleCalendarDayHeader = styled.div`
  position: sticky;
  z-index: 2;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 0;
  padding: ${magma.spaceScale.spacing02};
  border-right: 1px solid ${calendarLine};
  border-bottom: 1px solid ${calendarLine};
  background: ${calendarSurface};
  color: ${subduedText};
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0;
  text-transform: uppercase;

  &:last-of-type {
    border-right: 0;
  }

  &:first-of-type {
    z-index: 3;
    left: auto;
  }

  strong {
    color: ${blackText};
    font-size: 16px;
    line-height: 20px;
  }
`;

export const CourseScheduleCalendarDay = styled.div`
  min-width: 0;
  min-height: max(
    220px,
    calc((var(--calendar-max-day-events, 1) * 52px) + 16px)
  );
  border-right: 1px solid ${calendarLine};
  border-bottom: 1px solid ${calendarLine};
  background: ${magma.colors.neutral100};

  &[data-drop-target="true"] {
    background: ${magma.colors.primary100};
    box-shadow: inset 0 0 0 2px ${magma.colors.primary400};
  }
`;

export const CourseScheduleCalendarEvent = styled.button`
  position: absolute;
  z-index: 1;
  align-self: start;
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
  height: 44px;
  min-height: 44px;
  top: calc(
    ${magma.spaceScale.spacing02} +
      (var(--event-stack-index, 0) * (44px + ${magma.spaceScale.spacing02}))
  );
  right: ${magma.spaceScale.spacing02};
  bottom: auto;
  left: ${magma.spaceScale.spacing02};
  width: auto;
  padding: ${magma.spaceScale.spacing02};
  border: 1px solid #22229b;
  border-radius: 5px;
  background: #4444d0;
  color: ${magma.colors.neutral100};
  font: inherit;
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: 0;
  cursor: grab;
  overflow: hidden;
  text-align: left;

  &:active {
    cursor: grabbing;
  }

  &[data-dragging="true"] {
    opacity: 0.72;
  }

  &[data-drop-target="true"] {
    border-color: ${magma.colors.primary400};
    background: #3434b8;
    box-shadow:
      0 0 0 2px ${magma.colors.primary100},
      0 6px 16px rgb(0 0 0 / 22%);
  }

  &:hover,
  &:focus-visible {
    z-index: 3;
    height: auto;
    min-height: 44px;
    right: ${magma.spaceScale.spacing02};
    width: auto;
    max-width: none;
    border-color: #171773;
    background: #3434b8;
    box-shadow: 0 6px 16px rgb(0 0 0 / 22%);
    outline: none;
    overflow: hidden;
  }

  strong,
  span {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover strong,
  &:hover span,
  &:focus-visible strong,
  &:focus-visible span {
    white-space: normal;
  }
`;

export const CourseScheduleCalendarHoliday = styled.div`
  position: absolute;
  z-index: 1;
  align-self: start;
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${magma.spaceScale.spacing01};
  min-width: 0;
  height: 44px;
  min-height: 44px;
  top: ${magma.spaceScale.spacing02};
  right: ${magma.spaceScale.spacing02};
  bottom: auto;
  left: ${magma.spaceScale.spacing02};
  padding: ${magma.spaceScale.spacing02};
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #e5e7eb;
  color: #374151;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0;
  overflow: hidden;
  text-align: center;
`;

export const CourseScheduleAvailabilityFrame = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  gap: ${magma.spaceScale.spacing03};
  min-height: 56px;
  width: 100%;
  padding: ${magma.spaceScale.spacing04};
  border: 1px solid ${calendarLine};
  border-radius: 8px;
  background: ${calendarSurface};
  color: ${blackText};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0;

  &[data-drop-target="true"] {
    border-color: ${magma.colors.primary400};
    background: ${magma.colors.primary100};
    box-shadow: inset 0 0 0 1px ${magma.colors.primary400};
  }
`;

export const CourseScheduleAvailabilityFrameHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${magma.spaceScale.spacing03};
  width: 100%;
  min-width: 0;

  strong {
    color: ${blackText};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0;
  }

  span {
    color: ${subduedText};
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0;
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const CourseScheduleAvailabilityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${magma.spaceScale.spacing03};
  width: 100%;
`;

export const CourseScheduleAvailabilityItem = styled.button`
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto;
  align-items: center;
  gap: ${magma.spaceScale.spacing03};
  min-height: 56px;
  min-width: 0;
  padding: ${magma.spaceScale.spacing03};
  border: 1px solid ${fieldBorder};
  border-radius: 8px;
  background: ${magma.colors.neutral100};
  color: ${blackText};
  cursor: pointer;
  font: inherit;
  text-align: left;

  &[data-dragging="true"] {
    opacity: 0.72;
  }

  &[draggable="true"] {
    cursor: grab;
  }

  &[draggable="true"]:active {
    cursor: grabbing;
  }

  &:hover,
  &:focus-visible {
    border-color: ${magma.colors.primary400};
    outline: none;
  }
`;

export const CourseScheduleScheduleForm = styled.div`
  display: grid;
  flex-shrink: 0;
  grid-template-columns: repeat(4, minmax(0, 1fr)) auto;
  align-items: end;
  gap: ${magma.spaceScale.spacing03};
  padding: ${magma.spaceScale.spacing04};
  border: 1px solid ${calendarLine};
  border-radius: 8px;
  background: ${calendarSurface};

  @media (max-width: ${magma.breakpoints.medium}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${magma.breakpoints.small}px) {
    grid-template-columns: 1fr;
  }
`;

export const CourseScheduleScheduleActivityTitle = styled.div`
  grid-column: 1 / -1;
  min-width: 0;
  color: ${blackText};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CourseScheduleScheduleField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing02};
  min-width: 0;

  label {
    color: ${blackText};
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0;
  }
`;

export const CourseScheduleScheduleInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 ${magma.spaceScale.spacing03};
  border: 1px solid ${fieldBorder};
  border-radius: 8px;
  background: ${magma.colors.neutral100};
  color: ${blackText};
  font: inherit;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;

  &:focus {
    border-color: ${magma.colors.primary400};
    box-shadow: 0 0 0 1px ${magma.colors.primary400};
    outline: none;
  }
`;

export const CourseScheduleScheduleSetButton = styled.button`
  min-height: 40px;
  padding: 0 ${magma.spaceScale.spacing05};
  border: 1px solid ${activityBlue};
  border-radius: 8px;
  background: ${activityBlue};
  color: ${magma.colors.neutral100};
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: #29299a;
    outline: none;
  }
`;

export const CourseScheduleActivityPanel = styled.aside`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing03};
  min-height: 0;
  min-width: 0;
  padding: ${magma.spaceScale.spacing04};
  border: 1px solid ${calendarLine};
  border-radius: 8px;
  background: ${calendarSurface};
  overflow: hidden;
`;

export const CourseScheduleActivityPanelHeader = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${magma.spaceScale.spacing03};
  flex-shrink: 0;
  margin: 0;
  color: ${blackText};
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0;
`;

export const CourseScheduleChapterNav = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${magma.spaceScale.spacing02};

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 1px solid ${fieldBorder};
    border-radius: 8px;
    background: ${magma.colors.neutral100};
    color: ${activityBlue};
    cursor: pointer;
  }

  button:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }

  button:not(:disabled):hover,
  button:not(:disabled):focus-visible {
    border-color: ${magma.colors.primary400};
    outline: none;
  }
`;

export const CourseScheduleActivityPanelBody = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing03};
  min-height: 0;
  padding-right: ${magma.spaceScale.spacing02};
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const CourseScheduleActivitySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing02};
`;

export const CourseScheduleActivitySectionHeader = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${magma.spaceScale.spacing02};
  width: 100%;
  padding: ${magma.spaceScale.spacing02} 0;
  border: 0;
  background: transparent;
  color: ${blackText};
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0;
  text-align: left;
  cursor: default;
`;

export const CourseScheduleActivitySectionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing03};
`;

export const CourseScheduleActivityCard = styled.label`
  display: grid;
  grid-template-columns: 18px 32px minmax(0, 1fr) auto;
  align-items: center;
  gap: ${magma.spaceScale.spacing03};
  min-height: 72px;
  padding: ${magma.spaceScale.spacing03};
  border: 1px solid ${fieldBorder};
  border-radius: 8px;
  background: ${magma.colors.neutral100};
  color: ${blackText};
  cursor: pointer;

  &[data-selected="true"] {
    border-color: ${activityBlue};
    box-shadow: 0 0 0 1px ${activityBlue};
  }

  &[data-disabled="true"] {
    opacity: 0.48;
    cursor: not-allowed;
  }

  &[data-dragging="true"] {
    opacity: 0.72;
  }

  &[draggable="true"] {
    cursor: grab;
  }

  &[draggable="true"]:active {
    cursor: grabbing;
  }

  &:focus-within {
    border-color: ${magma.colors.primary400};
    outline: none;
  }
`;

export const CourseScheduleActivityCheckbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: ${activityBlue};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const CourseScheduleActivityIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${magma.colors.neutral300};
  color: ${subduedText};
`;

export const CourseScheduleActivityCardBody = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing01};
  min-width: 0;

  strong {
    overflow: hidden;
    color: ${blackText};
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const CourseScheduleActivityCardMeta = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${magma.spaceScale.spacing03};
  color: ${subduedText};
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;

  span {
    display: inline-flex;
    align-items: center;
    gap: ${magma.spaceScale.spacing02};
  }

  i {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    background: ${activityBlue};
  }

  i[data-variant="holiday"] {
    background: #d1d5db;
  }
`;

export const CourseScheduleActivityPoints = styled.span`
  color: ${subduedText};
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0;
  white-space: nowrap;
`;

export const CourseScheduleActivityAddButton = styled.button`
  position: sticky;
  z-index: 1;
  bottom: 0;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: ${magma.spaceScale.spacing02};
  min-height: 44px;
  width: 100%;
  margin-top: 0;
  border: 1px solid ${activityBlue};
  border-radius: 8px;
  background: ${magma.colors.neutral100};
  color: ${activityBlue};
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0;
  cursor: pointer;

  &:disabled {
    border-color: #cbd5e1;
    background: #e5e7eb;
    color: #6b7280;
    cursor: not-allowed;
  }

  &:not(:disabled):hover,
  &:not(:disabled):focus-visible {
    background: ${magma.colors.primary100};
    outline: none;
  }
`;

export const CourseScheduleActions = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  gap: ${magma.spaceScale.spacing03};
  padding-top: ${magma.spaceScale.spacing06};
  background-color: ${magma.colors.neutral100};

  @media (max-width: ${magma.breakpoints.small}px) {
    align-items: stretch;
    flex-direction: column-reverse;
  }
`;

export const CourseScheduleWeekFooter = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  gap: ${magma.spaceScale.spacing03};
  padding-top: ${magma.spaceScale.spacing06};
  background-color: ${magma.colors.neutral100};

  @media (max-width: ${magma.breakpoints.small}px) {
    align-items: stretch;
    flex-direction: column-reverse;
  }
`;

export const CourseScheduleActionButton = styled(Button)`
  min-width: 96px;

  @media (max-width: ${magma.breakpoints.small}px) {
    width: 100%;
  }
`;
