import { DateTime } from "luxon";
import * as React from "react";
import { AddIcon, EditIcon } from "react-magma-icons";

import type { CourseEntryBreak } from "../courseEntryBreaks.ts";
import { getBreakDateRange } from "./previewDateUtils.ts";
import {
  MeetingDayButton,
  MeetingDaysGrid,
  ScheduleBreakCalendar,
  ScheduleBreakCalendarDay,
  ScheduleBreakCalendarEvent,
  ScheduleBreakCalendarEventAction,
  ScheduleBreakCalendarEventDateButton,
  ScheduleBreakCalendarEventDetails,
  ScheduleBreakCalendarEventList,
  ScheduleBreakCalendarEventTitle,
  ScheduleBreakCalendarGrid,
  ScheduleBreakCalendarHeader,
  ScheduleBreakCalendarMonth,
  ScheduleBreakCalendarMonthCard,
  ScheduleBreakCalendarMonthList,
  ScheduleBreakCalendarWeekday,
  ScheduleBreakEditActions,
  ScheduleBreakEditCancelButton,
  ScheduleBreakEditCard,
  ScheduleBreakEditDateField,
  ScheduleBreakEditInput,
  ScheduleBreakEditLabel,
  ScheduleBreakEditNameField,
  ScheduleBreakEditNameInput,
  ScheduleBreakEditSaveButton,
  ScheduleCloseButton,
  ScheduleContent,
  ScheduleCustomBreakButton,
  ScheduleDialog,
  ScheduleFooter,
  ScheduleHeader,
  ScheduleIntro,
  ScheduleModalScrim,
  SchedulePrimaryButton,
  ScheduleSection,
  ScheduleSectionTitle,
} from "./ScheduleBreaksModal.styled.ts";

type ScheduleBreaksModalProps = {
  courseBreaks: CourseEntryBreak[];
  onAddCustomBreak: (target: HTMLElement) => void;
  onSaveCustomBreak?: (breakItem: CourseEntryBreak) => void;
  onClose: () => void;
  onEditBreak: (breakItem: CourseEntryBreak, target: HTMLElement) => void;
  timezone: string;
};

type ScheduleCalendarCell = {
  date: DateTime;
  id: string;
  isCurrentMonth: boolean;
  isSelectedBreakDay: boolean;
};

type ScheduleCalendarMonthView = {
  cells: ScheduleCalendarCell[];
  id: string;
  monthLabel: string;
  yearLabel: string;
};

type ScheduleBreakView = {
  breakItem: CourseEntryBreak;
  id: string;
  months: ScheduleCalendarMonthView[];
};

const defaultMeetingDays = ["Monday", "Wednesday"];
const meetingDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Async",
];
const calendarWeekdays = ["M", "T", "W", "T", "F"];

function getScheduleBreakDateRange(
  breakItem: CourseEntryBreak,
  timezone: string,
) {
  return getBreakDateRange({
    endDate: breakItem.endDate,
    startDate: breakItem.startDate,
    timezone,
  });
}

function getMonthStartDatesInRange(startDate: DateTime, endDate: DateTime) {
  const monthStarts: DateTime[] = [];
  let currentDate = startDate.startOf("month");
  const lastDate = endDate.startOf("month");

  while (currentDate.toMillis() <= lastDate.toMillis()) {
    monthStarts.push(currentDate);
    currentDate = currentDate.plus({ months: 1 });
  }

  return monthStarts;
}

function getScheduleCalendarCells({
  breakItem,
  monthStartDate,
  timezone,
}: {
  breakItem: CourseEntryBreak;
  monthStartDate: DateTime;
  timezone: string;
}) {
  const firstCalendarDate = monthStartDate.minus({
    days: Math.max(0, monthStartDate.weekday - 1),
  });
  const range = getScheduleBreakDateRange(breakItem, timezone);
  const cells: ScheduleCalendarCell[] = [];

  for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
    for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
      const date = firstCalendarDate.plus({
        days: weekIndex * 7 + dayIndex,
      });
      const isSelectedBreakDay = Boolean(
        range &&
        date.toMillis() >= range.startDate.toMillis() &&
        date.toMillis() <= range.endDate.toMillis(),
      );

      cells.push({
        date,
        id: date.toISODate() || `${monthStartDate.toISODate()}-${dayIndex}`,
        isCurrentMonth: date.hasSame(monthStartDate, "month"),
        isSelectedBreakDay,
      });
    }
  }

  return cells;
}

function getScheduleBreakViews(
  courseBreaks: CourseEntryBreak[],
  timezone: string,
): ScheduleBreakView[] {
  return courseBreaks
    .filter((breakItem) => getScheduleBreakDateRange(breakItem, timezone))
    .sort((firstBreak, secondBreak) => {
      const firstDate = getScheduleBreakDateRange(
        firstBreak,
        timezone,
      )?.startDate.toMillis();
      const secondDate = getScheduleBreakDateRange(
        secondBreak,
        timezone,
      )?.startDate.toMillis();

      return (firstDate || 0) - (secondDate || 0);
    })
    .map((breakItem) => {
      const range = getScheduleBreakDateRange(breakItem, timezone)!;

      return {
        breakItem,
        id: breakItem.id,
        months: getMonthStartDatesInRange(range.startDate, range.endDate).map(
          (monthStartDate) => ({
            cells: getScheduleCalendarCells({
              breakItem,
              monthStartDate,
              timezone,
            }),
            id: `${breakItem.id}-${monthStartDate.toFormat("yyyy-MM")}`,
            monthLabel: monthStartDate.toFormat("LLLL"),
            yearLabel: monthStartDate.toFormat("yyyy"),
          }),
        ),
      };
    });
}

function getScheduleBreakDateText(breakItem: CourseEntryBreak) {
  const formatDate = (value: string) => {
    const parsed = DateTime.fromISO(value).isValid
      ? DateTime.fromISO(value)
      : DateTime.fromFormat(value, "MM/dd/yyyy");
    return parsed.isValid ? parsed.toFormat("cccc, LLLL d, yyyy") : value;
  };

  return breakItem.endDate
    ? `${formatDate(breakItem.startDate)} - ${formatDate(breakItem.endDate)}`
    : formatDate(breakItem.startDate || breakItem.dateText);
}

export default function ScheduleBreaksModal({
  courseBreaks,
  onAddCustomBreak,
  onClose,
  onEditBreak,
  onSaveCustomBreak,
  timezone,
}: ScheduleBreaksModalProps) {
  const [editingBreakId, setEditingBreakId] = React.useState<string | null>(null);
  const [breakDraft, setBreakDraft] = React.useState({ endDate: "", name: "", startDate: "" });
  const [customBreakDraft, setCustomBreakDraft] = React.useState<{ endDate: string; name: string; startDate: string } | null>(null);
  const [customBreaks, setCustomBreaks] = React.useState<CourseEntryBreak[]>([]);
  const [selectedMeetingDays, setSelectedMeetingDays] =
    React.useState(defaultMeetingDays);
  const [selectedBreakIds, setSelectedBreakIds] = React.useState(() =>
    courseBreaks.map((breakItem) => breakItem.id),
  );
  const scheduleBreakViews = React.useMemo(
    () => getScheduleBreakViews([...courseBreaks, ...customBreaks], timezone),
    [courseBreaks, customBreaks, timezone],
  );

  return (
    <ScheduleModalScrim>
      <ScheduleDialog
        aria-labelledby="schedule-breaks-title"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <ScheduleContent>
          <ScheduleHeader>
            <ScheduleIntro>
              <h2 id="schedule-breaks-title">Schedule &amp; Breaks</h2>
              <p>
                Set meeting days and mark holidays or breaks to help manage due
                dates for this course copy.
              </p>
            </ScheduleIntro>
            <ScheduleCloseButton
              aria-label="Close Schedule & Breaks"
              onClick={onClose}
              type="button"
            >
              x
            </ScheduleCloseButton>
          </ScheduleHeader>
          <ScheduleSection>
            <ScheduleSectionTitle>
              Which days does your course meet?
            </ScheduleSectionTitle>
            <MeetingDaysGrid>
              {meetingDays.map((day) => {
                const isSelected = selectedMeetingDays.includes(day);

                return (
                  <MeetingDayButton
                    aria-pressed={isSelected}
                    key={day}
                    onClick={() =>
                      setSelectedMeetingDays((currentDays) =>
                        isSelected
                          ? currentDays.filter(
                              (currentDay) => currentDay !== day,
                            )
                          : [...currentDays, day],
                      )
                    }
                    type="button"
                  >
                    {day}
                  </MeetingDayButton>
                );
              })}
            </MeetingDaysGrid>
          </ScheduleSection>
          <ScheduleSection>
            <ScheduleSectionTitle>Add Breaks or Holidays</ScheduleSectionTitle>
            <ScheduleBreakCalendar aria-label="Breaks and holidays calendar">
              {scheduleBreakViews.map((breakView) => {
                const isEditing = editingBreakId === breakView.breakItem.id;
                const isSelected = selectedBreakIds.includes(breakView.breakItem.id);
                const startDate = isEditing ? breakDraft.startDate : breakView.breakItem.startDate;
                const endDate = isEditing ? breakDraft.endDate : breakView.breakItem.endDate || "";
                const name = isEditing ? breakDraft.name : breakView.breakItem.name;

                if (isEditing) {
                  return (
                    <ScheduleBreakEditCard key={breakView.id}>
                      <ScheduleBreakEditNameField>
                        Break Name
                        <ScheduleBreakEditNameInput
                          aria-label="Break Name"
                          onChange={(event) => setBreakDraft((draft) => ({ ...draft, name: event.target.value }))}
                          value={name}
                        />
                      </ScheduleBreakEditNameField>
                      <ScheduleBreakEditDateField>
                        <ScheduleBreakEditLabel>Start Date</ScheduleBreakEditLabel>
                        <ScheduleBreakEditInput
                          aria-label="Start Date"
                          onChange={(event) => setBreakDraft((draft) => ({ ...draft, startDate: event.target.value }))}
                          type="date"
                          value={startDate}
                        />
                      </ScheduleBreakEditDateField>
                      <ScheduleBreakEditDateField>
                        <ScheduleBreakEditLabel>End Date</ScheduleBreakEditLabel>
                        <ScheduleBreakEditInput
                          aria-label="End Date"
                          onChange={(event) => setBreakDraft((draft) => ({ ...draft, endDate: event.target.value }))}
                          type="date"
                          value={endDate}
                        />
                      </ScheduleBreakEditDateField>
                      <ScheduleBreakEditActions>
                        <ScheduleBreakEditCancelButton
                          aria-label={`Cancel editing ${name}`}
                          onClick={() => setEditingBreakId(null)}
                          type="button"
                        >
                          x
                        </ScheduleBreakEditCancelButton>
                        <ScheduleBreakEditSaveButton
                          disabled={!name.trim() || !startDate}
                          onClick={() => setEditingBreakId(null)}
                          type="button"
                        >
                          Save
                        </ScheduleBreakEditSaveButton>
                      </ScheduleBreakEditActions>
                    </ScheduleBreakEditCard>
                  );
                }

                return (
                <ScheduleBreakCalendarMonthCard
                  aria-pressed={isSelected}
                  data-selected={isSelected}
                  key={breakView.id}
                  onClick={() =>
                    setSelectedBreakIds((currentIds) =>
                      isSelected
                        ? currentIds.filter((id) => id !== breakView.breakItem.id)
                        : [...currentIds, breakView.breakItem.id],
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedBreakIds((currentIds) =>
                        isSelected
                          ? currentIds.filter((id) => id !== breakView.breakItem.id)
                          : [...currentIds, breakView.breakItem.id],
                      );
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <ScheduleBreakCalendarEventList>
                    <ScheduleBreakCalendarEvent>
                      <ScheduleBreakCalendarEventDetails>
                        <ScheduleBreakCalendarEventTitle
                          data-long-title={breakView.breakItem.name.length > 30}
                        >
                          {name}
                        </ScheduleBreakCalendarEventTitle>
                        <ScheduleBreakCalendarEventDateButton
                          as="span"
                        >
                          {getScheduleBreakDateText({ ...breakView.breakItem, endDate, name, startDate })}
                        </ScheduleBreakCalendarEventDateButton>
                      </ScheduleBreakCalendarEventDetails>
                      <ScheduleBreakCalendarEventAction
                        aria-label={`Edit ${breakView.breakItem.name}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setEditingBreakId(breakView.breakItem.id);
                          setBreakDraft({ endDate, name, startDate });
                        }}
                        type="button"
                      >
                        <EditIcon aria-hidden size={20} />
                      </ScheduleBreakCalendarEventAction>
                    </ScheduleBreakCalendarEvent>
                  </ScheduleBreakCalendarEventList>
                  <ScheduleBreakCalendarMonthList>
                    {breakView.months.map((month) => (
                      <ScheduleBreakCalendarMonth key={month.id}>
                        <ScheduleBreakCalendarHeader>
                          <span>{month.monthLabel}</span>
                          <span>{month.yearLabel}</span>
                        </ScheduleBreakCalendarHeader>
                        <ScheduleBreakCalendarGrid>
                          {calendarWeekdays.map((weekday, index) => (
                            <ScheduleBreakCalendarWeekday
                              key={`${month.id}-${weekday}-${index}`}
                            >
                              {weekday}
                            </ScheduleBreakCalendarWeekday>
                          ))}
                          {month.cells.map((cell) => (
                            <ScheduleBreakCalendarDay
                              data-current-month={cell.isCurrentMonth}
                              data-selected={cell.isSelectedBreakDay}
                              key={cell.id}
                            >
                              {cell.date.toFormat("d")}
                            </ScheduleBreakCalendarDay>
                          ))}
                        </ScheduleBreakCalendarGrid>
                      </ScheduleBreakCalendarMonth>
                    ))}
                  </ScheduleBreakCalendarMonthList>
                </ScheduleBreakCalendarMonthCard>
                );
              })}
            </ScheduleBreakCalendar>
            {customBreakDraft ? (
              <ScheduleBreakEditCard>
                <ScheduleBreakEditNameField>
                  Break Name
                  <ScheduleBreakEditNameInput aria-label="Break Name" onChange={(event) => setCustomBreakDraft((draft) => draft && ({ ...draft, name: event.target.value }))} value={customBreakDraft.name} />
                </ScheduleBreakEditNameField>
                <ScheduleBreakEditDateField>
                  <ScheduleBreakEditLabel>Start Date</ScheduleBreakEditLabel>
                  <ScheduleBreakEditInput aria-label="Start Date" onChange={(event) => setCustomBreakDraft((draft) => draft && ({ ...draft, startDate: event.target.value }))} type="date" value={customBreakDraft.startDate} />
                </ScheduleBreakEditDateField>
                <ScheduleBreakEditDateField>
                  <ScheduleBreakEditLabel>End Date</ScheduleBreakEditLabel>
                  <ScheduleBreakEditInput aria-label="End Date" onChange={(event) => setCustomBreakDraft((draft) => draft && ({ ...draft, endDate: event.target.value }))} type="date" value={customBreakDraft.endDate} />
                </ScheduleBreakEditDateField>
                <ScheduleBreakEditActions>
                  <ScheduleBreakEditCancelButton aria-label="Cancel custom break" onClick={() => setCustomBreakDraft(null)} type="button">x</ScheduleBreakEditCancelButton>
                  <ScheduleBreakEditSaveButton disabled={!customBreakDraft.name.trim() || !customBreakDraft.startDate} onClick={() => { const id = `custom-break-${customBreaks.length + 1}`; const nextBreak = { dateText: customBreakDraft.startDate, endDate: customBreakDraft.endDate || undefined, id, name: customBreakDraft.name.trim(), startDate: customBreakDraft.startDate }; setCustomBreaks((breaks) => [...breaks, nextBreak]); setSelectedBreakIds((ids) => [...ids, id]); onSaveCustomBreak?.(nextBreak); setCustomBreakDraft(null); }} type="button">Save</ScheduleBreakEditSaveButton>
                </ScheduleBreakEditActions>
              </ScheduleBreakEditCard>
            ) : (
              <ScheduleCustomBreakButton onClick={() => setCustomBreakDraft({ endDate: "", name: "Custom Break", startDate: "" })} type="button">
                <AddIcon aria-hidden size={20} />
                Add Custom Break
              </ScheduleCustomBreakButton>
            )}
          </ScheduleSection>
          <ScheduleFooter>
            <SchedulePrimaryButton onClick={onClose} type="button">
              Next
            </SchedulePrimaryButton>
          </ScheduleFooter>
        </ScheduleContent>
      </ScheduleDialog>
    </ScheduleModalScrim>
  );
}
