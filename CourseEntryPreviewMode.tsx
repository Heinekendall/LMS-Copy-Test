import { DateTime } from "luxon";
import * as React from "react";
import { ButtonColor, ButtonShape, ButtonSize } from "react-magma-dom";
import {
  AccessTimeIcon,
  AddIcon,
  AssessmentIcon,
  BookIcon,
  CalendarTodayIcon,
  CloseIcon,
  DeleteIcon,
  ExpandMoreIcon,
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
  ListIcon,
  LockIcon,
  PreviewIcon,
} from "react-magma-icons";

import type { CourseForSnapshot } from "../../../api/nb/service/course/courseForSnapshotQuery.ts";
import type {
  ActivityNode,
  GroupNode,
  PathNode,
} from "../../../api/nb/service/nextbook/nodesQuery.ts";
import {
  ACTIVITY_TYPES,
  NODE_TYPES,
} from "../../../constants/activityConstants.ts";
import { useIntl } from "../../../hooks/hooks.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks.ts";
import { SnapshotSelectors } from "../../../store/snapshot/snapshot.ts";
import {
  WorkflowActions,
  WorkflowSelectors,
} from "../../../store/workflow/workflow.ts";
import type { NodesMap } from "../../../types/types.ts";
import * as activityUtil from "../../../utilities/activityUtils.ts";
import {
  type CourseEntryBreak,
  defaultCourseEntryBreaks,
} from "../courseEntryBreaks.ts";
import {
  CoursePreviewActionButton,
  CoursePreviewActivityCount,
  CoursePreviewActivityType,
  CoursePreviewBody,
  CoursePreviewBreakDateActions,
  CoursePreviewBreakDateCancel,
  CoursePreviewBreakDateField,
  CoursePreviewBreakDateFields,
  CoursePreviewBreakDateIconButton,
  CoursePreviewBreakDateInput,
  CoursePreviewBreakDateInputShell,
  CoursePreviewBreakDatePicker,
  CoursePreviewBreakDatePickerCalendar,
  CoursePreviewBreakDatePickerPanel,
  CoursePreviewBreakDateSave,
  CoursePreviewContentActivity,
  CoursePreviewContentList,
  CoursePreviewContentTopic,
  CoursePreviewContentTopicCount,
  CoursePreviewContentTopicHeader,
  CoursePreviewContentTopicTitle,
  CoursePreviewDateDay,
  CoursePreviewDateGroup,
  CoursePreviewDateHeader,
  CoursePreviewDateNumber,
  CoursePreviewDatePicker,
  CoursePreviewDatePickerCalendar,
  CoursePreviewDatePickerCell,
  CoursePreviewDatePickerDateButton,
  CoursePreviewDatePickerDay,
  CoursePreviewDatePickerDone,
  CoursePreviewDatePickerFooter,
  CoursePreviewDatePickerHeader,
  CoursePreviewDatePickerIconButton,
  CoursePreviewDatePickerMonthLabel,
  CoursePreviewDatePickerNav,
  CoursePreviewDatePickerTimeField,
  CoursePreviewDatePickerTimeInput,
  CoursePreviewDatePickerTimeRow,
  CoursePreviewDatePickerToday,
  CoursePreviewDateText,
  CoursePreviewDueDateButton,
  CoursePreviewHeader,
  CoursePreviewHeaderActions,
  CoursePreviewHeaderCopy,
  CoursePreviewHeaderDescription,
  CoursePreviewHeaderStart,
  CoursePreviewHeaderSummary,
  CoursePreviewHeaderTitle,
  CoursePreviewIndentedGroup,
  CoursePreviewItem,
  CoursePreviewItemAvailability,
  CoursePreviewItemAvailabilityLink,
  CoursePreviewItemAvailabilityText,
  CoursePreviewItemBody,
  CoursePreviewItemContent,
  CoursePreviewItemDescription,
  CoursePreviewItemIcon,
  CoursePreviewItemMain,
  CoursePreviewItemTitle,
  CoursePreviewModeIndicator,
  CoursePreviewPoints,
  CoursePreviewShell,
  CoursePreviewSkippedHoliday,
  CoursePreviewSkippedHolidayContent,
  CoursePreviewSkippedHolidayDateButton,
  CoursePreviewSkippedHolidayDeleteButton,
  CoursePreviewSkippedHolidayIcon,
  CoursePreviewSkippedHolidayTitle,
  CoursePreviewToolbar,
  CoursePreviewToolbarStart,
  CoursePreviewViewButton,
  CoursePreviewViewTabs,
  CoursePreviewViewTabsLabel,
  CoursePreviewWeek,
  CoursePreviewWeekDateGroups,
  CoursePreviewWeekDates,
  CoursePreviewWeekHeader,
  CoursePreviewWeekLabel,
  CoursePreviewWeekTitle,
} from "./CourseEntryPreviewMode.styled.ts";
import {
  formatBreakDateInput,
  getBreakDateRange,
  getBreakDatesInRange,
  getDatePickerIsoDate,
  parseCourseCopyDate,
} from "./previewDateUtils.ts";
import ScheduleBreaksModal from "./ScheduleBreaksModal.tsx";

type PreviewActivity = {
  activityType: ActivityNode["activityType"];
  availableDate?: number;
  availableText?: PreviewAvailableDateText;
  description?: string;
  dueDate?: number;
  dueText: string;
  gradingText?: string;
  id: string;
  placementDate: number;
  points?: number;
  title: string;
  type: "assessment" | "reading";
};
type PreviewAvailableDateText = {
  date: string;
  time: string;
};
type PreviewSkippedHoliday = {
  dateText: string;
  day: string;
  id: string;
  name: string;
  sortDate: number;
  weekday: string;
};
type PreviewDateGroup = {
  activities: PreviewActivity[];
  day: string;
  holidays: PreviewSkippedHoliday[];
  id: string;
  sortDate: number;
  weekday: string;
};
type PreviewWeek = {
  activityCount: string;
  dateGroups: PreviewDateGroup[];
  dateRange: string;
  endDate: number;
  id: string;
  label: string;
  sortDate: number;
};

type PreviewViewMode = "list" | "week";

type PreviewContentItem =
  | {
      activity: PreviewActivity;
      depth: number;
      id: string;
      type: "activity";
    }
  | {
      activityCount: string;
      children: PreviewContentItem[];
      depth: number;
      id: string;
      title: string;
      type: "topic";
    };

type PreviewActivityDateEdit = Partial<
  Pick<
    PreviewActivity,
    "availableDate" | "availableText" | "dueDate" | "dueText" | "placementDate"
  >
>;

type PreviewActivityDateEditsState = {
  edits: Record<string, PreviewActivityDateEdit>;
  scopeKey: string;
};

type PreviewHolidayDateEditsState = {
  edits: Record<string, number>;
  scopeKey: string;
};

type PreviewCustomBreaksState = {
  breaks: CourseEntryBreak[];
  scopeKey: string;
};

type PreviewDeletedBreaksState = {
  breakIds: string[];
  scopeKey: string;
};

type PreviewHolidayPushedActivityIdsState = {
  activityIds: string[];
  scopeKey: string;
};

type BreakDateField = "end" | "start";

type DateEditorState = {
  activeBreakDateField?: BreakDateField;
  anchor: DatePickerAnchor;
  dueDate: string;
  endDate?: string;
  dueTime?: string;
  target:
    | {
        activityId: string;
        type: "activity";
      }
    | {
        activityId: string;
        type: "availableDate";
      }
    | {
        holidayId: string;
        type: "holiday";
      }
    | {
        holidayId: string;
        type: "newHoliday";
      };
  title: string;
  visibleMonth: string;
};

type CourseDateRange = {
  endDate: number;
  startDate: number;
};

type DatePickerAnchor = {
  left: number;
  top: number;
};

type FlattenedActivity = {
  activity: ActivityNode;
  topLevelNodeId: number;
};

type CalendarDateCell = {
  date: DateTime;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
};

const defaultCopiedCourseStartDate = "08/03/2026";
const defaultCopiedCourseEndDate = "12/18/2026";
const defaultCopiedCourseTimeZone = "America/Denver";
const calendarWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const datePickerWidth = 320;
const datePickerEstimatedHeight = 500;
const breakDatePickerWidth = 604;
const breakDatePickerEstimatedHeight = 300;
const datePickerViewportMargin = 12;
const datePickerOffset = 6;
const customBreakName = "Break / No Class";
const exampleAvailableDateOffsetsByActivityId = new Map<number, number>([
  [60000031, 1],
  [60000032, 1],
  [60000186, 3],
]);

function getDatePickerAnchor(
  target: HTMLElement,
  {
    estimatedHeight = datePickerEstimatedHeight,
    width = datePickerWidth,
  }: {
    estimatedHeight?: number;
    width?: number;
  } = {},
): DatePickerAnchor {
  const bounds = target.getBoundingClientRect();
  const viewportWidth =
    typeof window === "undefined" ? width : window.innerWidth;
  const viewportHeight =
    typeof window === "undefined" ? estimatedHeight : window.innerHeight;
  const maxLeft = Math.max(
    datePickerViewportMargin,
    viewportWidth - width - datePickerViewportMargin,
  );
  const maxTop = Math.max(
    datePickerViewportMargin,
    viewportHeight - estimatedHeight - datePickerViewportMargin,
  );
  const left = Math.min(
    Math.max(bounds.left, datePickerViewportMargin),
    maxLeft,
  );
  const top = Math.min(
    Math.max(bounds.bottom + datePickerOffset, datePickerViewportMargin),
    maxTop,
  );

  return { left, top };
}

function getFallbackBreakDate(targetRange: CourseDateRange, timezone: string) {
  return DateTime.fromMillis(targetRange.startDate, { zone: "UTC" })
    .setZone(timezone)
    .startOf("day");
}

function getBreakDateInputDate(
  value: string | undefined,
  fallbackDate: DateTime,
  timezone: string,
) {
  return value?.trim()
    ? parseCourseCopyDate(value, timezone)?.startOf("day") || fallbackDate
    : fallbackDate;
}

function getBreakDatePickerSelectedDate({
  dateEditor,
  targetRange,
  timezone,
}: {
  dateEditor: DateEditorState;
  targetRange: CourseDateRange;
  timezone: string;
}) {
  const fallbackDate = getFallbackBreakDate(targetRange, timezone);
  const activeDateValue =
    dateEditor.activeBreakDateField === "end"
      ? dateEditor.endDate || dateEditor.dueDate
      : dateEditor.dueDate;

  return getBreakDateInputDate(activeDateValue, fallbackDate, timezone);
}

function getCalendarDateCells({
  selectedDate,
  timezone,
  visibleMonth,
}: {
  selectedDate: string;
  timezone: string;
  visibleMonth: string;
}): CalendarDateCell[] {
  const selectedDateTime = DateTime.fromISO(selectedDate, { zone: timezone });
  const visibleMonthDateTime = DateTime.fromISO(visibleMonth, {
    zone: timezone,
  }).startOf("month");
  const today = DateTime.now().setZone(timezone).startOf("day");
  const firstCalendarDate = visibleMonthDateTime.minus({
    days: visibleMonthDateTime.weekday % 7,
  });

  return Array.from({ length: 42 }, (_, index) => {
    const date = firstCalendarDate.plus({ days: index });

    return {
      date,
      isCurrentMonth: date.hasSame(visibleMonthDateTime, "month"),
      isSelected:
        selectedDateTime.isValid && date.hasSame(selectedDateTime, "day"),
      isToday: date.hasSame(today, "day"),
    };
  });
}

function formatCalendarDateLabel(date: DateTime, locale: string) {
  return date.toFormat("LLLL d, yyyy", { locale });
}

function getTargetCourseRange({
  courseEndDate,
  courseStartDate,
  timezone,
}: {
  courseEndDate?: string | null;
  courseStartDate?: string | null;
  timezone: string;
}): CourseDateRange {
  const defaultStartDate = parseCourseCopyDate(
    defaultCopiedCourseStartDate,
    timezone,
  )!;
  const defaultEndDate = parseCourseCopyDate(
    defaultCopiedCourseEndDate,
    timezone,
  )!;
  const startDate =
    (courseStartDate && parseCourseCopyDate(courseStartDate, timezone)) ||
    defaultStartDate;
  let endDate =
    (courseEndDate && parseCourseCopyDate(courseEndDate, timezone)) ||
    defaultEndDate;

  if (endDate.toMillis() <= startDate.toMillis()) {
    endDate = startDate.plus({ weeks: 1 });
  }

  return {
    startDate: startDate.startOf("day").toMillis(),
    endDate: endDate.endOf("day").toMillis(),
  };
}

function getSourceCourseRange(
  course: CourseForSnapshot | null,
  targetRange: CourseDateRange,
): CourseDateRange {
  if (!course || course.endDate <= course.startDate) {
    return targetRange;
  }

  return {
    startDate: course.startDate,
    endDate: course.endDate,
  };
}

function shiftDateToCopiedCourseRange(
  date: number,
  sourceRange: CourseDateRange,
  targetRange: CourseDateRange,
) {
  const sourceDuration = sourceRange.endDate - sourceRange.startDate;
  const targetDuration = targetRange.endDate - targetRange.startDate;

  if (sourceDuration <= 0 || targetDuration <= 0) {
    return date;
  }

  const sourceProgress = (date - sourceRange.startDate) / sourceDuration;
  const shiftedDate = targetRange.startDate + sourceProgress * targetDuration;

  return Math.min(
    Math.max(Math.round(shiftedDate), targetRange.startDate),
    targetRange.endDate,
  );
}

function getPreviewDueTimestamp(date: number, timezone: string) {
  return DateTime.fromMillis(date, { zone: "UTC" })
    .setZone(timezone)
    .set({ hour: 23, millisecond: 0, minute: 59, second: 0 })
    .toMillis();
}

function formatPreviewDueText(date: number, timezone: string, locale: string) {
  const formattedDate = DateTime.fromMillis(date, { zone: "UTC" })
    .setZone(timezone)
    .toFormat("MMM d yyyy '@' h:mm a ZZZZ", { locale });

  return `Due ${formattedDate}`;
}

function formatPreviewAvailableDateText(
  date: number,
  timezone: string,
  locale: string,
): PreviewAvailableDateText {
  const formattedDate = DateTime.fromMillis(date, { zone: "UTC" }).setZone(
    timezone,
  );

  return {
    date: formattedDate.toFormat("MMM d", { locale }),
    time: formattedDate.toFormat("h:mm a", { locale }),
  };
}

function formatPreviewHolidayDateText(
  date: number,
  timezone: string,
  locale: string,
) {
  return DateTime.fromMillis(date, { zone: "UTC" })
    .setZone(timezone)
    .toFormat("MMM d yyyy", { locale });
}

function formatPreviewWeekDateRange(
  startDate: number,
  endDate: number,
  timezone: string,
  locale: string,
) {
  const start = DateTime.fromMillis(startDate, { zone: timezone });
  const end = DateTime.fromMillis(endDate, { zone: timezone }).minus({
    days: 1,
  });

  if (start.hasSame(end, "month")) {
    return `${start.toFormat("MMMM d", { locale })}-${end.toFormat("d", {
      locale,
    })}`;
  }

  return `${start.toFormat("MMMM d", { locale })}-${end.toFormat("MMMM d", {
    locale,
  })}`;
}

function formatActivityCount(count: number) {
  return count === 1 ? "1 activity" : `${count} activities`;
}

function buildPreviewWeeks({
  locale,
  targetRange,
  timezone,
}: {
  locale: string;
  targetRange: CourseDateRange;
  timezone: string;
}) {
  const courseEndDate = DateTime.fromMillis(targetRange.endDate, {
    zone: timezone,
  });
  let currentWeekStartDate = DateTime.fromMillis(targetRange.startDate, {
    zone: timezone,
  }).startOf("day");
  let weekNumber = 1;
  const weeks: PreviewWeek[] = [];

  while (currentWeekStartDate.toMillis() < courseEndDate.toMillis()) {
    const nextWeekStartDate = currentWeekStartDate
      .plus({ weeks: 1 })
      .startOf("week");
    const currentWeekEndDate =
      courseEndDate.toMillis() < nextWeekStartDate.toMillis()
        ? courseEndDate.plus({ days: 1 }).startOf("day")
        : nextWeekStartDate;

    weeks.push({
      activityCount: "0 activities",
      dateGroups: [],
      dateRange: formatPreviewWeekDateRange(
        currentWeekStartDate.toMillis(),
        currentWeekEndDate.toMillis(),
        timezone,
        locale,
      ),
      endDate: currentWeekEndDate.toMillis(),
      id: `week-${weekNumber}`,
      label: `WEEK ${weekNumber}`,
      sortDate: currentWeekStartDate.toMillis(),
    });

    currentWeekStartDate = currentWeekEndDate;
    weekNumber++;
  }

  return weeks;
}

function getActivityPoints(activity: ActivityNode) {
  if (typeof activity.maxScore !== "number") {
    return undefined;
  }

  const score = activityUtil.getScore(activity.maxScore);

  return typeof score === "number" ? score : undefined;
}

function getExampleAvailableDate({
  activityId,
  dueDate,
  timezone,
}: {
  activityId: number;
  dueDate?: number;
  timezone: string;
}) {
  const daysBeforeDueDate =
    exampleAvailableDateOffsetsByActivityId.get(activityId);

  if (!dueDate || !daysBeforeDueDate) {
    return undefined;
  }

  return DateTime.fromMillis(dueDate, { zone: "UTC" })
    .setZone(timezone)
    .minus({ days: daysBeforeDueDate })
    .startOf("day")
    .toMillis();
}

function getPreviewAvailableDate({
  activity,
  shiftedDueDate,
  sourceRange,
  targetRange,
  timezone,
}: {
  activity: ActivityNode;
  shiftedDueDate?: number;
  sourceRange: CourseDateRange;
  targetRange: CourseDateRange;
  timezone: string;
}) {
  const shiftedAvailableDate = activity.startDate
    ? shiftDateToCopiedCourseRange(activity.startDate, sourceRange, targetRange)
    : getExampleAvailableDate({
        activityId: activity.id,
        dueDate: shiftedDueDate,
        timezone,
      });

  if (!shiftedAvailableDate || !shiftedDueDate) {
    return shiftedAvailableDate;
  }

  if (shiftedAvailableDate < shiftedDueDate) {
    return shiftedAvailableDate;
  }

  return DateTime.fromMillis(shiftedDueDate, { zone: "UTC" })
    .setZone(timezone)
    .minus({ days: 1 })
    .startOf("day")
    .toMillis();
}

function isNodeVisible(node: ActivityNode | GroupNode | PathNode) {
  return node.visibleToStudent !== false;
}

function getNodeById(nodes: NodesMap, id: number) {
  return nodes.activities[id] || nodes.topics[id];
}

function getSortedChildren(nodes: NodesMap, nodeId: number) {
  const childrenIds = nodes.meta[nodeId]?.childrenIds || [];

  return childrenIds
    .map((id) => getNodeById(nodes, id))
    .filter(Boolean)
    .sort((prev, next) => prev.order - next.order);
}

function flattenVisibleActivities(nodes: NodesMap, rootTopicId: number | null) {
  if (rootTopicId == null) {
    return [];
  }

  const walkNode = (
    node: ActivityNode | GroupNode | PathNode,
    topLevelNodeId: number,
  ): FlattenedActivity[] => {
    if (!isNodeVisible(node)) {
      return [];
    }

    if (node.type === NODE_TYPES.ACTIVITY) {
      return [{ activity: node, topLevelNodeId }];
    }

    return getSortedChildren(nodes, node.id).flatMap((child) =>
      walkNode(child, topLevelNodeId),
    );
  };

  return getSortedChildren(nodes, rootTopicId).flatMap((node) =>
    walkNode(node, node.id),
  );
}

function getWeekForDate(weeks: PreviewWeek[], date: number) {
  if (date < weeks[0].sortDate) {
    return weeks[0];
  }

  return (
    weeks.find((week, index) => {
      const nextWeek = weeks[index + 1];
      const endDate = nextWeek?.sortDate ?? Number.POSITIVE_INFINITY;

      return date >= week.sortDate && date < endDate;
    }) || weeks[weeks.length - 1]
  );
}

function getDateGroupForDate({
  dateGroupsByWeek,
  locale,
  sortDate,
  timezone,
  week,
}: {
  dateGroupsByWeek: Map<string, Map<string, PreviewDateGroup>>;
  locale: string;
  sortDate: number;
  timezone: string;
  week: PreviewWeek;
}) {
  const date = DateTime.fromMillis(sortDate, { zone: "UTC" })
    .setZone(timezone)
    .startOf("day");
  const dateGroupKey = date.toISODate() || String(sortDate);
  let dateGroups = dateGroupsByWeek.get(week.id);

  if (!dateGroups) {
    dateGroups = new Map<string, PreviewDateGroup>();
    dateGroupsByWeek.set(week.id, dateGroups);
  }

  let dateGroup = dateGroups.get(dateGroupKey);

  if (!dateGroup) {
    dateGroup = {
      activities: [],
      day: date.toFormat("d", { locale }),
      holidays: [],
      id: `${week.id}-${dateGroupKey}`,
      sortDate: date.toMillis(),
      weekday: date.toFormat("ccc", { locale }),
    };
    dateGroups.set(dateGroupKey, dateGroup);
    week.dateGroups.push(dateGroup);
  }

  return dateGroup;
}

function getPreviewSkippedHolidays({
  courseBreaks,
  holidayDateEdits = {},
  locale,
  targetRange,
  timezone,
}: {
  courseBreaks?: CourseEntryBreak[];
  holidayDateEdits?: Record<string, number>;
  locale: string;
  targetRange: CourseDateRange;
  timezone: string;
}): PreviewSkippedHoliday[] {
  return (courseBreaks || defaultCourseEntryBreaks).flatMap((courseBreak) => {
    const breakDateRange = getBreakDateRange({
      endDate: courseBreak.endDate,
      startDate: courseBreak.startDate,
      timezone,
    });

    if (!breakDateRange) {
      return [];
    }

    return getBreakDatesInRange(
      breakDateRange.startDate,
      breakDateRange.endDate,
    ).flatMap((breakDate, index) => {
      const breakDateKey = getDatePickerIsoDate(breakDate);
      const holidayId =
        index === 0 ? courseBreak.id : `${courseBreak.id}-${breakDateKey}`;
      const editedBreakDate = holidayDateEdits[holidayId];
      const visibleBreakDate =
        typeof editedBreakDate === "number"
          ? DateTime.fromMillis(editedBreakDate, { zone: "UTC" })
              .setZone(timezone)
              .startOf("day")
          : breakDate;
      const sortDate = visibleBreakDate.toMillis();

      if (sortDate < targetRange.startDate || sortDate > targetRange.endDate) {
        return [];
      }

      return [
        {
          dateText: formatPreviewHolidayDateText(sortDate, timezone, locale),
          day: visibleBreakDate.toFormat("d", { locale }),
          id: holidayId,
          name: courseBreak.name,
          sortDate,
          weekday: visibleBreakDate.toFormat("ccc", { locale }),
        },
      ];
    });
  });
}

function groupPreviewActivitiesByWeek({
  activities,
  holidays,
  locale,
  targetRange,
  timezone,
}: {
  activities: PreviewActivity[];
  holidays: PreviewSkippedHoliday[];
  locale: string;
  targetRange: CourseDateRange;
  timezone: string;
}) {
  const previewWeeks = buildPreviewWeeks({ locale, targetRange, timezone });

  if (!previewWeeks.length) {
    return [];
  }

  const dateGroupsByWeek = new Map<string, Map<string, PreviewDateGroup>>();

  for (const activity of activities) {
    const week = getWeekForDate(previewWeeks, activity.placementDate);

    if (!week) {
      continue;
    }

    if (!activity.dueDate) {
      continue;
    }

    const dateGroup = getDateGroupForDate({
      dateGroupsByWeek,
      locale,
      sortDate: activity.dueDate,
      timezone,
      week,
    });

    dateGroup.activities.push(activity);
  }

  for (const holiday of holidays) {
    const week = getWeekForDate(previewWeeks, holiday.sortDate);

    if (!week) {
      continue;
    }

    const dateGroup = getDateGroupForDate({
      dateGroupsByWeek,
      locale,
      sortDate: holiday.sortDate,
      timezone,
      week,
    });

    dateGroup.holidays.push(holiday);
  }

  return previewWeeks.map((week) => {
    const activityCount = week.dateGroups.reduce(
      (count, dateGroup) => count + dateGroup.activities.length,
      0,
    );

    return {
      ...week,
      activityCount: formatActivityCount(activityCount),
      dateGroups: week.dateGroups.sort(
        (prev, next) => prev.sortDate - next.sortDate,
      ),
    };
  });
}

function buildPreviewActivities({
  course,
  locale,
  nodes,
  rootTopicId,
  targetRange,
  timezone,
  weightedActivitiesIds,
}: {
  course: CourseForSnapshot | null;
  locale: string;
  nodes: NodesMap;
  rootTopicId: number | null;
  targetRange: CourseDateRange;
  timezone: string;
  weightedActivitiesIds: number[];
}) {
  const sourceRange = getSourceCourseRange(course, targetRange);
  const flattenedActivities = flattenVisibleActivities(nodes, rootTopicId);
  const sectionDueDates = new Map<number, number[]>();
  const previewActivities = flattenedActivities.map(
    ({ activity, topLevelNodeId }) => {
      const shiftedDueDate = activity.endDate
        ? getPreviewDueTimestamp(
            shiftDateToCopiedCourseRange(
              activity.endDate,
              sourceRange,
              targetRange,
            ),
            timezone,
          )
        : undefined;
      const shiftedAvailableDate = getPreviewAvailableDate({
        activity,
        shiftedDueDate,
        sourceRange,
        targetRange,
        timezone,
      });

      if (shiftedDueDate) {
        sectionDueDates.set(topLevelNodeId, [
          ...(sectionDueDates.get(topLevelNodeId) || []),
          shiftedDueDate,
        ]);
      }

      const gradingText = activityUtil.getGradingLabel(
        weightedActivitiesIds,
        activity,
      );

      return {
        activity,
        previewActivity: {
          activityType: activity.activityType,
          availableDate: shiftedAvailableDate,
          availableText: shiftedAvailableDate
            ? formatPreviewAvailableDateText(
                shiftedAvailableDate,
                timezone,
                locale,
              )
            : undefined,
          description: activity.description,
          dueDate: shiftedDueDate,
          dueText: shiftedDueDate
            ? formatPreviewDueText(shiftedDueDate, timezone, locale)
            : "Add Due Date",
          gradingText,
          id: String(activity.id),
          placementDate: shiftedDueDate || targetRange.startDate,
          points: getActivityPoints(activity),
          title: activity.name,
          type:
            activity.activityType === ACTIVITY_TYPES.READING
              ? "reading"
              : "assessment",
        } satisfies PreviewActivity,
        topLevelNodeId,
      };
    },
  );

  const firstDueDateBySection = new Map(
    Array.from(sectionDueDates.entries()).map(([sectionId, dueDates]) => [
      sectionId,
      Math.min(...dueDates),
    ]),
  );

  return previewActivities.map(({ previewActivity, topLevelNodeId }) =>
    previewActivity.dueDate
      ? previewActivity
      : {
          ...previewActivity,
          placementDate:
            firstDueDateBySection.get(topLevelNodeId) || targetRange.startDate,
        },
  );
}

function getPreviewContentActivityCount(items: PreviewContentItem[]): number {
  return items.reduce(
    (count, item) =>
      item.type === "activity"
        ? count + 1
        : count + getPreviewContentActivityCount(item.children),
    0,
  );
}

function buildPreviewContentItems({
  activitiesById,
  nodes,
  rootTopicId,
}: {
  activitiesById: Map<string, PreviewActivity>;
  nodes: NodesMap;
  rootTopicId: number | null;
}): PreviewContentItem[] {
  if (rootTopicId == null) {
    return [];
  }

  const buildNode = (
    node: ActivityNode | GroupNode | PathNode,
    depth: number,
  ): PreviewContentItem | undefined => {
    if (!isNodeVisible(node)) {
      return undefined;
    }

    if (node.type === NODE_TYPES.ACTIVITY) {
      const activity = activitiesById.get(String(node.id));

      return activity
        ? {
            activity,
            depth,
            id: String(node.id),
            type: "activity",
          }
        : undefined;
    }

    const children = getSortedChildren(nodes, node.id)
      .map((child) => buildNode(child, depth + 1))
      .filter((child): child is PreviewContentItem => Boolean(child));

    return {
      activityCount: formatActivityCount(
        getPreviewContentActivityCount(children),
      ),
      children,
      depth,
      id: String(node.id),
      title: node.name,
      type: "topic",
    };
  };

  return getSortedChildren(nodes, rootTopicId)
    .map((node) => buildNode(node, 1))
    .filter((item): item is PreviewContentItem => Boolean(item));
}

function flattenPreviewContentItems(
  items: PreviewContentItem[],
  collapsedTopicIds: Set<string>,
): PreviewContentItem[] {
  return items.flatMap((item) =>
    item.type === "topic"
      ? [
          item,
          ...(collapsedTopicIds.has(item.id)
            ? []
            : flattenPreviewContentItems(item.children, collapsedTopicIds)),
        ]
      : [item],
  );
}

function getPreviewContentIndent(item: PreviewContentItem) {
  if (item.type === "activity") {
    return item.depth > 1 ? 52 : 0;
  }

  return Math.max(0, item.depth - 1) * 24;
}

function normalizePreviewTime(time: string, fallbackTime: string) {
  const timeParts = time.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);

  if (!timeParts) {
    return fallbackTime;
  }

  return `${Number(timeParts[1])}:${timeParts[2]} ${timeParts[3].toUpperCase()}`;
}

function normalizeDueTime(dueTime: string) {
  return normalizePreviewTime(dueTime, "11:59 PM");
}

function getPreviewActivityDateUpdates(activities: PreviewActivity[]) {
  return activities.flatMap((activity) => {
    const activityId = Number(activity.id);

    if (
      !Number.isFinite(activityId) ||
      (typeof activity.dueDate !== "number" &&
        typeof activity.availableDate !== "number")
    ) {
      return [];
    }

    return [
      {
        ...(typeof activity.dueDate === "number"
          ? { endDate: activity.dueDate }
          : {}),
        ...(typeof activity.availableDate === "number"
          ? { startDate: activity.availableDate }
          : {}),
        id: activityId,
      },
    ];
  });
}

function getPreviewDateKeyFromMillis(date: number, timezone: string) {
  const dateTime = DateTime.fromMillis(date, { zone: "UTC" })
    .setZone(timezone)
    .startOf("day");

  return getDatePickerIsoDate(dateTime);
}

function getNextNonHolidayDate(date: DateTime, holidayDateKeys: Set<string>) {
  let nextDate = date;

  while (holidayDateKeys.has(getDatePickerIsoDate(nextDate.startOf("day")))) {
    nextDate = nextDate.plus({ days: 1 });
  }

  return nextDate;
}

function getActivityDateEditsForHolidayDate({
  activities,
  holidayDate,
  holidayDateKeys,
  locale,
  timezone,
}: {
  activities: PreviewActivity[];
  holidayDate: DateTime;
  holidayDateKeys: Set<string>;
  locale: string;
  timezone: string;
}): Record<string, PreviewActivityDateEdit> {
  const holidayDateKey = getDatePickerIsoDate(holidayDate.startOf("day"));

  return activities.reduce<Record<string, PreviewActivityDateEdit>>(
    (activityEdits, activity) => {
      if (!activity.dueDate) {
        return activityEdits;
      }

      const activityDueDate = DateTime.fromMillis(activity.dueDate, {
        zone: "UTC",
      }).setZone(timezone);

      if (
        getDatePickerIsoDate(activityDueDate.startOf("day")) !== holidayDateKey
      ) {
        return activityEdits;
      }

      const shiftedDueDate = getNextNonHolidayDate(
        activityDueDate.plus({ days: 1 }),
        holidayDateKeys,
      );
      const shiftedDueTimestamp = getPreviewDueTimestamp(
        shiftedDueDate.toMillis(),
        timezone,
      );

      activityEdits[activity.id] = {
        dueDate: shiftedDueTimestamp,
        dueText: formatPreviewDueText(shiftedDueTimestamp, timezone, locale),
        placementDate: shiftedDueTimestamp,
      };

      return activityEdits;
    },
    {},
  );
}

function getActivityDateEditsForHolidayDates({
  activities,
  holidayDates,
  holidayDateKeys,
  locale,
  timezone,
}: {
  activities: PreviewActivity[];
  holidayDates: DateTime[];
  holidayDateKeys: Set<string>;
  locale: string;
  timezone: string;
}): Record<string, PreviewActivityDateEdit> {
  return holidayDates.reduce<Record<string, PreviewActivityDateEdit>>(
    (activityEdits, holidayDate) => ({
      ...activityEdits,
      ...getActivityDateEditsForHolidayDate({
        activities,
        holidayDate,
        holidayDateKeys,
        locale,
        timezone,
      }),
    }),
    {},
  );
}

function getCourseBreakIdForHoliday(
  holidayId: string,
  courseBreaks: CourseEntryBreak[],
) {
  return courseBreaks
    .map((courseBreak) => courseBreak.id)
    .sort((firstId, secondId) => secondId.length - firstId.length)
    .find(
      (breakId) => holidayId === breakId || holidayId.startsWith(`${breakId}-`),
    );
}

function isHolidayIdForCourseBreak(holidayId: string, courseBreakId: string) {
  return (
    holidayId === courseBreakId || holidayId.startsWith(`${courseBreakId}-`)
  );
}

type CourseEntryPreviewModeProps = {
  courseEndDate?: string | null;
  courseStartDate?: string | null;
  courseTimeZone?: string | null;
  hasConfiguredCourseBreaks?: boolean;
  initialCourseBreaks?: CourseEntryBreak[];
  initialPreviewView?: PreviewViewMode;
  initialScheduleDialogOpen?: boolean;
  onApply: () => void;
  onClose: () => void;
  onScheduleDialogClose?: () => void;
};

export default function CourseEntryPreviewMode({
  courseEndDate,
  courseStartDate,
  courseTimeZone,
  hasConfiguredCourseBreaks = false,
  initialCourseBreaks = [],
  initialPreviewView = "list",
  initialScheduleDialogOpen = false,
  onApply,
  onClose,
  onScheduleDialogClose,
}: CourseEntryPreviewModeProps) {
  const dispatch = useAppDispatch();
  const { locale } = useIntl();
  const nodes = useAppSelector(WorkflowSelectors.getNodes);
  const rootTopicId = useAppSelector(WorkflowSelectors.getRootTopicId);
  const weightedActivitiesIds = useAppSelector(
    WorkflowSelectors.getWeightedActivitiesIds,
  );
  const { course } = useAppSelector(SnapshotSelectors.getSnapshotData);
  const previewTimeZone = courseTimeZone || defaultCopiedCourseTimeZone;
  const targetRange = React.useMemo(
    () =>
      getTargetCourseRange({
        courseEndDate,
        courseStartDate,
        timezone: previewTimeZone,
      }),
    [courseEndDate, courseStartDate, previewTimeZone],
  );
  const previewScopeKey = React.useMemo(
    () => `${targetRange.startDate}:${targetRange.endDate}:${previewTimeZone}`,
    [previewTimeZone, targetRange.endDate, targetRange.startDate],
  );
  const generatedActivities = React.useMemo(
    () =>
      buildPreviewActivities({
        course,
        locale,
        nodes,
        rootTopicId,
        targetRange,
        timezone: previewTimeZone,
        weightedActivitiesIds,
      }),
    [
      course,
      locale,
      nodes,
      previewTimeZone,
      rootTopicId,
      targetRange,
      weightedActivitiesIds,
    ],
  );
  const [activityDateEdits, setActivityDateEdits] =
    React.useState<PreviewActivityDateEditsState>(() => ({
      edits: {},
      scopeKey: previewScopeKey,
    }));
  const [holidayDateEdits, setHolidayDateEdits] =
    React.useState<PreviewHolidayDateEditsState>(() => ({
      edits: {},
      scopeKey: previewScopeKey,
    }));
  const [customBreaks, setCustomBreaks] =
    React.useState<PreviewCustomBreaksState>(() => ({
      breaks: initialCourseBreaks,
      scopeKey: previewScopeKey,
    }));
  const [deletedBreaks, setDeletedBreaks] =
    React.useState<PreviewDeletedBreaksState>(() => ({
      breakIds: [],
      scopeKey: previewScopeKey,
    }));
  const [holidayPushedActivityIds, setHolidayPushedActivityIds] =
    React.useState<PreviewHolidayPushedActivityIdsState>(() => ({
      activityIds: [],
      scopeKey: previewScopeKey,
    }));
  const effectiveActivityDateEdits = React.useMemo(
    () =>
      activityDateEdits.scopeKey === previewScopeKey
        ? activityDateEdits.edits
        : {},
    [activityDateEdits, previewScopeKey],
  );
  const effectiveHolidayDateEdits = React.useMemo(
    () =>
      holidayDateEdits.scopeKey === previewScopeKey
        ? holidayDateEdits.edits
        : {},
    [holidayDateEdits, previewScopeKey],
  );
  const effectiveCustomBreaks = React.useMemo(
    () =>
      customBreaks.scopeKey === previewScopeKey ? customBreaks.breaks : [],
    [customBreaks, previewScopeKey],
  );
  const effectiveDeletedBreakIds = React.useMemo(
    () =>
      new Set(
        deletedBreaks.scopeKey === previewScopeKey
          ? deletedBreaks.breakIds
          : [],
      ),
    [deletedBreaks, previewScopeKey],
  );
  const effectiveHolidayPushedActivityIds = React.useMemo(
    () =>
      new Set(
        holidayPushedActivityIds.scopeKey === previewScopeKey
          ? holidayPushedActivityIds.activityIds
          : [],
      ),
    [holidayPushedActivityIds, previewScopeKey],
  );
  const baseCourseEntryBreaks = React.useMemo(
    () => (hasConfiguredCourseBreaks ? [] : defaultCourseEntryBreaks),
    [hasConfiguredCourseBreaks],
  );
  const previewCourseBreaks = React.useMemo(
    () => [
      ...baseCourseEntryBreaks.filter(
        (courseBreak) => !effectiveDeletedBreakIds.has(courseBreak.id),
      ),
      ...effectiveCustomBreaks.filter(
        (courseBreak) => !effectiveDeletedBreakIds.has(courseBreak.id),
      ),
    ],
    [baseCourseEntryBreaks, effectiveCustomBreaks, effectiveDeletedBreakIds],
  );
  const previewActivities = React.useMemo(
    () =>
      generatedActivities.map((activity) => ({
        ...activity,
        ...effectiveActivityDateEdits[activity.id],
      })),
    [effectiveActivityDateEdits, generatedActivities],
  );
  const previewHolidays = React.useMemo(
    () =>
      getPreviewSkippedHolidays({
        courseBreaks: previewCourseBreaks,
        holidayDateEdits: effectiveHolidayDateEdits,
        locale,
        targetRange,
        timezone: previewTimeZone,
      }),
    [
      effectiveHolidayDateEdits,
      locale,
      previewCourseBreaks,
      previewTimeZone,
      targetRange,
    ],
  );
  const previewActivitiesById = React.useMemo(
    () => new Map(previewActivities.map((activity) => [activity.id, activity])),
    [previewActivities],
  );
  const contentItems = React.useMemo(
    () =>
      buildPreviewContentItems({
        activitiesById: previewActivitiesById,
        nodes,
        rootTopicId,
      }),
    [nodes, previewActivitiesById, rootTopicId],
  );
  const weeks = React.useMemo(
    () =>
      groupPreviewActivitiesByWeek({
        activities: previewActivities,
        holidays: previewHolidays,
        locale,
        targetRange,
        timezone: previewTimeZone,
      }),
    [locale, previewActivities, previewHolidays, previewTimeZone, targetRange],
  );
  const [collapsedWeekIds, setCollapsedWeekIds] = React.useState<string[]>([]);
  const [dateEditor, setDateEditor] = React.useState<DateEditorState | null>(
    null,
  );
  const [previewView, setPreviewView] =
    React.useState<PreviewViewMode>(initialPreviewView);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = React.useState(
    () => initialScheduleDialogOpen,
  );
  const datePickerRef = React.useRef<HTMLDivElement>(null);
  const nextCustomBreakId = React.useRef(1);

  React.useEffect(() => {
    if (!dateEditor) {
      return;
    }

    const closeDatePickerOnOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        datePickerRef.current?.contains(event.target)
      ) {
        return;
      }

      setDateEditor(null);
    };
    const closeDatePickerOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDateEditor(null);
      }
    };

    document.addEventListener("mousedown", closeDatePickerOnOutsideClick);
    document.addEventListener("keydown", closeDatePickerOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeDatePickerOnOutsideClick);
      document.removeEventListener("keydown", closeDatePickerOnEscape);
    };
  }, [dateEditor]);

  const toggleWeek = (weekId: string) => {
    setCollapsedWeekIds((currentIds) =>
      currentIds.includes(weekId)
        ? currentIds.filter((currentId) => currentId !== weekId)
        : [...currentIds, weekId],
    );
  };

  const updateDateEditor = (updates: Partial<DateEditorState>) => {
    setDateEditor((currentEditor) =>
      currentEditor ? { ...currentEditor, ...updates } : currentEditor,
    );
  };

  const closeScheduleDialog = () => {
    setIsScheduleDialogOpen(false);
    onScheduleDialogClose?.();
  };

  const openDateEditor = (activity: PreviewActivity, target: HTMLElement) => {
    const pickerDate = DateTime.fromMillis(
      activity.dueDate ?? activity.placementDate,
      {
        zone: "UTC",
      },
    ).setZone(previewTimeZone);
    const pickerTime = activity.dueDate
      ? pickerDate.toFormat("h:mm a")
      : "11:59 PM";

    setDateEditor({
      anchor: getDatePickerAnchor(target),
      dueDate: getDatePickerIsoDate(pickerDate),
      dueTime: pickerTime,
      target: {
        activityId: activity.id,
        type: "activity",
      },
      title: activity.title,
      visibleMonth: getDatePickerIsoDate(pickerDate.startOf("month")),
    });
  };

  const openAvailableDateEditor = (
    activity: PreviewActivity,
    target: HTMLElement,
  ) => {
    const pickerDate = DateTime.fromMillis(
      activity.availableDate ?? activity.placementDate,
      {
        zone: "UTC",
      },
    ).setZone(previewTimeZone);
    const pickerTime = activity.availableDate
      ? pickerDate.toFormat("h:mm a")
      : "12:00 AM";

    setDateEditor({
      anchor: getDatePickerAnchor(target),
      dueDate: getDatePickerIsoDate(pickerDate),
      dueTime: pickerTime,
      target: {
        activityId: activity.id,
        type: "availableDate",
      },
      title: activity.title,
      visibleMonth: getDatePickerIsoDate(pickerDate.startOf("month")),
    });
  };

  const openHolidayDateEditor = (
    holiday: PreviewSkippedHoliday,
    target: HTMLElement,
  ) => {
    const pickerDate = DateTime.fromMillis(holiday.sortDate, {
      zone: "UTC",
    }).setZone(previewTimeZone);

    setDateEditor({
      anchor: getDatePickerAnchor(target),
      dueDate: getDatePickerIsoDate(pickerDate),
      target: {
        holidayId: holiday.id,
        type: "holiday",
      },
      title: holiday.name,
      visibleMonth: getDatePickerIsoDate(pickerDate.startOf("month")),
    });
  };

  const openNewBreakDateEditor = (target: HTMLElement) => {
    const pickerDate = DateTime.fromMillis(targetRange.startDate, {
      zone: "UTC",
    })
      .setZone(previewTimeZone)
      .startOf("day");
    const holidayId = `custom-break-${nextCustomBreakId.current}`;

    nextCustomBreakId.current += 1;
    setPreviewView("week");
    setDateEditor({
      anchor: getDatePickerAnchor(target, {
        estimatedHeight: breakDatePickerEstimatedHeight,
        width: breakDatePickerWidth,
      }),
      dueDate: formatBreakDateInput(pickerDate),
      endDate: "",
      target: {
        holidayId,
        type: "newHoliday",
      },
      title: customBreakName,
      visibleMonth: getDatePickerIsoDate(pickerDate.startOf("month")),
    });
  };

  const openScheduleDialogCustomBreakEditor = (target: HTMLElement) => {
    closeScheduleDialog();
    openNewBreakDateEditor(target);
  };

  const openScheduleDialogBreakEditor = (
    breakItem: CourseEntryBreak,
    target: HTMLElement,
  ) => {
    const breakHoliday = previewHolidays.find((holiday) =>
      isHolidayIdForCourseBreak(holiday.id, breakItem.id),
    );

    if (breakHoliday) {
      openHolidayDateEditor(breakHoliday, target);
    }
  };

  const updateDateEditorDate = (date: DateTime) => {
    setDateEditor((currentEditor) =>
      currentEditor
        ? {
            ...currentEditor,
            dueDate: getDatePickerIsoDate(date),
            visibleMonth: getDatePickerIsoDate(date.startOf("month")),
          }
        : currentEditor,
    );
  };

  const openBreakDatePicker = (field: BreakDateField) => {
    setDateEditor((currentEditor) => {
      if (!currentEditor || currentEditor.target.type !== "newHoliday") {
        return currentEditor;
      }

      const fallbackDate = getFallbackBreakDate(targetRange, previewTimeZone);
      const activeDateValue =
        field === "end"
          ? currentEditor.endDate || currentEditor.dueDate
          : currentEditor.dueDate;
      const activeDate = getBreakDateInputDate(
        activeDateValue,
        fallbackDate,
        previewTimeZone,
      );

      return {
        ...currentEditor,
        activeBreakDateField: field,
        visibleMonth: getDatePickerIsoDate(activeDate.startOf("month")),
      };
    });
  };

  const closeBreakDatePicker = () => {
    setDateEditor((currentEditor) =>
      currentEditor
        ? {
            ...currentEditor,
            activeBreakDateField: undefined,
          }
        : currentEditor,
    );
  };

  const updateBreakDateEditorDate = (date: DateTime) => {
    setDateEditor((currentEditor) => {
      if (
        !currentEditor ||
        currentEditor.target.type !== "newHoliday" ||
        !currentEditor.activeBreakDateField
      ) {
        return currentEditor;
      }

      const formattedDate = formatBreakDateInput(date);

      return {
        ...currentEditor,
        activeBreakDateField: undefined,
        dueDate:
          currentEditor.activeBreakDateField === "start"
            ? formattedDate
            : currentEditor.dueDate,
        endDate:
          currentEditor.activeBreakDateField === "end"
            ? formattedDate
            : currentEditor.endDate,
        visibleMonth: getDatePickerIsoDate(date.startOf("month")),
      };
    });
  };

  const updateDateEditorMonth = (monthOffset: number) => {
    setDateEditor((currentEditor) =>
      currentEditor
        ? {
            ...currentEditor,
            visibleMonth: getDatePickerIsoDate(
              DateTime.fromISO(currentEditor.visibleMonth, {
                zone: previewTimeZone,
              })
                .plus({ months: monthOffset })
                .startOf("month"),
            ),
          }
        : currentEditor,
    );
  };

  const updateDateEditorToToday = () => {
    updateDateEditorDate(
      DateTime.now().setZone(previewTimeZone).startOf("day"),
    );
  };

  const saveDateEditor = () => {
    if (!dateEditor) {
      return;
    }

    const editorTarget = dateEditor.target;

    if (editorTarget.type === "newHoliday") {
      const breakDateRange = getBreakDateRange({
        endDate: dateEditor.endDate,
        startDate: dateEditor.dueDate,
        timezone: previewTimeZone,
      });

      if (!breakDateRange) {
        return;
      }

      const holidayDates = getBreakDatesInRange(
        breakDateRange.startDate,
        breakDateRange.endDate,
      ).filter((holidayDate) => {
        const sortDate = holidayDate.toMillis();

        return (
          sortDate >= targetRange.startDate && sortDate <= targetRange.endDate
        );
      });

      if (!holidayDates.length) {
        return;
      }

      const breakName = dateEditor.title.trim() || customBreakName;
      const nextCustomBreaks = [
        ...effectiveCustomBreaks,
        ...holidayDates.map((holidayDate) => {
          const dateKey = getDatePickerIsoDate(holidayDate);

          return {
            dateText: holidayDate.toFormat("cccc, LLL d, yyyy", { locale }),
            id: `${editorTarget.holidayId}-${dateKey}`,
            name: breakName,
            startDate: formatBreakDateInput(holidayDate),
          };
        }),
      ];
      const nextHolidays = getPreviewSkippedHolidays({
        courseBreaks: [...baseCourseEntryBreaks, ...nextCustomBreaks],
        holidayDateEdits: effectiveHolidayDateEdits,
        locale,
        targetRange,
        timezone: previewTimeZone,
      });
      const holidayDateKeys = new Set(
        nextHolidays.map((holiday) =>
          getPreviewDateKeyFromMillis(holiday.sortDate, previewTimeZone),
        ),
      );
      const pushedActivityDateEdits = getActivityDateEditsForHolidayDates({
        activities: previewActivities,
        holidayDateKeys,
        holidayDates,
        locale,
        timezone: previewTimeZone,
      });

      setCustomBreaks({
        breaks: nextCustomBreaks,
        scopeKey: previewScopeKey,
      });
      setActivityDateEdits((currentEdits) => ({
        edits: {
          ...(currentEdits.scopeKey === previewScopeKey
            ? currentEdits.edits
            : {}),
          ...pushedActivityDateEdits,
        },
        scopeKey: previewScopeKey,
      }));
      setHolidayPushedActivityIds((currentIds) => ({
        activityIds: Array.from(
          new Set([
            ...(currentIds.scopeKey === previewScopeKey
              ? currentIds.activityIds
              : []),
            ...Object.keys(pushedActivityDateEdits),
          ]),
        ),
        scopeKey: previewScopeKey,
      }));
      setCollapsedWeekIds([]);
      setDateEditor(null);
      return;
    }

    if (editorTarget.type === "holiday") {
      const updatedHolidayDate = DateTime.fromISO(dateEditor.dueDate, {
        zone: previewTimeZone,
      }).startOf("day");

      if (!updatedHolidayDate.isValid) {
        return;
      }

      const nextCustomBreaks = effectiveCustomBreaks;
      const nextHolidayDateEdits = {
        ...effectiveHolidayDateEdits,
        [editorTarget.holidayId]: updatedHolidayDate.toMillis(),
      };
      const nextHolidays = getPreviewSkippedHolidays({
        courseBreaks: [...baseCourseEntryBreaks, ...nextCustomBreaks],
        holidayDateEdits: nextHolidayDateEdits,
        locale,
        targetRange,
        timezone: previewTimeZone,
      });
      const holidayDateKeys = new Set(
        nextHolidays.map((holiday) =>
          getPreviewDateKeyFromMillis(holiday.sortDate, previewTimeZone),
        ),
      );
      const pushedActivityDateEdits = getActivityDateEditsForHolidayDate({
        activities: previewActivities,
        holidayDate: updatedHolidayDate,
        holidayDateKeys,
        locale,
        timezone: previewTimeZone,
      });

      setCustomBreaks({
        breaks: nextCustomBreaks,
        scopeKey: previewScopeKey,
      });
      setHolidayDateEdits({
        edits: nextHolidayDateEdits,
        scopeKey: previewScopeKey,
      });
      setActivityDateEdits((currentEdits) => ({
        edits: {
          ...(currentEdits.scopeKey === previewScopeKey
            ? currentEdits.edits
            : {}),
          ...pushedActivityDateEdits,
        },
        scopeKey: previewScopeKey,
      }));
      setHolidayPushedActivityIds((currentIds) => ({
        activityIds: Array.from(
          new Set([
            ...(currentIds.scopeKey === previewScopeKey
              ? currentIds.activityIds
              : []),
            ...Object.keys(pushedActivityDateEdits),
          ]),
        ),
        scopeKey: previewScopeKey,
      }));
      setCollapsedWeekIds([]);
      setDateEditor(null);
      return;
    }

    if (editorTarget.type === "availableDate") {
      const updatedAvailableTime = normalizePreviewTime(
        dateEditor.dueTime || "12:00 AM",
        "12:00 AM",
      );
      const updatedAvailableDate = DateTime.fromFormat(
        `${dateEditor.dueDate} ${updatedAvailableTime}`,
        "yyyy-MM-dd h:mm a",
        { zone: previewTimeZone },
      );

      if (!updatedAvailableDate.isValid) {
        return;
      }

      const updatedAvailableTimestamp = updatedAvailableDate.toMillis();

      setActivityDateEdits((currentEdits) => {
        const scopedEdits =
          currentEdits.scopeKey === previewScopeKey ? currentEdits.edits : {};

        return {
          edits: {
            ...scopedEdits,
            [editorTarget.activityId]: {
              ...scopedEdits[editorTarget.activityId],
              availableDate: updatedAvailableTimestamp,
              availableText: formatPreviewAvailableDateText(
                updatedAvailableTimestamp,
                previewTimeZone,
                locale,
              ),
            },
          },
          scopeKey: previewScopeKey,
        };
      });
      setDateEditor(null);
      return;
    }

    const updatedDueTime = normalizeDueTime(dateEditor.dueTime || "11:59 PM");
    const updatedDueDate = DateTime.fromFormat(
      `${dateEditor.dueDate} ${updatedDueTime}`,
      "yyyy-MM-dd h:mm a",
      { zone: previewTimeZone },
    );

    if (!updatedDueDate.isValid) {
      return;
    }

    const updatedDueTimestamp = updatedDueDate.toMillis();
    const updatedDueText = formatPreviewDueText(
      updatedDueTimestamp,
      previewTimeZone,
      locale,
    );

    setActivityDateEdits((currentEdits) => {
      const scopedEdits =
        currentEdits.scopeKey === previewScopeKey ? currentEdits.edits : {};

      return {
        edits: {
          ...scopedEdits,
          [editorTarget.activityId]: {
            ...scopedEdits[editorTarget.activityId],
            dueDate: updatedDueTimestamp,
            dueText: updatedDueText,
            placementDate: updatedDueTimestamp,
          },
        },
        scopeKey: previewScopeKey,
      };
    });
    setHolidayPushedActivityIds((currentIds) => ({
      activityIds:
        currentIds.scopeKey === previewScopeKey
          ? currentIds.activityIds.filter(
              (activityId) => activityId !== editorTarget.activityId,
            )
          : [],
      scopeKey: previewScopeKey,
    }));
    setCollapsedWeekIds([]);
    setDateEditor(null);
  };

  const deletePreviewBreak = (holiday: PreviewSkippedHoliday) => {
    const breakId = getCourseBreakIdForHoliday(holiday.id, previewCourseBreaks);

    if (!breakId) {
      return;
    }

    const nextCustomBreaks = effectiveCustomBreaks.filter(
      (courseBreak) => courseBreak.id !== breakId,
    );
    const nextDeletedBreakIds = new Set(effectiveDeletedBreakIds);

    if (
      baseCourseEntryBreaks.some((courseBreak) => courseBreak.id === breakId)
    ) {
      nextDeletedBreakIds.add(breakId);
    }

    const nextHolidayDateEdits = Object.fromEntries(
      Object.entries(effectiveHolidayDateEdits).filter(
        ([holidayId]) => !isHolidayIdForCourseBreak(holidayId, breakId),
      ),
    );
    const deletedHolidayDateKey = getPreviewDateKeyFromMillis(
      holiday.sortDate,
      previewTimeZone,
    );
    const activityIdsToClear = new Set(
      generatedActivities
        .filter((activity) => {
          if (
            !activity.dueDate ||
            !effectiveHolidayPushedActivityIds.has(activity.id)
          ) {
            return false;
          }

          return (
            getPreviewDateKeyFromMillis(activity.dueDate, previewTimeZone) ===
            deletedHolidayDateKey
          );
        })
        .map((activity) => activity.id),
    );

    setCustomBreaks({
      breaks: nextCustomBreaks,
      scopeKey: previewScopeKey,
    });
    setDeletedBreaks({
      breakIds: Array.from(nextDeletedBreakIds),
      scopeKey: previewScopeKey,
    });
    setHolidayDateEdits({
      edits: nextHolidayDateEdits,
      scopeKey: previewScopeKey,
    });
    setActivityDateEdits((currentEdits) => {
      const scopedEdits =
        currentEdits.scopeKey === previewScopeKey ? currentEdits.edits : {};
      const nextActivityDateEdits = { ...scopedEdits };

      activityIdsToClear.forEach((activityId) => {
        delete nextActivityDateEdits[activityId];
      });

      return {
        edits: nextActivityDateEdits,
        scopeKey: previewScopeKey,
      };
    });
    setHolidayPushedActivityIds((currentIds) => ({
      activityIds:
        currentIds.scopeKey === previewScopeKey
          ? currentIds.activityIds.filter(
              (activityId) => !activityIdsToClear.has(activityId),
            )
          : [],
      scopeKey: previewScopeKey,
    }));
    setDateEditor((currentEditor) =>
      currentEditor?.target.type === "holiday" &&
      isHolidayIdForCourseBreak(currentEditor.target.holidayId, breakId)
        ? null
        : currentEditor,
    );
    setCollapsedWeekIds([]);
  };

  const applyPreviewDates = () => {
    dispatch(
      WorkflowActions.applyCourseEntryPreviewDates({
        activityDateUpdates: getPreviewActivityDateUpdates(previewActivities),
        courseEndDate: targetRange.endDate,
        courseStartDate: targetRange.startDate,
      }),
    );
    onApply();
  };

  return (
    <CoursePreviewShell aria-label="Course Preview" role="region">
      <CoursePreviewHeader>
        <CoursePreviewHeaderStart>
          <CoursePreviewHeaderSummary>
            <CoursePreviewHeaderCopy>
              <CoursePreviewHeaderTitle>
                Date Management Preview
              </CoursePreviewHeaderTitle>
              <CoursePreviewHeaderDescription>
                Review the date changes below. Then, click Apply to set all
                dates on the Learning Path.
              </CoursePreviewHeaderDescription>
            </CoursePreviewHeaderCopy>
          </CoursePreviewHeaderSummary>
        </CoursePreviewHeaderStart>
        <CoursePreviewHeaderActions>
          <CoursePreviewActionButton onClick={onClose} type="button">
            Close
          </CoursePreviewActionButton>
          <CoursePreviewActionButton
            data-variant="apply"
            onClick={applyPreviewDates}
            type="button"
          >
            Apply
          </CoursePreviewActionButton>
        </CoursePreviewHeaderActions>
      </CoursePreviewHeader>
      <CoursePreviewToolbar>
        <CoursePreviewToolbarStart>
          <CoursePreviewModeIndicator>
            <PreviewIcon aria-hidden size={16} />
            Preview
          </CoursePreviewModeIndicator>
          <CoursePreviewActionButton
            data-size="small"
            onClick={(event) => openNewBreakDateEditor(event.currentTarget)}
            type="button"
          >
            <AddIcon aria-hidden size={14} />
            Add Break / No Class
          </CoursePreviewActionButton>
        </CoursePreviewToolbarStart>
        <CoursePreviewViewTabs aria-label="Preview view" role="tablist">
          <CoursePreviewViewTabsLabel>View:</CoursePreviewViewTabsLabel>
          <CoursePreviewViewButton
            aria-label="List View"
            aria-selected={previewView === "list"}
            color={ButtonColor.subtle}
            icon={<ListIcon />}
            onClick={() => setPreviewView("list")}
            role="tab"
            shape={ButtonShape.fill}
            size={ButtonSize.small}
            title="List View"
          />
          <CoursePreviewViewButton
            aria-label="Week View"
            aria-selected={previewView === "week"}
            color={ButtonColor.subtle}
            icon={<CalendarTodayIcon />}
            onClick={() => setPreviewView("week")}
            role="tab"
            shape={ButtonShape.fill}
            size={ButtonSize.small}
            title="Week View"
          />
        </CoursePreviewViewTabs>
      </CoursePreviewToolbar>
      <CoursePreviewBody>
        {previewView === "list" ? (
          <PreviewCourseContentList
            items={contentItems}
            onOpenAvailableDateEditor={openAvailableDateEditor}
            onOpenDateEditor={openDateEditor}
          />
        ) : (
          weeks.map((week) => {
            const isExpanded = !collapsedWeekIds.includes(week.id);

            return (
              <CoursePreviewWeek key={week.id}>
                <CoursePreviewWeekHeader
                  aria-expanded={isExpanded}
                  onClick={() => toggleWeek(week.id)}
                  type="button"
                >
                  <span>
                    <ExpandMoreIcon aria-hidden size={20} />
                    <CoursePreviewWeekTitle>
                      <CoursePreviewWeekLabel>
                        {week.label}
                      </CoursePreviewWeekLabel>
                      <CoursePreviewWeekDates>
                        {week.dateRange}
                      </CoursePreviewWeekDates>
                    </CoursePreviewWeekTitle>
                  </span>
                  <CoursePreviewActivityCount>
                    {week.activityCount}
                  </CoursePreviewActivityCount>
                </CoursePreviewWeekHeader>
                {isExpanded && (
                  <PreviewWeekDueDateListView
                    onDeleteHoliday={deletePreviewBreak}
                    onOpenAvailableDateEditor={openAvailableDateEditor}
                    onOpenHolidayDateEditor={openHolidayDateEditor}
                    onOpenDateEditor={openDateEditor}
                    week={week}
                  />
                )}
              </CoursePreviewWeek>
            );
          })
        )}
      </CoursePreviewBody>
      {isScheduleDialogOpen && (
        <ScheduleBreaksModal
          courseBreaks={previewCourseBreaks}
          onAddCustomBreak={openScheduleDialogCustomBreakEditor}
          onSaveCustomBreak={(breakItem) =>
            setCustomBreaks((currentBreaks) => ({
              breaks: [...(currentBreaks.scopeKey === previewScopeKey ? currentBreaks.breaks : []), breakItem],
              scopeKey: previewScopeKey,
            }))
          }
          onClose={closeScheduleDialog}
          onEditBreak={openScheduleDialogBreakEditor}
          timezone={previewTimeZone}
        />
      )}
      {dateEditor &&
        (dateEditor.target.type === "newHoliday" ? (
          <CoursePreviewBreakDatePicker
            aria-label={`Add break/no class date for ${
              dateEditor.title.trim() || customBreakName
            }`}
            ref={datePickerRef}
            role="dialog"
            style={{
              left: dateEditor.anchor.left,
              top: dateEditor.anchor.top,
            }}
          >
            <CoursePreviewBreakDatePickerPanel>
              <CoursePreviewBreakDateFields>
                <CoursePreviewBreakDateField>
                  Break Name
                  <CoursePreviewBreakDateInputShell>
                    <CoursePreviewBreakDateInput
                      aria-label="Break Name"
                      onChange={(event) =>
                        updateDateEditor({ title: event.target.value })
                      }
                      placeholder={customBreakName}
                      value={dateEditor.title}
                    />
                  </CoursePreviewBreakDateInputShell>
                </CoursePreviewBreakDateField>
                <CoursePreviewBreakDateField>
                  Start Date
                  <CoursePreviewBreakDateInputShell>
                    <CoursePreviewBreakDateInput
                      aria-label="Start Date"
                      onChange={(event) =>
                        updateDateEditor({ dueDate: event.target.value })
                      }
                      placeholder="mm/dd/yyyy"
                      value={dateEditor.dueDate}
                    />
                    <CoursePreviewBreakDateIconButton
                      aria-label="Open start date picker"
                      onClick={() => openBreakDatePicker("start")}
                      type="button"
                    >
                      <CalendarTodayIcon aria-hidden size={22} />
                    </CoursePreviewBreakDateIconButton>
                  </CoursePreviewBreakDateInputShell>
                </CoursePreviewBreakDateField>
                <CoursePreviewBreakDateField>
                  End Date
                  <CoursePreviewBreakDateInputShell>
                    <CoursePreviewBreakDateInput
                      aria-label="End Date"
                      onChange={(event) =>
                        updateDateEditor({ endDate: event.target.value })
                      }
                      placeholder="mm/dd/yyyy"
                      value={dateEditor.endDate || ""}
                    />
                    {dateEditor.endDate && (
                      <CoursePreviewBreakDateIconButton
                        aria-label="Clear end date"
                        onClick={() =>
                          updateDateEditor({
                            activeBreakDateField: undefined,
                            endDate: "",
                          })
                        }
                        type="button"
                      >
                        <CloseIcon aria-hidden size={18} />
                      </CoursePreviewBreakDateIconButton>
                    )}
                    <CoursePreviewBreakDateIconButton
                      aria-label="Open end date picker"
                      onClick={() => openBreakDatePicker("end")}
                      type="button"
                    >
                      <CalendarTodayIcon aria-hidden size={22} />
                    </CoursePreviewBreakDateIconButton>
                  </CoursePreviewBreakDateInputShell>
                </CoursePreviewBreakDateField>
              </CoursePreviewBreakDateFields>
              {dateEditor.activeBreakDateField && (
                <CoursePreviewBreakDatePickerCalendar
                  aria-label={`${
                    dateEditor.activeBreakDateField === "start"
                      ? "Start"
                      : "End"
                  } Date calendar`}
                  role="group"
                >
                  <CoursePreviewDatePickerHeader>
                    <span>
                      <CalendarTodayIcon aria-hidden size={18} />
                      <CoursePreviewDatePickerToday
                        onClick={() =>
                          updateBreakDateEditorDate(
                            DateTime.now()
                              .setZone(previewTimeZone)
                              .startOf("day"),
                          )
                        }
                        type="button"
                      >
                        Today
                      </CoursePreviewDatePickerToday>
                    </span>
                    <CoursePreviewDatePickerIconButton
                      aria-label="Close date picker"
                      onClick={closeBreakDatePicker}
                      type="button"
                    >
                      <CloseIcon aria-hidden size={18} />
                    </CoursePreviewDatePickerIconButton>
                  </CoursePreviewDatePickerHeader>
                  <CoursePreviewDatePickerNav>
                    <span>
                      <CoursePreviewDatePickerMonthLabel>
                        {DateTime.fromISO(dateEditor.visibleMonth, {
                          zone: previewTimeZone,
                        }).toFormat("LLLL", { locale })}
                      </CoursePreviewDatePickerMonthLabel>
                      <CoursePreviewDatePickerMonthLabel>
                        {DateTime.fromISO(dateEditor.visibleMonth, {
                          zone: previewTimeZone,
                        }).toFormat("yyyy", { locale })}
                      </CoursePreviewDatePickerMonthLabel>
                    </span>
                    <span>
                      <CoursePreviewDatePickerIconButton
                        aria-label="Previous month"
                        onClick={() => updateDateEditorMonth(-1)}
                        type="button"
                      >
                        <KeyboardArrowLeftIcon aria-hidden size={22} />
                      </CoursePreviewDatePickerIconButton>
                      <CoursePreviewDatePickerIconButton
                        aria-label="Next month"
                        onClick={() => updateDateEditorMonth(1)}
                        type="button"
                      >
                        <KeyboardArrowRightIcon aria-hidden size={22} />
                      </CoursePreviewDatePickerIconButton>
                    </span>
                  </CoursePreviewDatePickerNav>
                  <CoursePreviewDatePickerCalendar>
                    {calendarWeekdays.map((weekday) => (
                      <CoursePreviewDatePickerDay key={weekday}>
                        {weekday}
                      </CoursePreviewDatePickerDay>
                    ))}
                    {getCalendarDateCells({
                      selectedDate: getDatePickerIsoDate(
                        getBreakDatePickerSelectedDate({
                          dateEditor,
                          targetRange,
                          timezone: previewTimeZone,
                        }),
                      ),
                      timezone: previewTimeZone,
                      visibleMonth: dateEditor.visibleMonth,
                    }).map((day) => (
                      <CoursePreviewDatePickerCell
                        key={day.date.toISODate() || day.date.toMillis()}
                      >
                        <CoursePreviewDatePickerDateButton
                          aria-label={`Select ${formatCalendarDateLabel(
                            day.date,
                            locale,
                          )}`}
                          data-marker={day.isToday || undefined}
                          data-muted={!day.isCurrentMonth || undefined}
                          data-selected={day.isSelected || undefined}
                          onClick={() => updateBreakDateEditorDate(day.date)}
                          type="button"
                        >
                          {day.date.toFormat("d", { locale })}
                        </CoursePreviewDatePickerDateButton>
                      </CoursePreviewDatePickerCell>
                    ))}
                  </CoursePreviewDatePickerCalendar>
                </CoursePreviewBreakDatePickerCalendar>
              )}
              <CoursePreviewBreakDateActions>
                <CoursePreviewBreakDateCancel
                  onClick={() => setDateEditor(null)}
                  type="button"
                >
                  Cancel
                </CoursePreviewBreakDateCancel>
                <CoursePreviewBreakDateSave
                  onClick={saveDateEditor}
                  type="button"
                >
                  Save
                </CoursePreviewBreakDateSave>
              </CoursePreviewBreakDateActions>
            </CoursePreviewBreakDatePickerPanel>
          </CoursePreviewBreakDatePicker>
        ) : (
          <CoursePreviewDatePicker
            aria-label={`Update ${
              dateEditor.target.type === "holiday"
                ? "holiday date"
                : dateEditor.target.type === "availableDate"
                  ? "unlock date"
                  : "due date"
            } for ${dateEditor.title}`}
            ref={datePickerRef}
            role="dialog"
            style={{
              left: dateEditor.anchor.left,
              top: dateEditor.anchor.top,
            }}
          >
            <CoursePreviewDatePickerHeader>
              <span>
                <CalendarTodayIcon aria-hidden size={18} />
                <CoursePreviewDatePickerToday
                  onClick={updateDateEditorToToday}
                  type="button"
                >
                  Today
                </CoursePreviewDatePickerToday>
              </span>
              <CoursePreviewDatePickerIconButton
                aria-label="Close date picker"
                onClick={() => setDateEditor(null)}
                type="button"
              >
                <CloseIcon aria-hidden size={18} />
              </CoursePreviewDatePickerIconButton>
            </CoursePreviewDatePickerHeader>
            <CoursePreviewDatePickerNav>
              <span>
                <CoursePreviewDatePickerMonthLabel>
                  {DateTime.fromISO(dateEditor.visibleMonth, {
                    zone: previewTimeZone,
                  }).toFormat("LLLL", { locale })}
                </CoursePreviewDatePickerMonthLabel>
                <CoursePreviewDatePickerMonthLabel>
                  {DateTime.fromISO(dateEditor.visibleMonth, {
                    zone: previewTimeZone,
                  }).toFormat("yyyy", { locale })}
                </CoursePreviewDatePickerMonthLabel>
              </span>
              <span>
                <CoursePreviewDatePickerIconButton
                  aria-label="Previous month"
                  onClick={() => updateDateEditorMonth(-1)}
                  type="button"
                >
                  <KeyboardArrowLeftIcon aria-hidden size={22} />
                </CoursePreviewDatePickerIconButton>
                <CoursePreviewDatePickerIconButton
                  aria-label="Next month"
                  onClick={() => updateDateEditorMonth(1)}
                  type="button"
                >
                  <KeyboardArrowRightIcon aria-hidden size={22} />
                </CoursePreviewDatePickerIconButton>
              </span>
            </CoursePreviewDatePickerNav>
            <CoursePreviewDatePickerCalendar>
              {calendarWeekdays.map((weekday) => (
                <CoursePreviewDatePickerDay key={weekday}>
                  {weekday}
                </CoursePreviewDatePickerDay>
              ))}
              {getCalendarDateCells({
                selectedDate: dateEditor.dueDate,
                timezone: previewTimeZone,
                visibleMonth: dateEditor.visibleMonth,
              }).map((day) => (
                <CoursePreviewDatePickerCell
                  key={day.date.toISODate() || day.date.toMillis()}
                >
                  <CoursePreviewDatePickerDateButton
                    aria-label={`Select ${formatCalendarDateLabel(
                      day.date,
                      locale,
                    )}`}
                    data-marker={day.isToday || undefined}
                    data-muted={!day.isCurrentMonth || undefined}
                    data-selected={day.isSelected || undefined}
                    onClick={() => updateDateEditorDate(day.date)}
                    type="button"
                  >
                    {day.date.toFormat("d", { locale })}
                  </CoursePreviewDatePickerDateButton>
                </CoursePreviewDatePickerCell>
              ))}
            </CoursePreviewDatePickerCalendar>
            {(dateEditor.target.type === "activity" ||
              dateEditor.target.type === "availableDate") && (
              <CoursePreviewDatePickerTimeRow>
                <span>Time</span>
                <CoursePreviewDatePickerTimeField>
                  <AccessTimeIcon aria-hidden size={18} />
                  <CoursePreviewDatePickerTimeInput
                    aria-label="Time"
                    onChange={(event) =>
                      updateDateEditor({ dueTime: event.target.value })
                    }
                    value={dateEditor.dueTime || ""}
                  />
                </CoursePreviewDatePickerTimeField>
              </CoursePreviewDatePickerTimeRow>
            )}
            <CoursePreviewDatePickerFooter>
              <CoursePreviewDatePickerDone
                onClick={saveDateEditor}
                type="button"
              >
                Done
              </CoursePreviewDatePickerDone>
            </CoursePreviewDatePickerFooter>
          </CoursePreviewDatePicker>
        ))}
    </CoursePreviewShell>
  );
}

function PreviewCourseContentList({
  items,
  onOpenAvailableDateEditor,
  onOpenDateEditor,
}: {
  items: PreviewContentItem[];
  onOpenAvailableDateEditor: (
    activity: PreviewActivity,
    target: HTMLElement,
  ) => void;
  onOpenDateEditor: (activity: PreviewActivity, target: HTMLElement) => void;
}) {
  const [collapsedTopicIds, setCollapsedTopicIds] = React.useState<string[]>(
    [],
  );
  const collapsedTopicIdsSet = React.useMemo(
    () => new Set(collapsedTopicIds),
    [collapsedTopicIds],
  );
  const contentRows = React.useMemo(
    () => flattenPreviewContentItems(items, collapsedTopicIdsSet),
    [collapsedTopicIdsSet, items],
  );
  const toggleTopic = (topicId: string) => {
    setCollapsedTopicIds((currentIds) =>
      currentIds.includes(topicId)
        ? currentIds.filter((currentId) => currentId !== topicId)
        : [...currentIds, topicId],
    );
  };

  return (
    <CoursePreviewContentList aria-label="Course content" role="list">
      {contentRows.map((item) => (
        <PreviewCourseContentItem
          isCollapsed={
            item.type === "topic" && collapsedTopicIdsSet.has(item.id)
          }
          item={item}
          key={item.id}
          onOpenAvailableDateEditor={onOpenAvailableDateEditor}
          onOpenDateEditor={onOpenDateEditor}
          onToggleTopic={toggleTopic}
        />
      ))}
    </CoursePreviewContentList>
  );
}

function PreviewCourseContentItem({
  isCollapsed,
  item,
  onOpenAvailableDateEditor,
  onOpenDateEditor,
  onToggleTopic,
}: {
  isCollapsed?: boolean;
  item: PreviewContentItem;
  onOpenAvailableDateEditor: (
    activity: PreviewActivity,
    target: HTMLElement,
  ) => void;
  onOpenDateEditor: (activity: PreviewActivity, target: HTMLElement) => void;
  onToggleTopic: (topicId: string) => void;
}) {
  const indentStyle = {
    "--preview-content-indent": `${getPreviewContentIndent(item)}px`,
  } as React.CSSProperties;

  if (item.type === "activity") {
    return (
      <CoursePreviewContentActivity role="listitem" style={indentStyle}>
        <PreviewItem
          activity={item.activity}
          onOpenAvailableDateEditor={onOpenAvailableDateEditor}
          onOpenDateEditor={onOpenDateEditor}
        />
      </CoursePreviewContentActivity>
    );
  }

  const isExpanded = !isCollapsed;

  return (
    <CoursePreviewContentTopic
      data-depth={item.depth}
      role="listitem"
      style={indentStyle}
    >
      <CoursePreviewContentTopicHeader
        aria-expanded={isExpanded}
        onClick={() => onToggleTopic(item.id)}
        type="button"
      >
        <CoursePreviewContentTopicTitle>
          <ExpandMoreIcon aria-hidden size={20} />
          <span dangerouslySetInnerHTML={{ __html: item.title }} />
        </CoursePreviewContentTopicTitle>
        <CoursePreviewContentTopicCount>
          {item.activityCount}
        </CoursePreviewContentTopicCount>
      </CoursePreviewContentTopicHeader>
    </CoursePreviewContentTopic>
  );
}

function PreviewWeekDueDateListView({
  onDeleteHoliday,
  onOpenAvailableDateEditor,
  onOpenHolidayDateEditor,
  onOpenDateEditor,
  week,
}: {
  onDeleteHoliday: (holiday: PreviewSkippedHoliday) => void;
  onOpenAvailableDateEditor: (
    activity: PreviewActivity,
    target: HTMLElement,
  ) => void;
  onOpenHolidayDateEditor: (
    holiday: PreviewSkippedHoliday,
    target: HTMLElement,
  ) => void;
  onOpenDateEditor: (activity: PreviewActivity, target: HTMLElement) => void;
  week: PreviewWeek;
}) {
  if (week.dateGroups.length === 0) {
    return null;
  }

  return (
    <CoursePreviewWeekDateGroups
      aria-label={`${week.label} week view`}
      role="group"
    >
      {week.dateGroups.map((dateGroup) => (
        <CoursePreviewDateGroup key={dateGroup.id}>
          <CoursePreviewDateHeader>
            <CoursePreviewDateText>
              <CoursePreviewDateNumber>{dateGroup.day}</CoursePreviewDateNumber>
              <CoursePreviewDateDay>{dateGroup.weekday}</CoursePreviewDateDay>
            </CoursePreviewDateText>
          </CoursePreviewDateHeader>
          <CoursePreviewIndentedGroup>
            {dateGroup.holidays.map((holiday) => (
              <PreviewSkippedHolidayItem
                holiday={holiday}
                key={holiday.id}
                onDeleteHoliday={onDeleteHoliday}
                onOpenHolidayDateEditor={onOpenHolidayDateEditor}
              />
            ))}
            {dateGroup.activities.map((activity) => (
              <PreviewItem
                activity={activity}
                key={activity.id}
                onOpenAvailableDateEditor={onOpenAvailableDateEditor}
                onOpenDateEditor={onOpenDateEditor}
              />
            ))}
          </CoursePreviewIndentedGroup>
        </CoursePreviewDateGroup>
      ))}
    </CoursePreviewWeekDateGroups>
  );
}

function PreviewSkippedHolidayItem({
  holiday,
  onDeleteHoliday,
  onOpenHolidayDateEditor,
}: {
  holiday: PreviewSkippedHoliday;
  onDeleteHoliday: (holiday: PreviewSkippedHoliday) => void;
  onOpenHolidayDateEditor: (
    holiday: PreviewSkippedHoliday,
    target: HTMLElement,
  ) => void;
}) {
  return (
    <CoursePreviewSkippedHoliday
      aria-label={`${holiday.name} skipped holiday or break`}
    >
      <CoursePreviewSkippedHolidayIcon>
        <CalendarTodayIcon aria-hidden size={24} />
      </CoursePreviewSkippedHolidayIcon>
      <CoursePreviewSkippedHolidayContent>
        <CoursePreviewSkippedHolidayTitle>
          {holiday.name}
        </CoursePreviewSkippedHolidayTitle>
        <CoursePreviewSkippedHolidayDateButton
          aria-haspopup="dialog"
          onClick={(event) =>
            onOpenHolidayDateEditor(holiday, event.currentTarget)
          }
          type="button"
        >
          {holiday.dateText}
        </CoursePreviewSkippedHolidayDateButton>
      </CoursePreviewSkippedHolidayContent>
      <CoursePreviewSkippedHolidayDeleteButton
        aria-label={`Delete ${holiday.name}`}
        onClick={() => onDeleteHoliday(holiday)}
        type="button"
      >
        <DeleteIcon aria-hidden size={20} />
      </CoursePreviewSkippedHolidayDeleteButton>
    </CoursePreviewSkippedHoliday>
  );
}

function PreviewItem({
  activity,
  onOpenAvailableDateEditor,
  onOpenDateEditor,
}: {
  activity: PreviewActivity;
  onOpenAvailableDateEditor?: (
    activity: PreviewActivity,
    target: HTMLElement,
  ) => void;
  onOpenDateEditor?: (activity: PreviewActivity, target: HTMLElement) => void;
}) {
  const isReading = activity.type === "reading";
  const hasDueDate = !!activity.dueDate;

  return (
    <CoursePreviewItem data-type={activity.type}>
      <CoursePreviewItemIcon>
        {isReading ? (
          <BookIcon aria-hidden size={24} />
        ) : (
          <AssessmentIcon aria-hidden size={24} />
        )}
      </CoursePreviewItemIcon>
      <CoursePreviewItemBody>
        <CoursePreviewItemMain>
          <CoursePreviewItemContent>
            <CoursePreviewItemTitle>{activity.title}</CoursePreviewItemTitle>
            <CoursePreviewDueDateButton
              aria-haspopup="dialog"
              data-muted={!hasDueDate || undefined}
              onClick={(event) =>
                onOpenDateEditor?.(activity, event.currentTarget)
              }
              type="button"
            >
              {activity.dueText}
            </CoursePreviewDueDateButton>
            {activity.gradingText && (
              <CoursePreviewActivityType>
                {activity.gradingText}
              </CoursePreviewActivityType>
            )}
          </CoursePreviewItemContent>
          {activity.availableText ? (
            <CoursePreviewItemAvailability>
              <LockIcon aria-hidden size={20} />
              <CoursePreviewItemAvailabilityLink
                aria-haspopup="dialog"
                aria-label={`Edit unlock date for ${activity.title}. Unlocks ${activity.availableText.date} at ${activity.availableText.time}`}
                onClick={(event) =>
                  onOpenAvailableDateEditor?.(activity, event.currentTarget)
                }
                type="button"
              >
                <CoursePreviewItemAvailabilityText>
                  <span>Unlocks {activity.availableText.date}</span>
                  <span>@ {activity.availableText.time}</span>
                </CoursePreviewItemAvailabilityText>
              </CoursePreviewItemAvailabilityLink>
            </CoursePreviewItemAvailability>
          ) : null}
          {activity.points !== undefined ? (
            <CoursePreviewPoints>
              <strong>{activity.points}</strong>
              <span>points</span>
            </CoursePreviewPoints>
          ) : null}
        </CoursePreviewItemMain>
        {activity.description ? (
          <CoursePreviewItemDescription
            dangerouslySetInnerHTML={{ __html: activity.description }}
          />
        ) : null}
      </CoursePreviewItemBody>
    </CoursePreviewItem>
  );
}
