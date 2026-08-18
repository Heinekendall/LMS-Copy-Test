import { magma, styled } from "react-magma-dom";

const previewBlue = "#3f51b5";

export const ScheduleModalScrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  box-sizing: border-box;
  padding: 42px 24px;
  background: rgb(0 0 0 / 60%);
`;

export const ScheduleDialog = styled.div`
  width: min(1024px, calc(100vw - 48px));
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 6px 18px rgb(0 0 0 / 28%);
  color: #0a0a0a;
  font-family: "Work Sans", Arial, Helvetica, sans-serif;
`;

export const ScheduleContent = styled.div`
  padding: 28px 32px 24px;

  @media (max-width: ${magma.breakpoints.small}px) {
    padding: 24px 16px;
  }
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

export const ScheduleCloseButton = styled.button`
  border: 0;
  background: transparent;
  color: ${previewBlue};
  font-size: 26px;
  line-height: 26px;
  cursor: pointer;
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
    border-color: ${previewBlue};
    background: #eef1ff;
    color: #454545;
    font-weight: 600;
  }

  &:hover,
  &:focus-visible {
    border-color: ${previewBlue};
    outline: none;
    box-shadow: 0 0 0 2px rgb(63 81 181 / 18%);
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) 101px;
  align-items: center;
  gap: 8px;
  min-width: 0;
  min-height: 110px;
  overflow: hidden;
  padding: 8px 16px;
  border: 1px solid ${previewBlue};
  border-radius: 8px;
  background: #e8e9f8;
  cursor: pointer;

  &[data-selected="false"] {
    border-color: #d4d4d4;
    background: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid ${previewBlue};
    outline-offset: 2px;
  }
`;

export const ScheduleBreakEditCard = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  grid-column: 1 / -1;
  padding: 16px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background: #ffffff;
`;

export const ScheduleBreakEditNameField = styled.label`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 8px;
  color: #292f7c;
  font-size: 14px;
  font-weight: 600;
`;

export const ScheduleBreakEditNameInput = styled.input`
  height: 40px;
  padding: 0 8px;
  border: 1px solid #707070;
  border-radius: 8px;
  font-size: 16px;
`;

export const ScheduleBreakEditDateField = styled.div`
  width: 177px;
`;

export const ScheduleBreakEditLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #292f7c;
  font-size: 14px;
  font-weight: 600;
`;

export const ScheduleBreakEditInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 8px;
  border: 1px solid #707070;
  border-radius: 8px;
  font-size: 16px;
`;

export const ScheduleBreakEditActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const ScheduleBreakEditCancelButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #8b91da;
  border-radius: 8px;
  background: #ffffff;
  color: #3942b0;
`;

export const ScheduleBreakEditSaveButton = styled.button`
  height: 40px;
  padding: 0 16px;
  border: 1px solid #3942b0;
  border-radius: 8px;
  background: #3942b0;
  color: #ffffff;
  font-weight: 600;
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
  cursor: pointer;

  &:hover {
    color: #454545;
    text-decoration: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(63 81 181 / 18%);
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
    box-shadow: 0 0 0 2px rgb(63 81 181 / 18%);
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
`;

export const ScheduleBreakCalendarMonth = styled.div`
  flex: 0 0 101px;
  width: 101px;
  max-width: 101px;
  min-width: 0;
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
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: ${previewBlue};
    outline: none;
    box-shadow: 0 0 0 2px rgb(63 81 181 / 18%);
  }
`;

export const ScheduleFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
`;

export const SchedulePrimaryButton = styled.button`
  min-width: 170px;
  min-height: 52px;
  border: 1px solid ${previewBlue};
  border-radius: 8px;
  background: ${previewBlue};
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(63 81 181 / 18%);
  }
`;
