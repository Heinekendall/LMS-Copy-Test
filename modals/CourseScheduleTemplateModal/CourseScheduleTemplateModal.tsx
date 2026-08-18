import * as React from "react";
import {
  ButtonColor,
  ButtonType,
  DatePicker,
  ModalSize,
  TimePicker,
} from "react-magma-dom";
import {
  AddIcon,
  AssignmentTurnedInIcon,
  BookIcon,
  CalendarTodayIcon,
  CloseIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
} from "react-magma-icons";

import type { ModalProps } from "../../types/modalTypes.ts";
import {
  CourseScheduleActionButton,
  CourseScheduleActions,
  CourseScheduleActivityAddButton,
  CourseScheduleActivityCard,
  CourseScheduleActivityCardBody,
  CourseScheduleActivityCardMeta,
  CourseScheduleActivityCheckbox,
  CourseScheduleActivityIcon,
  CourseScheduleActivityPanel,
  CourseScheduleActivityPanelBody,
  CourseScheduleActivityPanelHeader,
  CourseScheduleActivityPoints,
  CourseScheduleActivitySection,
  CourseScheduleActivitySectionBody,
  CourseScheduleActivitySectionHeader,
  CourseScheduleAddBreakButton,
  CourseScheduleAvailabilityFrame,
  CourseScheduleAvailabilityFrameHeader,
  CourseScheduleAvailabilityItem,
  CourseScheduleAvailabilityList,
  CourseScheduleBreakButton,
  CourseScheduleBreakDate,
  CourseScheduleBreakName,
  CourseScheduleBreaksGrid,
  CourseScheduleCalendar,
  CourseScheduleCalendarDay,
  CourseScheduleCalendarDayHeader,
  CourseScheduleCalendarEvent,
  CourseScheduleCalendarGrid,
  CourseScheduleCalendarHeader,
  CourseScheduleCalendarHoliday,
  CourseScheduleCalendarNav,
  CourseScheduleCalendarTitle,
  CourseScheduleChapterNav,
  CourseScheduleCustomBreakField,
  CourseScheduleCustomBreakInput,
  CourseScheduleCustomBreakLabel,
  CourseScheduleCustomBreakRow,
  CourseScheduleDayButton,
  CourseScheduleDaysGrid,
  CourseScheduleIntro,
  CourseScheduleModalContent,
  CourseScheduleModalShell,
  CourseScheduleRemoveCustomBreakButton,
  CourseScheduleScheduleActivityTitle,
  CourseScheduleScheduleField,
  CourseScheduleScheduleForm,
  CourseScheduleScheduleSetButton,
  CourseScheduleSection,
  CourseScheduleSectionTitle,
  CourseScheduleWeekFooter,
  CourseScheduleWeekTemplateLayout,
  CourseScheduleWeekTemplateMain,
} from "./CourseScheduleTemplateModal.styled.ts";

const weekdays = [
  { label: "Mon", name: "Monday" },
  { label: "Tue", name: "Tuesday" },
  { label: "Wed", name: "Wednesday" },
  { label: "Thu", name: "Thursday" },
  { label: "Fri", name: "Friday" },
  { label: "Sat", name: "Saturday" },
  { label: "Sun", name: "Sunday" },
];
const breaks = [
  {
    date: "Monday, Sep 7, 2026",
    id: "labor-day",
    name: "Labor Day",
  },
  {
    date: "Monday, October 12, 2026",
    id: "indigenous-peoples-day-columbus-day",
    name: "Indigenous Peoples' Day / Columbus Day",
  },
  {
    date: "Wednesday, November 11, 2026",
    id: "veterans-day",
    name: "Veterans Day",
  },
  {
    date: "Thursday, November 26, 2026",
    id: "thanksgiving-day",
    name: "Thanksgiving Day",
  },
];
const datePickerInputStyle = {
  borderRadius: 8,
  height: 40,
  width: "100%",
} as const;
const datePickerContainerStyle = {
  width: "100%",
} as const;
const scheduleAvailableTime = "12:01 AM";
const scheduleDueTime = "11:59 PM";

type CourseScheduleStep = "schedule-breaks" | "week-template";
type CustomBreak = {
  endDate: string;
  id: string;
  name: string;
  startDate: string;
};
type WeekTemplateActivity = {
  detail?: string;
  disabled?: boolean;
  icon: "assignment" | "book";
  id: string;
  points: string;
  tag: string;
  title: string;
};
type WeekTemplateSection = {
  activities: WeekTemplateActivity[];
  id: string;
  title: string;
};
type ScheduleForm = {
  availableDate: string;
  availableTime: string;
  dueDate: string;
  dueTime: string;
};
type ScheduledActivity = {
  activityId: string;
  availableDate: string;
  availableTime: string;
  dayIndex: number | null;
  dueDate: string;
  time: string;
  title: string;
  weekIndex: number;
};
type CalendarScheduledActivity = ScheduledActivity & {
  dayIndex: number;
};
type CalendarDropSlot = {
  dayIndex: number;
};

const weekTemplates = [
  {
    days: [
      { date: "24", label: "MON" },
      { date: "25", label: "TUE" },
      { date: "26", label: "WED" },
      { date: "27", label: "THU" },
      { date: "28", label: "FRI" },
      { date: "29", label: "SAT" },
      { date: "30", label: "SUN" },
    ],
    label: "Week 1 Aug 24 - Aug 30",
    month: "August 2026",
  },
  {
    days: [
      { date: "1", label: "MON" },
      { date: "2", label: "TUE" },
      { date: "3", label: "WED" },
      { date: "4", label: "THU" },
      { date: "5", label: "FRI" },
      { date: "6", label: "SAT" },
      { date: "7", label: "SUN" },
    ],
    label: "Week 2 Sep 1 - Sep 7",
    month: "September 2026",
  },
];
const weekDateToDayIndex: Record<string, number>[] = [
  {
    "08/24/2026": 0,
    "08/25/2026": 1,
    "08/26/2026": 2,
    "08/27/2026": 3,
    "08/28/2026": 4,
    "08/29/2026": 5,
    "08/30/2026": 6,
  },
  {
    "09/01/2026": 0,
    "09/02/2026": 1,
    "09/03/2026": 2,
    "09/04/2026": 3,
    "09/05/2026": 4,
    "09/06/2026": 5,
    "09/07/2026": 6,
  },
];
const chapterNumbers = [1, 2, 3, 4, 5, 6];

function getChapterAvailabilityActivities(
  chapterNumber: number,
): WeekTemplateActivity[] {
  return [
    ...(chapterNumber === 1
      ? [
          {
            detail: "8 min",
            icon: "assignment" as const,
            id: "introduction-video",
            points: "20 pts",
            tag: "Video",
            title: "Introduction Video",
          },
        ]
      : []),
    {
      icon: "book",
      id: `chapter-${chapterNumber}-reading`,
      points: "50 pts",
      tag: "Reading",
      title: `Chapter ${chapterNumber} Reading`,
    },
  ];
}

function getChapterTemplateSections(
  chapterNumber: number,
): WeekTemplateSection[] {
  return [
    {
      activities: [
        {
          icon: "assignment",
          id: `chapter-${chapterNumber}-review`,
          points: "30 pts",
          tag: "Practice",
          title: `Chapter ${chapterNumber} Review`,
        },
        {
          detail: "15 min",
          icon: "assignment",
          id: `chapter-${chapterNumber}-vocabulary-quiz`,
          points: "40 pts",
          tag: "Quiz",
          title: "Vocabulary Quiz",
        },
        {
          detail: "10 min",
          icon: "assignment",
          id: `chapter-${chapterNumber}-concept-check`,
          points: "25 pts",
          tag: "Homework",
          title: "Concept Check",
        },
      ],
      id: `chapter-${chapterNumber}-study-it`,
      title: "Study it",
    },
    {
      activities: [
        {
          detail: "30 min",
          icon: "assignment",
          id: `chapter-${chapterNumber}-activity`,
          points: "60 pts",
          tag: "Quiz",
          title: `Chapter ${chapterNumber} Activity`,
        },
        {
          icon: "assignment",
          id: `chapter-${chapterNumber}-discussion-post`,
          points: "35 pts",
          tag: "Homework",
          title: "Discussion Post",
        },
        {
          detail: "25 min",
          icon: "assignment",
          id: `chapter-${chapterNumber}-practice-exercise`,
          points: "45 pts",
          tag: "Homework",
          title: "Practice Exercise",
        },
      ],
      id: `chapter-${chapterNumber}-apply-it`,
      title: "Apply it",
    },
  ];
}

function getDayIndexForDate(value: string, weekIndex: number) {
  return weekDateToDayIndex[weekIndex]?.[value] ?? 0;
}

function parseScheduleDate(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return undefined;

  const [, month, day, year] = match;

  return new Date(Number(year), Number(month) - 1, Number(day));
}

function formatScheduleDate(date: Date) {
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${date.getUTCDate()}`.padStart(2, "0");

  return `${month}/${day}/${date.getUTCFullYear()}`;
}

function normalizeScheduleDateInput(value: Date | string) {
  if (value instanceof Date) return formatScheduleDate(value);

  const isoDate = value.match(/^(\d{4})-(\d{2})-(\d{2})T/);

  if (isoDate) {
    const [, year, month, day] = isoDate;

    return `${month}/${day}/${year}`;
  }

  return value;
}

function normalizeScheduleTime(value: string) {
  const time = value.match(/^0?(\d{1,2}):([0-5]\d)\s*(AM|PM)$/i);

  if (!time) return value;

  const [, hour, minute, period] = time;

  return `${Number(hour)}:${minute} ${period.toUpperCase()}`;
}

function getDateForWeekDay(weekIndex: number, dayIndex: number) {
  return (
    Object.entries(weekDateToDayIndex[weekIndex] ?? {}).find(
      ([, index]) => index === dayIndex,
    )?.[0] ??
    Object.keys(weekDateToDayIndex[weekIndex] ?? {})[0] ??
    ""
  );
}

function getDefaultScheduleForm(weekIndex: number): ScheduleForm {
  const weekMondayDate = getDateForWeekDay(weekIndex, 0);

  return {
    availableDate: weekMondayDate,
    availableTime: scheduleAvailableTime,
    dueDate: weekMondayDate,
    dueTime: scheduleDueTime,
  };
}

function getCalendarDayEventOverlap(
  events: CalendarScheduledActivity[],
  activity: CalendarScheduledActivity,
) {
  const overlappingEvents = events.filter(
    (event) => event.dayIndex === activity.dayIndex,
  );
  const overlapIndex = overlappingEvents.findIndex(
    (event) => event.activityId === activity.activityId,
  );

  return {
    overlapCount: overlappingEvents.length,
    overlapIndex: Math.max(overlapIndex, 0),
  };
}

function getScheduleFormForActivity(activity: ScheduledActivity): ScheduleForm {
  return {
    availableDate: activity.availableDate,
    availableTime: activity.availableTime,
    dueDate: activity.dueDate,
    dueTime: activity.time || scheduleDueTime,
  };
}

export default function CourseScheduleTemplateModal({ onClose }: ModalProps) {
  const nextCustomBreakId = React.useRef(1);
  const scheduleFormRef = React.useRef<HTMLDivElement | null>(null);
  const [currentStep, setCurrentStep] =
    React.useState<CourseScheduleStep>("schedule-breaks");
  const [customBreaks, setCustomBreaks] = React.useState<CustomBreak[]>([]);
  const [selectedBreaks, setSelectedBreaks] = React.useState<string[]>([]);
  const [selectedDays, setSelectedDays] = React.useState<string[]>([]);
  const [currentWeekIndex, setCurrentWeekIndex] = React.useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = React.useState(0);
  const [selectedWeekActivityId, setSelectedWeekActivityId] = React.useState<
    string | null
  >(null);
  const [showScheduleFields, setShowScheduleFields] = React.useState(false);
  const [scheduleForm, setScheduleForm] = React.useState<ScheduleForm>(
    getDefaultScheduleForm(0),
  );
  const [scheduledActivities, setScheduledActivities] = React.useState<
    ScheduledActivity[]
  >([]);
  const [draggedActivityId, setDraggedActivityId] = React.useState<
    string | null
  >(null);
  const [dragOverSlot, setDragOverSlot] =
    React.useState<CalendarDropSlot | null>(null);
  const [isAvailabilityDropTarget, setIsAvailabilityDropTarget] =
    React.useState(false);

  const currentWeek = weekTemplates[currentWeekIndex];
  const currentChapterNumber = chapterNumbers[currentChapterIndex];
  const currentChapterTitle = `Chapter ${currentChapterNumber}`;
  const currentChapterAvailabilityActivities =
    getChapterAvailabilityActivities(currentChapterNumber);
  const currentChapterSections: WeekTemplateSection[] = [
    {
      activities: currentChapterAvailabilityActivities,
      id: `chapter-${currentChapterNumber}-learn-it`,
      title: "Learn it",
    },
    ...getChapterTemplateSections(currentChapterNumber),
  ];
  const currentChapterActivities = currentChapterSections.flatMap(
    (section) => section.activities,
  );
  const isCurrentChapterActivity = (activity: ScheduledActivity) =>
    currentChapterActivities.some(
      (chapterActivity) => chapterActivity.id === activity.activityId,
    );
  const selectedWeekActivity = currentChapterActivities.find(
    (activity) => activity.id === selectedWeekActivityId,
  );
  const currentWeekScheduledActivities = scheduledActivities.filter(
    (activity) =>
      activity.weekIndex === currentWeekIndex &&
      isCurrentChapterActivity(activity),
  );
  const defaultAvailabilityEvents: ScheduledActivity[] =
    currentChapterAvailabilityActivities
      .filter(
        (activity) =>
          !currentWeekScheduledActivities.some(
            (scheduledActivity) => scheduledActivity.activityId === activity.id,
          ),
      )
      .map((activity) => ({
        activityId: activity.id,
        availableDate: getDateForWeekDay(currentWeekIndex, 0),
        availableTime: scheduleAvailableTime,
        dayIndex: null,
        dueDate: "",
        time: "",
        title: activity.title,
        weekIndex: currentWeekIndex,
      }));
  const currentWeekAvailabilityEvents = [
    ...defaultAvailabilityEvents,
    ...currentWeekScheduledActivities.filter(
      (activity) => activity.dayIndex === null && !activity.dueDate,
    ),
  ];
  const currentWeekEvents = currentWeekScheduledActivities.filter(
    (activity): activity is CalendarScheduledActivity =>
      activity.dayIndex !== null && Boolean(activity.dueDate),
  );
  const showLaborDayHoliday =
    currentWeekIndex === 1 && selectedBreaks.includes("labor-day");
  const maxCurrentWeekDayEvents = Math.max(
    1,
    ...currentWeek.days.map((_, dayIndex) => {
      const activityCount = currentWeekEvents.filter(
        (activity) => activity.dayIndex === dayIndex,
      ).length;
      const holidayCount = showLaborDayHoliday && dayIndex === 0 ? 1 : 0;

      return activityCount + holidayCount;
    }),
  );

  const getScheduledActivityForCurrentWeek = (activityId: string) =>
    scheduledActivities.find(
      (activity) =>
        activity.activityId === activityId &&
        activity.weekIndex === currentWeekIndex,
    );
  const isActivityAssigned = (activityId: string) =>
    scheduledActivities.some(
      (activity) =>
        activity.activityId === activityId &&
        activity.weekIndex === currentWeekIndex,
    ) ||
    currentChapterAvailabilityActivities.some(
      (activity) => activity.id === activityId,
    );
  const selectedWeekActivityIsAssigned = selectedWeekActivity
    ? isActivityAssigned(selectedWeekActivity.id)
    : false;

  const toggleDay = (day: string) => {
    setSelectedDays((currentDays) =>
      currentDays.includes(day)
        ? currentDays.filter((selectedDay) => selectedDay !== day)
        : weekdays
            .map((weekday) => weekday.label)
            .filter(
              (weekday) => currentDays.includes(weekday) || weekday === day,
            ),
    );
  };

  const toggleBreak = (breakId: string) => {
    setSelectedBreaks((currentBreaks) =>
      currentBreaks.includes(breakId)
        ? currentBreaks.filter((selectedBreak) => selectedBreak !== breakId)
        : [...currentBreaks, breakId],
    );
  };

  const addCustomBreak = () => {
    const id = `custom-break-${nextCustomBreakId.current}`;
    nextCustomBreakId.current += 1;

    setCustomBreaks((currentBreaks) => [
      ...currentBreaks,
      { endDate: "", id, name: "", startDate: "" },
    ]);
  };

  const removeCustomBreak = (breakId: string) => {
    setCustomBreaks((currentBreaks) =>
      currentBreaks.filter((customBreak) => customBreak.id !== breakId),
    );
  };

  const updateCustomBreak = (
    breakId: string,
    updates: Partial<Omit<CustomBreak, "id">>,
  ) => {
    setCustomBreaks((currentBreaks) =>
      currentBreaks.map((customBreak) =>
        customBreak.id === breakId
          ? { ...customBreak, ...updates }
          : customBreak,
      ),
    );
  };

  const selectWeekActivity = (activity: WeekTemplateActivity) => {
    if (activity.disabled || isActivityAssigned(activity.id)) return;

    const nextActivityId =
      selectedWeekActivityId === activity.id ? null : activity.id;
    setSelectedWeekActivityId(nextActivityId);
    if (nextActivityId) {
      const scheduledActivity =
        getScheduledActivityForCurrentWeek(nextActivityId);

      setScheduleForm(
        scheduledActivity
          ? getScheduleFormForActivity(scheduledActivity)
          : getDefaultScheduleForm(currentWeekIndex),
      );
    }
    setShowScheduleFields(false);
  };

  const updateScheduleForm = (
    field: keyof ScheduleForm,
    value: ScheduleForm[keyof ScheduleForm],
  ) => {
    const nextValue =
      field === "availableTime" || field === "dueTime"
        ? normalizeScheduleTime(value)
        : value;

    setScheduleForm((currentForm) => {
      const nextForm = {
        ...currentForm,
        [field]: nextValue,
      };

      if (field === "dueDate") {
        nextForm.dueTime = currentForm.dueTime || scheduleDueTime;
      }

      return nextForm;
    });
  };

  const updateScheduleDate = (field: "availableDate" | "dueDate") => {
    return (date: Date) => {
      updateScheduleForm(field, formatScheduleDate(date));
    };
  };

  const updateScheduleDateInput = (field: "availableDate" | "dueDate") => {
    return (value: Date | string) => {
      updateScheduleForm(field, normalizeScheduleDateInput(value));
    };
  };

  const addSelectedActivityToSchedule = () => {
    if (!selectedWeekActivity || selectedWeekActivityIsAssigned) return;

    setShowScheduleFields(true);
  };

  const upsertScheduledActivity = (
    activity: WeekTemplateActivity,
    updates: Pick<
      ScheduledActivity,
      "availableDate" | "availableTime" | "dayIndex" | "dueDate" | "time"
    >,
  ) => {
    const scheduledActivity: ScheduledActivity = {
      activityId: activity.id,
      title: activity.title,
      weekIndex: currentWeekIndex,
      ...updates,
    };

    setScheduledActivities((currentActivities) => {
      const existingActivityIndex = currentActivities.findIndex(
        (currentActivity) =>
          currentActivity.activityId === activity.id &&
          currentActivity.weekIndex === currentWeekIndex,
      );

      if (existingActivityIndex === -1) {
        return [...currentActivities, scheduledActivity];
      }

      return currentActivities.map((currentActivity, index) =>
        index === existingActivityIndex ? scheduledActivity : currentActivity,
      );
    });
  };

  const setScheduledActivity = () => {
    if (!selectedWeekActivity) return;

    const hasDueDate = Boolean(scheduleForm.dueDate);

    upsertScheduledActivity(selectedWeekActivity, {
      availableDate: scheduleForm.availableDate,
      availableTime: scheduleForm.availableTime,
      dayIndex: hasDueDate
        ? getDayIndexForDate(scheduleForm.dueDate, currentWeekIndex)
        : null,
      dueDate: hasDueDate ? scheduleForm.dueDate : "",
      time: hasDueDate ? scheduleForm.dueTime || scheduleDueTime : "",
    });
    setShowScheduleFields(false);
  };

  const openScheduledActivitySettings = (activity: ScheduledActivity) => {
    setSelectedWeekActivityId(activity.activityId);
    setScheduleForm(getScheduleFormForActivity(activity));
    setShowScheduleFields(true);
    clearCalendarDragState();
  };

  const handleActivityDragStart = (
    event: React.DragEvent,
    activity: WeekTemplateActivity,
  ) => {
    if (activity.disabled || isActivityAssigned(activity.id)) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("text/plain", activity.id);
    setDraggedActivityId(activity.id);
    setSelectedWeekActivityId(activity.id);
    setShowScheduleFields(false);
  };

  const handleScheduledActivityDragStart = (
    event: React.DragEvent,
    activity: ScheduledActivity,
  ) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", activity.activityId);
    setDraggedActivityId(activity.activityId);
    setSelectedWeekActivityId(activity.activityId);
    setScheduleForm(getScheduleFormForActivity(activity));
    setShowScheduleFields(false);
  };

  const clearCalendarDragState = () => {
    setDraggedActivityId(null);
    setDragOverSlot(null);
    setIsAvailabilityDropTarget(false);
  };

  const handleCalendarDragOver = (
    event: React.DragEvent,
    slot: CalendarDropSlot,
  ) => {
    const draggedId =
      event.dataTransfer.getData("text/plain") || draggedActivityId;
    const droppedActivity = currentChapterActivities.find(
      (activity) => activity.id === draggedId,
    );

    if (!droppedActivity || droppedActivity.disabled) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = getScheduledActivityForCurrentWeek(
      droppedActivity.id,
    )
      ? "move"
      : "copy";
    setDragOverSlot(slot);
  };

  const handleCalendarDrop = (
    event: React.DragEvent,
    slot: CalendarDropSlot,
  ) => {
    event.preventDefault();

    const activityId =
      event.dataTransfer.getData("text/plain") || draggedActivityId;
    const droppedActivity = currentChapterActivities.find(
      (activity) => activity.id === activityId,
    );

    if (!droppedActivity || droppedActivity.disabled) {
      clearCalendarDragState();
      return;
    }

    const dropDate = getDateForWeekDay(currentWeekIndex, slot.dayIndex);
    const existingScheduledActivity = getScheduledActivityForCurrentWeek(
      droppedActivity.id,
    );
    const isMovingScheduledActivity = Boolean(existingScheduledActivity);
    const nextScheduleForm: ScheduleForm = {
      availableDate:
        existingScheduledActivity?.availableDate ??
        getDateForWeekDay(currentWeekIndex, 0),
      availableTime:
        existingScheduledActivity?.availableTime ?? scheduleAvailableTime,
      dueDate: dropDate,
      dueTime: existingScheduledActivity?.time || scheduleDueTime,
    };

    upsertScheduledActivity(droppedActivity, {
      availableDate: nextScheduleForm.availableDate,
      availableTime: nextScheduleForm.availableTime,
      dayIndex: slot.dayIndex,
      dueDate: nextScheduleForm.dueDate,
      time: nextScheduleForm.dueTime,
    });
    setSelectedWeekActivityId(droppedActivity.id);
    setScheduleForm(nextScheduleForm);
    setShowScheduleFields(!isMovingScheduledActivity);
    clearCalendarDragState();
  };

  const handleAvailabilityDragOver = (event: React.DragEvent) => {
    const draggedId =
      event.dataTransfer.getData("text/plain") || draggedActivityId;
    const droppedActivity = currentChapterActivities.find(
      (activity) => activity.id === draggedId,
    );

    if (!droppedActivity || droppedActivity.disabled) return;

    event.preventDefault();
    event.dataTransfer.dropEffect = getScheduledActivityForCurrentWeek(
      droppedActivity.id,
    )
      ? "move"
      : "copy";
    setIsAvailabilityDropTarget(true);
  };

  const handleAvailabilityDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const activityId =
      event.dataTransfer.getData("text/plain") || draggedActivityId;
    const droppedActivity = currentChapterActivities.find(
      (activity) => activity.id === activityId,
    );

    if (!droppedActivity || droppedActivity.disabled) {
      clearCalendarDragState();
      return;
    }

    const existingScheduledActivity = getScheduledActivityForCurrentWeek(
      droppedActivity.id,
    );
    const nextScheduleForm: ScheduleForm = {
      availableDate:
        existingScheduledActivity?.availableDate ??
        getDateForWeekDay(currentWeekIndex, 0),
      availableTime:
        existingScheduledActivity?.availableTime ?? scheduleAvailableTime,
      dueDate: "",
      dueTime: existingScheduledActivity?.time || scheduleDueTime,
    };

    upsertScheduledActivity(droppedActivity, {
      availableDate: nextScheduleForm.availableDate,
      availableTime: nextScheduleForm.availableTime,
      dayIndex: null,
      dueDate: "",
      time: "",
    });
    setSelectedWeekActivityId(droppedActivity.id);
    setScheduleForm(nextScheduleForm);
    setShowScheduleFields(true);
    clearCalendarDragState();
  };

  const changeWeek = (nextIndex: number) => {
    setCurrentWeekIndex(nextIndex);
    setScheduleForm(getDefaultScheduleForm(nextIndex));
    setShowScheduleFields(false);
    clearCalendarDragState();
  };

  const changeChapter = (nextIndex: number) => {
    setCurrentChapterIndex(nextIndex);
    setSelectedWeekActivityId(null);
    setScheduleForm(getDefaultScheduleForm(currentWeekIndex));
    setShowScheduleFields(false);
    clearCalendarDragState();
  };

  const isWeekTemplateStep = currentStep === "week-template";

  React.useEffect(() => {
    const scheduleFormElement = scheduleFormRef.current;

    if (
      showScheduleFields &&
      typeof scheduleFormElement?.scrollIntoView === "function"
    ) {
      scheduleFormElement.scrollIntoView({
        block: "end",
        behavior: "auto",
      });
    }
  }, [selectedWeekActivityId, showScheduleFields]);

  return (
    <CourseScheduleModalShell
      header={isWeekTemplateStep ? "Week Template" : "Schedule & Breaks"}
      headerLevel={1}
      isOpen
      onClose={() => onClose(false)}
      size={ModalSize.medium}
    >
      {isWeekTemplateStep ? (
        <>
          <CourseScheduleModalContent data-step="week-template">
            <CourseScheduleWeekTemplateLayout>
              <CourseScheduleWeekTemplateMain>
                <CourseScheduleCalendarHeader>
                  <CourseScheduleCalendarTitle>
                    <CalendarTodayIcon aria-hidden size={24} />
                    <span>{currentWeek.month}</span>
                  </CourseScheduleCalendarTitle>
                  <CourseScheduleCalendarNav>
                    <button
                      aria-label="Previous week"
                      disabled={currentWeekIndex === 0}
                      onClick={() =>
                        changeWeek(Math.max(0, currentWeekIndex - 1))
                      }
                      type="button"
                    >
                      <KeyboardArrowLeftIcon aria-hidden size={20} />
                    </button>
                    <span>{currentWeek.label}</span>
                    <button
                      aria-label="Next week"
                      disabled={currentWeekIndex === weekTemplates.length - 1}
                      onClick={() =>
                        changeWeek(
                          Math.min(
                            weekTemplates.length - 1,
                            currentWeekIndex + 1,
                          ),
                        )
                      }
                      type="button"
                    >
                      <KeyboardArrowRightIcon aria-hidden size={20} />
                    </button>
                  </CourseScheduleCalendarNav>
                </CourseScheduleCalendarHeader>

                <CourseScheduleCalendar>
                  <CourseScheduleCalendarGrid
                    aria-label={`${currentWeek.label} calendar`}
                    data-view="days-only"
                    role="grid"
                    style={
                      {
                        "--calendar-max-day-events": maxCurrentWeekDayEvents,
                      } as React.CSSProperties
                    }
                  >
                    {currentWeek.days.map((day) => (
                      <CourseScheduleCalendarDayHeader key={day.date}>
                        <span>{day.label}</span>
                        <strong>{day.date}</strong>
                      </CourseScheduleCalendarDayHeader>
                    ))}
                    {currentWeek.days.map((day, dayIndex) => {
                      const isDropTarget = dragOverSlot?.dayIndex === dayIndex;

                      return (
                        <CourseScheduleCalendarDay
                          aria-label={`${day.label} ${day.date}`}
                          data-view="days-only"
                          data-drop-target={isDropTarget ? "true" : "false"}
                          key={day.date}
                          onDragLeave={() => {
                            if (isDropTarget) setDragOverSlot(null);
                          }}
                          onDragOver={(event) =>
                            handleCalendarDragOver(event, {
                              dayIndex,
                            })
                          }
                          onDrop={(event) =>
                            handleCalendarDrop(event, {
                              dayIndex,
                            })
                          }
                          role="gridcell"
                        />
                      );
                    })}
                    {showLaborDayHoliday ? (
                      <CourseScheduleCalendarHoliday
                        style={{
                          gridColumn: "1 / 2",
                          gridRow: "2 / 3",
                        }}
                      >
                        Labor Day Holiday
                      </CourseScheduleCalendarHoliday>
                    ) : null}
                    {currentWeekEvents.map((activity) => {
                      const eventDescription = `${activity.title}. Due ${activity.dueDate} at ${activity.time}`;
                      const { overlapIndex } = getCalendarDayEventOverlap(
                        currentWeekEvents,
                        activity,
                      );
                      const isDropTarget =
                        dragOverSlot?.dayIndex === activity.dayIndex;
                      const stackIndex =
                        overlapIndex +
                        (showLaborDayHoliday && activity.dayIndex === 0
                          ? 1
                          : 0);

                      return (
                        <CourseScheduleCalendarEvent
                          aria-label={`Edit ${activity.title} scheduled on ${activity.dueDate} at ${activity.time}`}
                          data-view="days-only"
                          data-dragging={
                            draggedActivityId === activity.activityId
                              ? "true"
                              : "false"
                          }
                          data-drop-target={isDropTarget ? "true" : "false"}
                          draggable
                          key={`${activity.weekIndex}-${activity.activityId}`}
                          onClick={() =>
                            openScheduledActivitySettings(activity)
                          }
                          onDragEnd={clearCalendarDragState}
                          onDragOver={(event) =>
                            handleCalendarDragOver(event, {
                              dayIndex: activity.dayIndex,
                            })
                          }
                          onDragStart={(event) =>
                            handleScheduledActivityDragStart(event, activity)
                          }
                          onDrop={(event) =>
                            handleCalendarDrop(event, {
                              dayIndex: activity.dayIndex,
                            })
                          }
                          style={
                            {
                              "--event-stack-index": stackIndex,
                              gridColumn: `${activity.dayIndex + 1} / ${
                                activity.dayIndex + 2
                              }`,
                              gridRow: "2 / 3",
                            } as React.CSSProperties
                          }
                          title={eventDescription}
                          type="button"
                        >
                          <strong>{activity.title}</strong>
                          <span>{`Due ${activity.dueDate}`}</span>
                        </CourseScheduleCalendarEvent>
                      );
                    })}
                  </CourseScheduleCalendarGrid>
                </CourseScheduleCalendar>

                <CourseScheduleAvailabilityFrame
                  aria-label="Activities with no due date"
                  data-drop-target={isAvailabilityDropTarget ? "true" : "false"}
                  onDragLeave={() => setIsAvailabilityDropTarget(false)}
                  onDragOver={handleAvailabilityDragOver}
                  onDrop={handleAvailabilityDrop}
                  role="region"
                >
                  <CourseScheduleAvailabilityFrameHeader>
                    <strong>No due dates</strong>
                    <span>Available start of the week</span>
                  </CourseScheduleAvailabilityFrameHeader>
                  {currentWeekAvailabilityEvents.length ? (
                    <CourseScheduleAvailabilityList>
                      {currentWeekAvailabilityEvents.map((activity) => {
                        const activityDefinition =
                          currentChapterActivities.find(
                            (chapterActivity) =>
                              chapterActivity.id === activity.activityId,
                          );

                        return (
                          <CourseScheduleAvailabilityItem
                            aria-label={`Edit ${activity.title} available ${activity.availableDate} with no due date`}
                            data-dragging={
                              draggedActivityId === activity.activityId
                                ? "true"
                                : "false"
                            }
                            draggable
                            key={`${activity.weekIndex}-${activity.activityId}`}
                            onClick={() =>
                              openScheduledActivitySettings(activity)
                            }
                            onDragEnd={clearCalendarDragState}
                            onDragStart={(event) =>
                              handleScheduledActivityDragStart(event, activity)
                            }
                            type="button"
                          >
                            <CourseScheduleActivityIcon>
                              {activityDefinition?.icon === "book" ? (
                                <BookIcon aria-hidden size={18} />
                              ) : (
                                <AssignmentTurnedInIcon aria-hidden size={18} />
                              )}
                            </CourseScheduleActivityIcon>
                            <CourseScheduleActivityCardBody>
                              <strong>{activity.title}</strong>
                              <CourseScheduleActivityCardMeta>
                                <span>{`Available ${activity.availableDate}`}</span>
                              </CourseScheduleActivityCardMeta>
                            </CourseScheduleActivityCardBody>
                          </CourseScheduleAvailabilityItem>
                        );
                      })}
                    </CourseScheduleAvailabilityList>
                  ) : null}
                </CourseScheduleAvailabilityFrame>

                <CourseScheduleActivityCardMeta aria-label="Calendar legend">
                  <span>
                    <i data-variant="activity" />
                    Activity
                  </span>
                  <span>
                    <i data-variant="holiday" />
                    Holiday / Break
                  </span>
                </CourseScheduleActivityCardMeta>

                {showScheduleFields ? (
                  <CourseScheduleScheduleForm
                    aria-label="Schedule selected activity"
                    ref={scheduleFormRef}
                  >
                    {selectedWeekActivity ? (
                      <CourseScheduleScheduleActivityTitle>
                        {selectedWeekActivity.title}
                      </CourseScheduleScheduleActivityTitle>
                    ) : null}
                    <CourseScheduleScheduleField>
                      <DatePicker
                        containerStyle={datePickerContainerStyle}
                        inputStyle={datePickerInputStyle}
                        labelText="Date Available"
                        onChange={updateScheduleDateInput("availableDate")}
                        onDateChange={updateScheduleDate("availableDate")}
                        placeholder="XXX"
                        value={parseScheduleDate(scheduleForm.availableDate)}
                      />
                    </CourseScheduleScheduleField>
                    <CourseScheduleScheduleField>
                      <TimePicker
                        containerStyle={datePickerContainerStyle}
                        id="time-available"
                        inputStyle={datePickerInputStyle}
                        labelText="Time Available"
                        onChange={(value) =>
                          updateScheduleForm("availableTime", value)
                        }
                        value={scheduleForm.availableTime}
                      />
                    </CourseScheduleScheduleField>
                    <CourseScheduleScheduleField>
                      <DatePicker
                        containerStyle={datePickerContainerStyle}
                        inputStyle={datePickerInputStyle}
                        labelText="Date Due"
                        onChange={updateScheduleDateInput("dueDate")}
                        onDateChange={updateScheduleDate("dueDate")}
                        placeholder="XXX"
                        value={parseScheduleDate(scheduleForm.dueDate)}
                      />
                    </CourseScheduleScheduleField>
                    <CourseScheduleScheduleField>
                      <TimePicker
                        containerStyle={datePickerContainerStyle}
                        id="time-due"
                        inputStyle={datePickerInputStyle}
                        labelText="Time Due"
                        onChange={(value) =>
                          updateScheduleForm("dueTime", value)
                        }
                        value={scheduleForm.dueTime}
                      />
                    </CourseScheduleScheduleField>
                    <CourseScheduleScheduleSetButton
                      onClick={setScheduledActivity}
                      type="button"
                    >
                      Set
                    </CourseScheduleScheduleSetButton>
                  </CourseScheduleScheduleForm>
                ) : null}
              </CourseScheduleWeekTemplateMain>

              <CourseScheduleActivityPanel
                aria-label={`${currentChapterTitle} activity selector`}
              >
                <CourseScheduleActivityPanelHeader>
                  <span>{currentChapterTitle}</span>
                  <CourseScheduleChapterNav>
                    <button
                      aria-label="Previous chapter"
                      disabled={currentChapterIndex === 0}
                      onClick={() =>
                        changeChapter(Math.max(0, currentChapterIndex - 1))
                      }
                      type="button"
                    >
                      <KeyboardArrowLeftIcon aria-hidden size={20} />
                    </button>
                    <button
                      aria-label="Next chapter"
                      disabled={
                        currentChapterIndex === chapterNumbers.length - 1
                      }
                      onClick={() =>
                        changeChapter(
                          Math.min(
                            chapterNumbers.length - 1,
                            currentChapterIndex + 1,
                          ),
                        )
                      }
                      type="button"
                    >
                      <KeyboardArrowRightIcon aria-hidden size={20} />
                    </button>
                  </CourseScheduleChapterNav>
                </CourseScheduleActivityPanelHeader>
                <CourseScheduleActivityPanelBody>
                  {currentChapterSections.map((section) => (
                    <CourseScheduleActivitySection key={section.id}>
                      <CourseScheduleActivitySectionHeader type="button">
                        <KeyboardArrowDownIcon aria-hidden size={18} />
                        <span>{section.title}</span>
                      </CourseScheduleActivitySectionHeader>
                      <CourseScheduleActivitySectionBody>
                        {section.activities.map((activity) => {
                          const isAssigned = isActivityAssigned(activity.id);
                          const isDisabled = Boolean(
                            activity.disabled || isAssigned,
                          );
                          const isSelected =
                            selectedWeekActivityId === activity.id ||
                            isAssigned;

                          return (
                            <CourseScheduleActivityCard
                              data-disabled={isDisabled ? "true" : "false"}
                              data-dragging={
                                draggedActivityId === activity.id
                                  ? "true"
                                  : "false"
                              }
                              data-selected={isSelected ? "true" : "false"}
                              draggable={!isDisabled}
                              key={activity.id}
                              onDragEnd={clearCalendarDragState}
                              onDragStart={(event) =>
                                handleActivityDragStart(event, activity)
                              }
                            >
                              <CourseScheduleActivityCheckbox
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() => selectWeekActivity(activity)}
                                type="checkbox"
                              />
                              <CourseScheduleActivityIcon>
                                {activity.icon === "book" ? (
                                  <BookIcon aria-hidden size={18} />
                                ) : (
                                  <AssignmentTurnedInIcon
                                    aria-hidden
                                    size={18}
                                  />
                                )}
                              </CourseScheduleActivityIcon>
                              <CourseScheduleActivityCardBody>
                                <strong>{activity.title}</strong>
                                {activity.detail ? (
                                  <CourseScheduleActivityCardMeta>
                                    <span>{activity.detail}</span>
                                  </CourseScheduleActivityCardMeta>
                                ) : null}
                              </CourseScheduleActivityCardBody>
                              <CourseScheduleActivityPoints>
                                {activity.points}
                              </CourseScheduleActivityPoints>
                            </CourseScheduleActivityCard>
                          );
                        })}
                      </CourseScheduleActivitySectionBody>
                    </CourseScheduleActivitySection>
                  ))}
                </CourseScheduleActivityPanelBody>
                <CourseScheduleActivityAddButton
                  disabled={
                    !selectedWeekActivity || selectedWeekActivityIsAssigned
                  }
                  onClick={addSelectedActivityToSchedule}
                  type="button"
                >
                  <AddIcon aria-hidden size={18} />
                  Add
                </CourseScheduleActivityAddButton>
              </CourseScheduleActivityPanel>
            </CourseScheduleWeekTemplateLayout>
          </CourseScheduleModalContent>

          <CourseScheduleWeekFooter>
            <CourseScheduleActionButton
              color={ButtonColor.secondary}
              onClick={() => setCurrentStep("schedule-breaks")}
              type={ButtonType.button}
            >
              Back
            </CourseScheduleActionButton>
            <CourseScheduleActionButton
              color={ButtonColor.primary}
              onClick={() =>
                onClose({
                  customBreaks,
                  scheduledActivities,
                  selectedBreaks,
                  selectedDays,
                  step: "week-template",
                })
              }
              type={ButtonType.button}
            >
              Apply Template to Course
            </CourseScheduleActionButton>
          </CourseScheduleWeekFooter>
        </>
      ) : (
        <>
          <CourseScheduleModalContent>
            <CourseScheduleIntro>
              Set your meeting days and mark holidays or breaks when class won't
              meet
            </CourseScheduleIntro>

            <CourseScheduleSection>
              <CourseScheduleSectionTitle>
                Which days does your course meet?
              </CourseScheduleSectionTitle>
              <CourseScheduleDaysGrid aria-label="Course meeting days">
                {weekdays.map((day) => (
                  <CourseScheduleDayButton
                    aria-pressed={selectedDays.includes(day.label)}
                    key={day.label}
                    onClick={() => toggleDay(day.label)}
                    type="button"
                  >
                    {day.label}
                  </CourseScheduleDayButton>
                ))}
              </CourseScheduleDaysGrid>
            </CourseScheduleSection>

            <CourseScheduleSection>
              <CourseScheduleSectionTitle>
                Add Breaks or Holidays
              </CourseScheduleSectionTitle>
              <CourseScheduleBreaksGrid>
                {breaks.map((courseBreak) => (
                  <CourseScheduleBreakButton
                    aria-pressed={selectedBreaks.includes(courseBreak.id)}
                    key={courseBreak.id}
                    onClick={() => toggleBreak(courseBreak.id)}
                    type="button"
                  >
                    <CourseScheduleBreakName>
                      {courseBreak.name}
                    </CourseScheduleBreakName>
                    <CourseScheduleBreakDate>
                      {courseBreak.date}
                    </CourseScheduleBreakDate>
                  </CourseScheduleBreakButton>
                ))}
              </CourseScheduleBreaksGrid>
              {customBreaks.map((customBreak, index) => (
                <CourseScheduleCustomBreakRow key={customBreak.id}>
                  <CourseScheduleCustomBreakField>
                    <CourseScheduleCustomBreakLabel
                      htmlFor={`${customBreak.id}-name`}
                    >
                      Break Name
                    </CourseScheduleCustomBreakLabel>
                    <CourseScheduleCustomBreakInput
                      id={`${customBreak.id}-name`}
                      onChange={(event) =>
                        updateCustomBreak(customBreak.id, {
                          name: event.target.value,
                        })
                      }
                      placeholder="e.g., Midterm Week"
                      value={customBreak.name}
                    />
                  </CourseScheduleCustomBreakField>
                  <CourseScheduleCustomBreakField>
                    <CourseScheduleCustomBreakLabel
                      htmlFor={`${customBreak.id}-start-date`}
                    >
                      Start Date
                    </CourseScheduleCustomBreakLabel>
                    <CourseScheduleCustomBreakInput
                      id={`${customBreak.id}-start-date`}
                      onChange={(event) =>
                        updateCustomBreak(customBreak.id, {
                          startDate: event.target.value,
                        })
                      }
                      value={customBreak.startDate}
                    />
                  </CourseScheduleCustomBreakField>
                  <CourseScheduleCustomBreakField>
                    <CourseScheduleCustomBreakLabel
                      htmlFor={`${customBreak.id}-end-date`}
                    >
                      End Date
                    </CourseScheduleCustomBreakLabel>
                    <CourseScheduleCustomBreakInput
                      id={`${customBreak.id}-end-date`}
                      onChange={(event) =>
                        updateCustomBreak(customBreak.id, {
                          endDate: event.target.value,
                        })
                      }
                      value={customBreak.endDate}
                    />
                  </CourseScheduleCustomBreakField>
                  <CourseScheduleRemoveCustomBreakButton
                    aria-label={`Remove custom break ${index + 1}`}
                    onClick={() => removeCustomBreak(customBreak.id)}
                    type="button"
                  >
                    <CloseIcon aria-hidden size={20} />
                  </CourseScheduleRemoveCustomBreakButton>
                </CourseScheduleCustomBreakRow>
              ))}
              <CourseScheduleAddBreakButton
                onClick={addCustomBreak}
                type="button"
              >
                <AddIcon aria-hidden size={20} />
                Add Custom Break
              </CourseScheduleAddBreakButton>
            </CourseScheduleSection>
          </CourseScheduleModalContent>

          <CourseScheduleActions>
            <CourseScheduleActionButton
              color={ButtonColor.secondary}
              onClick={() => onClose(false)}
              type={ButtonType.button}
            >
              Cancel
            </CourseScheduleActionButton>
            <CourseScheduleActionButton
              color={ButtonColor.primary}
              onClick={() => setCurrentStep("week-template")}
              type={ButtonType.button}
            >
              Next
            </CourseScheduleActionButton>
          </CourseScheduleActions>
        </>
      )}
    </CourseScheduleModalShell>
  );
}
