import { DateTime } from "luxon";
import * as React from "react";
import { DatePicker } from "react-magma-dom";
import {
  AddIcon,
  AppsIcon,
  BookIcon,
  CloseIcon,
  EditIcon,
  HelpIcon,
  HomeIcon,
  InfoIcon,
  SettingsIcon,
} from "react-magma-icons";

import {
  APP_PAGES,
  COURSE_ENTRY_BREAKS_PARAM,
  COURSE_ENTRY_END_DATE_PARAM,
  COURSE_ENTRY_PREVIEW_VIEW_PARAM,
  COURSE_ENTRY_PREVIEW_VIEW_WEEK,
  COURSE_ENTRY_SCHEDULE_DIALOG_OPEN,
  COURSE_ENTRY_SCHEDULE_DIALOG_PARAM,
  COURSE_ENTRY_SETUP_PARAM,
  COURSE_ENTRY_SETUP_PREVIEW,
  COURSE_ENTRY_START_DATE_PARAM,
  COURSE_ENTRY_TIME_ZONE_PARAM,
} from "../../constants/routingConstants.ts";
import { useAppNavigate } from "../../hooks/routerHooks.ts";
import type { CourseEntryBreak } from "../learning-path/courseEntryBreaks.ts";
import {
  CanvasBackButton,
  CanvasCourseCover,
  CanvasCourseNav,
  CanvasCourseNavItem,
  CanvasCourseNavList,
  CanvasExitButton,
  CanvasFilterButton,
  CanvasFlowContent,
  CanvasFlowHeading,
  CanvasFooterBar,
  CanvasFormatCard,
  CanvasFormatCopy,
  CanvasFormatGraphic,
  CanvasFormatGrid,
  CanvasGlobalNav,
  CanvasGlobalNavItem,
  CanvasInfoBanner,
  CanvasIntegrationOption,
  CanvasIntegrationOptions,
  CanvasMain,
  CanvasPrimaryActionButton,
  CanvasRadio,
  CanvasSearchInput,
  CanvasSearchRow,
  CanvasSelectContentCard,
  CanvasSelectContentFooter,
  CanvasSelectContentRow,
  CanvasSelectContentToolbar,
  CanvasSelectedCourseHero,
  CanvasSelectedCoursePanel,
  CanvasShell,
  CanvasSourceCourseCell,
  CanvasSourceCourseHeader,
  CanvasSourceCourseOption,
  CanvasSourceCourseTable,
  CanvasTitleCard,
  CanvasTitleList,
  CanvasTitleMeta,
  CanvasTitleOption,
  CengageAppHeader,
  CengageAppShell,
  CengageFormatHero,
  CengageFormatLanding,
  CengageHeroLogo,
  CengageLogo,
  CengageStep,
  CengageStepCircle,
  CengageStepper,
  CourseDetailsField,
  CourseDetailsGrid,
  CourseDetailsPanel,
  CourseDetailsSection,
  IntegratedActionButton,
  IntegratedActionRow,
  IntegratedSuccessIcon,
  IntegratedSuccessView,
  DialogCloseButton,
  DialogPrimaryButton,
  MeetingDayButton,
  MeetingDaysGrid,
  MobileWarning,
  ModalScrim,
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
  ScheduleBreakEditNameField,
  ScheduleBreakEditNameInput,
  ScheduleBreakEditSaveButton,
  ScheduleBreaksDialog,
  ScheduleContent,
  ScheduleCustomBreakActions,
  ScheduleCustomBreakButton,
  ScheduleCustomBreakDateField,
  ScheduleCustomBreakDateFields,
  ScheduleCustomBreakDateInput,
  ScheduleCustomBreakDatePickerIconButton,
  ScheduleCustomBreakPanel,
  ScheduleCustomBreakSaveButton,
  ScheduleFooter,
  ScheduleHeader,
  ScheduleIntro,
  ScheduleSection,
  ScheduleSectionTitle,
} from "./InstructorCenterFlow.styled.ts";

type DialogState = "schedule" | null;
type CanvasCopyStep =
  | "format"
  | "title"
  | "option"
  | "details"
  | "integrated"
  | "content";
type CanvasCourseFormatId = "platform" | "ebook" | "infuse";
type CanvasCourseFormat = {
  buttonLabel: string;
  description: string;
  id: CanvasCourseFormatId;
  title: string;
};
type CanvasSourceCourse = {
  endDate: string;
  id: string;
  name: string;
  startDate: string;
};
type CanvasCourseTitle = {
  authors: string;
  coverLabel: string;
  edition: string;
  id: string;
  isbn13: string;
  productIsbn: string;
  productLabel: string;
  title: string;
};
type IntegrationOption = "new" | "copy";
type CourseDetailsDraft = {
  courseName: string;
  endDate: string;
  startDate: string;
  timeZone: string;
};
type ScheduleBreak = {
  date: string;
  endDate?: string;
  id: string;
  name: string;
  startDate?: string;
};
type ScheduleBreakCalendarCell = {
  breakNames: string[];
  date: DateTime;
  id: string;
  isCurrentMonth: boolean;
  isSelectedBreakDay: boolean;
};
type ScheduleBreakCalendarMonthView = {
  cells: ScheduleBreakCalendarCell[];
  id: string;
  monthLabel: string;
  yearLabel: string;
};
type ScheduleBreakCalendarBreakView = {
  breakItem: ScheduleBreak;
  id: string;
  months: ScheduleBreakCalendarMonthView[];
};
type ScheduleBreakEditDraft = {
  breakId: string;
  endDate: string;
  name: string;
  startDate: string;
};
type ScheduleCustomBreakDraft = {
  endDate: string;
  name: string;
  startDate: string;
};

const copiedCourseStartDate = "08/03/2026";
const copiedCourseEndDate = "12/18/2026";
const copiedSectionTimeZone = "America/Denver";
const copiedSectionTimeZoneLabel =
  "(-07:00) Mountain Time - Denver, El Paso, Albuquerque, Colorado Springs - (MST)";
const copiedCanvasCourseSectionName = "Section B";
const getCopiedCanvasCourseName = (courseTitle: CanvasCourseTitle) =>
  `${courseTitle.title} - ${copiedCanvasCourseSectionName}`;
const defaultCustomBreakName = "Custom Break";
const customBreakDatePickerInputStyle = {
  borderRadius: 8,
  height: 40,
  width: "100%",
} as const;
const customBreakDatePickerContainerStyle = {
  width: "100%",
} as const;
const customBreakDatePickerLabelStyle = {
  color: "#292f7c",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "20px",
} as const;
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
const scheduleBreakCalendarWeekdays = ["M", "T", "W", "T", "F"];
const suggestedBreaks: ScheduleBreak[] = [
  {
    date: "Monday, Sep 7, 2026",
    id: "labor-day",
    name: "Labor Day",
    startDate: "09/07/2026",
  },
  {
    date: "Monday, October 12, 2026",
    id: "indigenous-peoples-day",
    name: "Indigenous Peoples' Day / Columbus Day",
    startDate: "10/12/2026",
  },
  {
    date: "Wednesday, November 11, 2026",
    id: "veterans-day",
    name: "Veterans Day",
    startDate: "11/11/2026",
  },
  {
    date: "Thursday, November 26, 2026",
    id: "thanksgiving-day",
    name: "Thanksgiving Day",
    startDate: "11/26/2026",
  },
];
const defaultSelectedBreakIds = suggestedBreaks.map(({ id }) => id);
const canvasCourseFormats: CanvasCourseFormat[] = [
  {
    buttonLabel: "Select Platform",
    description: "MindTap, WebAssign, CNOWv2, OWLv2, SAM",
    id: "platform",
    title: "Online Learning Platform + eBook",
  },
  {
    buttonLabel: "Select eBook Only",
    description: "No Online Learning Platform",
    id: "ebook",
    title: "eBook Only",
  },
  {
    buttonLabel: "Select Cengage Infuse",
    description: "Canvas-integrated Cengage course materials",
    id: "infuse",
    title: "Cengage Infuse + eBook",
  },
];
const canvasSourceCourses: CanvasSourceCourse[] = [
  {
    endDate: "12/18/2025",
    id: "science-fall",
    name: "Section MW Fall",
    startDate: "08/21/2025",
  },
  {
    endDate: "07/20/2026",
    id: "summer-linux",
    name: "Summer Linux",
    startDate: "05/25/2026",
  },
];
const canvasCourseTitles: CanvasCourseTitle[] = [
  {
    authors: "Kendall Heine",
    coverLabel: "Linux+",
    edition: "Summer 2026",
    id: "linux-plus",
    isbn13: "9798214027715",
    productIsbn: "9798214027715",
    productLabel: "MindTap + eBook",
    title: "CompTIA Linux+ and LPIC-1 Guide to Linux Certification",
  },
  {
    authors: "Lida Baker; Laurie Blass",
    coverLabel: "21st Century",
    edition: "1st Edition",
    id: "communication",
    isbn13: "9781305945920",
    productIsbn: "9780357782958",
    productLabel: "MyELT + eBook",
    title:
      "21st Century Communication 1: Listening, Speaking and Critical Thinking",
  },
];
const canvasCourseNavItems = [
  "Home",
  "Announcements",
  "Assignments",
  "Discussions",
  "Grades",
  "People",
  "Pages",
  "Cengage",
  "Files",
  "Syllabus",
  "Outcomes",
  "Rubrics",
  "Quizzes",
  "Modules",
  "BigBlueButton",
  "Collaborations",
  "Bookshelf",
];

export default function InstructorCenterFlow() {
  const navigate = useAppNavigate();
  const [dialog, setDialog] = React.useState<DialogState>(null);
  const [copyStep, setCopyStep] = React.useState<CanvasCopyStep>("format");
  const [selectedFormatId, setSelectedFormatId] =
    React.useState<CanvasCourseFormatId | null>(null);
  const [selectedTitleId, setSelectedTitleId] = React.useState<string | null>(
    null,
  );
  const [integrationOption, setIntegrationOption] =
    React.useState<IntegrationOption | null>(null);
  const [selectedSourceCourseId, setSelectedSourceCourseId] = React.useState<
    string | null
  >(null);
  const [courseDetailsDraft, setCourseDetailsDraft] =
    React.useState<CourseDetailsDraft>({
      courseName: getCopiedCanvasCourseName(canvasCourseTitles[0]),
      endDate: copiedCourseEndDate,
      startDate: copiedCourseStartDate,
      timeZone: copiedSectionTimeZoneLabel,
    });
  const [selectedMeetingDays, setSelectedMeetingDays] = React.useState<
    string[]
  >([]);
  const [customBreaks, setCustomBreaks] = React.useState<ScheduleBreak[]>([]);
  const [customBreakDraft, setCustomBreakDraft] =
    React.useState<ScheduleCustomBreakDraft | null>(null);
  const [scheduleBreakOverrides, setScheduleBreakOverrides] = React.useState<
    Record<string, Partial<ScheduleBreak>>
  >({});
  const [scheduleBreakEditDraft, setScheduleBreakEditDraft] =
    React.useState<ScheduleBreakEditDraft | null>(null);
  const [selectedBreakIds, setSelectedBreakIds] = React.useState<string[]>(
    defaultSelectedBreakIds,
  );
  const selectedTitle =
    canvasCourseTitles.find((courseTitle) => courseTitle.id === selectedTitleId) ||
    canvasCourseTitles[0];
  const selectedSourceCourse = canvasSourceCourses.find(
    (sourceCourse) => sourceCourse.id === selectedSourceCourseId,
  );
  const activeStepperIndex =
    copyStep === "details" || copyStep === "integrated" || copyStep === "content"
      ? 2
      : copyStep === "option"
        ? 1
        : 0;
  const scheduleBreaks = React.useMemo(
    () => [
      ...suggestedBreaks.map((breakItem) => ({
        ...breakItem,
        ...scheduleBreakOverrides[breakItem.id],
      })),
      ...customBreaks,
    ],
    [customBreaks, scheduleBreakOverrides],
  );
  const scheduleBreakCalendarBreakViews = React.useMemo(
    () => getScheduleBreakCalendarBreakViews(scheduleBreaks, selectedBreakIds),
    [scheduleBreaks, selectedBreakIds],
  );
  const visibleScheduleBreakCalendarBreakViews =
    scheduleBreakCalendarBreakViews.filter(
      (breakView) =>
        breakView.breakItem.id !== scheduleBreakEditDraft?.breakId,
    );

  const updateScheduleBreak = (
    breakId: string,
    updates: Partial<ScheduleBreak>,
  ) => {
    if (suggestedBreaks.some((breakItem) => breakItem.id === breakId)) {
      setScheduleBreakOverrides((currentOverrides) => ({
        ...currentOverrides,
        [breakId]: {
          ...currentOverrides[breakId],
          ...updates,
        },
      }));
      return;
    }

    setCustomBreaks((currentBreaks) =>
      currentBreaks.map((breakItem) =>
        breakItem.id === breakId ? { ...breakItem, ...updates } : breakItem,
      ),
    );
  };

  const openScheduleBreakEditor = (breakItem: ScheduleBreak) => {
    setCustomBreakDraft(null);
    setScheduleBreakEditDraft({
      breakId: breakItem.id,
      endDate: breakItem.endDate || "",
      name: breakItem.name,
      startDate: breakItem.startDate || "",
    });
  };

  const updateScheduleBreakEditDraft = (
    updates: Partial<ScheduleBreakEditDraft>,
  ) => {
    setScheduleBreakEditDraft((currentDraft) =>
      currentDraft ? { ...currentDraft, ...updates } : currentDraft,
    );
  };

  const updateScheduleBreakEditDate = (field: "startDate" | "endDate") => {
    return (date: Date | null) => {
      updateScheduleBreakEditDraft({
        [field]: formatScheduleDateFromDate(date),
      });
    };
  };

  const updateScheduleBreakEditDateInput = (
    field: "startDate" | "endDate",
  ) => {
    return (value: Date | string | null | undefined) => {
      updateScheduleBreakEditDraft({
        [field]: normalizeScheduleDatePickerInput(value),
      });
    };
  };

  const saveScheduleBreakEditDraft = () => {
    const nextName = scheduleBreakEditDraft?.name.trim();

    if (
      !scheduleBreakEditDraft ||
      !nextName ||
      !scheduleBreakEditDraft.startDate.trim()
    ) {
      return;
    }

    const currentBreak = scheduleBreaks.find(
      (breakItem) => breakItem.id === scheduleBreakEditDraft.breakId,
    );

    if (!currentBreak) return;

    const nextDate = formatScheduleBreakRangeDisplay({
      endDate: scheduleBreakEditDraft.endDate,
      startDate: scheduleBreakEditDraft.startDate,
    });

    updateScheduleBreak(scheduleBreakEditDraft.breakId, {
      date: nextDate || currentBreak.date,
      endDate: scheduleBreakEditDraft.endDate,
      name: nextName,
      startDate: scheduleBreakEditDraft.startDate,
    });
    setScheduleBreakEditDraft(null);
  };

  const openCustomBreakEditor = () => {
    setScheduleBreakEditDraft(null);
    setCustomBreakDraft({
      endDate: "",
      name: defaultCustomBreakName,
      startDate: "",
    });
  };

  const updateCustomBreakDraft = (
    updates: Partial<ScheduleCustomBreakDraft>,
  ) => {
    setCustomBreakDraft((currentDraft) =>
      currentDraft ? { ...currentDraft, ...updates } : currentDraft,
    );
  };

  const updateCustomBreakDate = (field: "startDate" | "endDate") => {
    return (date: Date | null) => {
      updateCustomBreakDraft({ [field]: formatScheduleDateFromDate(date) });
    };
  };

  const updateCustomBreakDateInput = (field: "startDate" | "endDate") => {
    return (value: Date | string | null | undefined) => {
      updateCustomBreakDraft({
        [field]: normalizeScheduleDatePickerInput(value),
      });
    };
  };

  const saveCustomBreak = () => {
    if (!customBreakDraft?.startDate.trim()) return;

    const customBreakNumber = customBreaks.length + 1;
    const customBreakName =
      customBreakDraft.name.trim() ||
      (customBreakNumber === 1
        ? defaultCustomBreakName
        : `${defaultCustomBreakName} ${customBreakNumber}`);
    const nextCustomBreak = {
      date: formatScheduleBreakRangeDisplay({
        endDate: customBreakDraft.endDate,
        startDate: customBreakDraft.startDate,
      }),
      endDate: customBreakDraft.endDate,
      id: `custom-break-${customBreakNumber}`,
      name: customBreakName,
      startDate: customBreakDraft.startDate,
    };

    setCustomBreaks((currentBreaks) => [...currentBreaks, nextCustomBreak]);
    setSelectedBreakIds((currentBreakIds) => [
      ...currentBreakIds,
      nextCustomBreak.id,
    ]);
    setCustomBreakDraft(null);
  };

  const toggleScheduleBreak = (breakId: string) => {
    setSelectedBreakIds((currentBreakIds) =>
      currentBreakIds.includes(breakId)
        ? currentBreakIds.filter((currentBreakId) => currentBreakId !== breakId)
        : [...currentBreakIds, breakId],
    );
  };

  const openMindTap = ({
    openScheduleDialog = false,
  }: {
    openScheduleDialog?: boolean;
  } = {}) => {
    const previewSearchParams = new URLSearchParams();

    previewSearchParams.set(
      COURSE_ENTRY_SETUP_PARAM,
      COURSE_ENTRY_SETUP_PREVIEW,
    );
    previewSearchParams.set(
      COURSE_ENTRY_START_DATE_PARAM,
      courseDetailsDraft.startDate,
    );
    previewSearchParams.set(
      COURSE_ENTRY_END_DATE_PARAM,
      courseDetailsDraft.endDate,
    );
    previewSearchParams.set(
      COURSE_ENTRY_TIME_ZONE_PARAM,
      copiedSectionTimeZone,
    );
    previewSearchParams.set(
      COURSE_ENTRY_PREVIEW_VIEW_PARAM,
      COURSE_ENTRY_PREVIEW_VIEW_WEEK,
    );
    if (openScheduleDialog) {
      previewSearchParams.set(
        COURSE_ENTRY_SCHEDULE_DIALOG_PARAM,
        COURSE_ENTRY_SCHEDULE_DIALOG_OPEN,
      );
    }
    const selectedScheduleBreaks = getSelectedPreviewBreaks({
      selectedBreakIds,
      scheduleBreaks,
    });

    if (selectedScheduleBreaks.length) {
      previewSearchParams.set(
        COURSE_ENTRY_BREAKS_PARAM,
        JSON.stringify(selectedScheduleBreaks),
      );
    }

    navigate({
      pathname: APP_PAGES.LearningPath,
      search: previewSearchParams.toString(),
    });
  };

  const selectedFormat = canvasCourseFormats.find(
    (format) => format.id === selectedFormatId,
  );

  const goBack = () => {
    if (copyStep === "content") {
      setCopyStep("integrated");
      return;
    }

    if (copyStep === "integrated") {
      setCopyStep("details");
      return;
    }

    if (copyStep === "details") {
      setCopyStep("option");
      return;
    }

    if (copyStep === "option") {
      setCopyStep("title");
      return;
    }

    setCopyStep("format");
  };

  const selectSourceCourse = (sourceCourse: CanvasSourceCourse) => {
    setSelectedSourceCourseId(sourceCourse.id);
    setCourseDetailsDraft((currentDraft) => ({
      ...currentDraft,
      courseName: getCopiedCanvasCourseName(selectedTitle),
      endDate: copiedCourseEndDate,
      startDate: copiedCourseStartDate,
    }));
  };

  const isFlowFooterStep =
    copyStep === "title" || copyStep === "option" || copyStep === "details";
  const isContinueDisabled =
    copyStep === "title"
      ? !selectedTitleId
      : copyStep === "option"
        ? integrationOption !== "copy" || !selectedSourceCourseId
        : !courseDetailsDraft.courseName.trim() ||
          !courseDetailsDraft.startDate.trim() ||
          !courseDetailsDraft.endDate.trim();
  const continueButtonLabel = copyStep === "details" ? "Finish" : "Continue";
  const continueFlow = () => {
    if (copyStep === "title") {
      setCopyStep("option");
      return;
    }

    if (copyStep === "option") {
      setCopyStep("details");
      return;
    }

    setCopyStep("integrated");
  };

  return (
    <CanvasShell>
      <CanvasGlobalNav aria-label="Canvas global navigation">
        <CanvasGlobalNavItem>
          <AppsIcon size={26} />
          Canvas
        </CanvasGlobalNavItem>
        <CanvasGlobalNavItem>
          <HomeIcon size={24} />
          Account
        </CanvasGlobalNavItem>
        <CanvasGlobalNavItem>
          <SettingsIcon size={24} />
          Admin
        </CanvasGlobalNavItem>
        <CanvasGlobalNavItem active>
          <BookIcon size={24} />
          Courses
        </CanvasGlobalNavItem>
        <CanvasGlobalNavItem>
          <HelpIcon size={24} />
          Help
        </CanvasGlobalNavItem>
      </CanvasGlobalNav>

      <CanvasCourseNav aria-label="Science course navigation">
        <CanvasCourseNavList>
          {canvasCourseNavItems.map((item) => (
            <CanvasCourseNavItem active={item === "Cengage"} key={item}>
              {item}
            </CanvasCourseNavItem>
          ))}
        </CanvasCourseNavList>
      </CanvasCourseNav>

      <CanvasMain>
        <MobileWarning>
          This Canvas Cengage copy flow is optimized for a desktop viewport.
        </MobileWarning>

        <CengageAppShell aria-label="Cengage course copy flow">
          <CengageAppHeader>
            <CengageLogo
              alt="Cengage"
              src={`${import.meta.env.BASE_URL}cengage_logo.svg`}
            />
            <CanvasExitButton type="button">Exit</CanvasExitButton>
          </CengageAppHeader>

          {copyStep === "format" && (
            <CengageFormatLanding>
              <CengageFormatHero>
                <CengageHeroLogo
                  alt=""
                  aria-hidden="true"
                  src={`${import.meta.env.BASE_URL}cengage-logo-only.png`}
                />
                <h1>Integrate with Cengage</h1>
                <p>Select Your Format to Get Started</p>
              </CengageFormatHero>

              <CanvasFormatGrid>
                {canvasCourseFormats.map((format) => (
                  <CanvasFormatCard key={format.id}>
                    <CanvasFormatGraphic aria-hidden="true">
                      {format.id !== "ebook" && <AppsIcon size={42} />}
                      {format.id !== "ebook" && <strong>+</strong>}
                      <BookIcon size={42} />
                    </CanvasFormatGraphic>
                    <CanvasFormatCopy>
                      <h2>{format.title}</h2>
                      <p>{format.description}</p>
                    </CanvasFormatCopy>
                    <CanvasPrimaryActionButton
                      onClick={() => {
                        setSelectedFormatId(format.id);
                        setCopyStep("title");
                      }}
                      type="button"
                    >
                      {format.buttonLabel}
                    </CanvasPrimaryActionButton>
                  </CanvasFormatCard>
                ))}
              </CanvasFormatGrid>
            </CengageFormatLanding>
          )}

          {copyStep !== "format" && (
            <>
              {copyStep !== "integrated" && copyStep !== "content" && (
                <CengageStepper aria-label="Cengage copy progress">
                  {["Select Title", "Course Option", "Course Details"].map(
                    (stepLabel, index) => {
                      const stepState =
                        index < activeStepperIndex
                          ? "complete"
                          : index === activeStepperIndex
                            ? "active"
                            : "upcoming";

                      return (
                        <CengageStep data-state={stepState} key={stepLabel}>
                          <CengageStepCircle data-state={stepState}>
                            {index + 1}
                          </CengageStepCircle>
                          {stepLabel}
                        </CengageStep>
                      );
                    },
                  )}
                </CengageStepper>
              )}

              {copyStep === "title" && (
                <CanvasFlowContent>
                  <CanvasFlowHeading>
                    <h1>Select Your Title</h1>
                  </CanvasFlowHeading>
                  <CanvasSearchRow>
                    <CanvasSearchInput
                      aria-label="Search by title, author, ISBN, keyword, or course key"
                      placeholder="Search by title, author, ISBN, keyword, or course key"
                    />
                    <CanvasFilterButton type="button">
                      {selectedFormat?.id === "ebook"
                        ? "eBook"
                        : selectedFormat?.id === "infuse"
                          ? "Cengage Infuse"
                          : "Platform"}
                    </CanvasFilterButton>
                  </CanvasSearchRow>
                  <CanvasTitleList>
                    {canvasCourseTitles.map((courseTitle) => {
                      const isSelected = selectedTitleId === courseTitle.id;

                      return (
                        <CanvasTitleCard key={courseTitle.id}>
                          <h2>{courseTitle.title}</h2>
                          <CanvasTitleOption
                            aria-label={`Select ${courseTitle.title}`}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedTitleId(courseTitle.id)}
                            type="button"
                          >
                            <CanvasCourseCover aria-hidden="true">
                              {courseTitle.coverLabel}
                            </CanvasCourseCover>
                            <CanvasRadio data-selected={isSelected} />
                            <CanvasTitleMeta>
                              <span>
                                {courseTitle.edition} ISBN-13:{" "}
                                {courseTitle.isbn13} | {courseTitle.authors}
                              </span>
                              <span>
                                <strong>{courseTitle.productLabel}</strong>{" "}
                                ISBN: {courseTitle.productIsbn}
                              </span>
                            </CanvasTitleMeta>
                          </CanvasTitleOption>
                        </CanvasTitleCard>
                      );
                    })}
                  </CanvasTitleList>
                </CanvasFlowContent>
              )}

              {copyStep === "option" && (
                <CanvasFlowContent>
                  <CanvasSelectedCoursePanel>
                    <CanvasSelectedCourseHero>
                      <CanvasCourseCover aria-hidden="true">
                        {selectedTitle.coverLabel}
                      </CanvasCourseCover>
                      <div>
                        <h2>{selectedTitle.title}</h2>
                        <p>
                          {selectedTitle.authors} ISBN-13:{" "}
                          {selectedTitle.isbn13} {selectedTitle.edition}
                        </p>
                        <p>
                          <strong>{selectedTitle.productLabel}</strong>{" "}
                          ISBN-13: {selectedTitle.productIsbn}
                        </p>
                      </div>
                    </CanvasSelectedCourseHero>
                    <CanvasInfoBanner>
                      <InfoIcon aria-hidden size={26} />
                      Your course will have the latest MindTap updates,
                      including improved activity editing and student
                      accommodation settings.
                    </CanvasInfoBanner>
                  </CanvasSelectedCoursePanel>

                  <CanvasFlowHeading>
                    <h1>How do you want to integrate with Cengage?</h1>
                  </CanvasFlowHeading>
                  <CanvasIntegrationOptions>
                    <CanvasIntegrationOption
                      aria-pressed={integrationOption === "new"}
                      onClick={() => setIntegrationOption("new")}
                      type="button"
                    >
                      <CanvasRadio data-selected={integrationOption === "new"} />
                      Create a new course from scratch
                    </CanvasIntegrationOption>
                    <CanvasIntegrationOption
                      aria-pressed={integrationOption === "copy"}
                      onClick={() => setIntegrationOption("copy")}
                      type="button"
                    >
                      <CanvasRadio
                        data-selected={integrationOption === "copy"}
                      />
                      Copy an existing course
                    </CanvasIntegrationOption>
                    {integrationOption === "copy" && (
                      <CanvasSourceCourseTable>
                        <table aria-label="Courses available to copy">
                          <thead>
                            <tr>
                              <CanvasSourceCourseHeader>
                                Course Name
                              </CanvasSourceCourseHeader>
                              <CanvasSourceCourseHeader>
                                Start Date
                              </CanvasSourceCourseHeader>
                              <CanvasSourceCourseHeader>
                                End Date
                              </CanvasSourceCourseHeader>
                            </tr>
                          </thead>
                          <tbody>
                            {canvasSourceCourses.map((sourceCourse) => {
                              const isSelected =
                                selectedSourceCourseId === sourceCourse.id;

                              return (
                                <tr key={sourceCourse.id}>
                                  <CanvasSourceCourseCell>
                                    <CanvasSourceCourseOption
                                      aria-label={`Select copy source ${sourceCourse.name}`}
                                      aria-pressed={isSelected}
                                      onClick={() =>
                                        selectSourceCourse(sourceCourse)
                                      }
                                      type="button"
                                    >
                                      <CanvasRadio
                                        data-selected={isSelected}
                                      />
                                      {sourceCourse.name}
                                    </CanvasSourceCourseOption>
                                  </CanvasSourceCourseCell>
                                  <CanvasSourceCourseCell>
                                    {sourceCourse.startDate}
                                  </CanvasSourceCourseCell>
                                  <CanvasSourceCourseCell>
                                    {sourceCourse.endDate}
                                  </CanvasSourceCourseCell>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </CanvasSourceCourseTable>
                    )}
                    <CanvasIntegrationOption
                      aria-disabled="true"
                      aria-pressed="false"
                      type="button"
                    >
                      <CanvasRadio data-selected={false} />
                      Copy another instructor's course with a course key
                    </CanvasIntegrationOption>
                    <CanvasIntegrationOption
                      aria-disabled="true"
                      aria-pressed="false"
                      disabled
                      type="button"
                    >
                      <CanvasRadio data-selected={false} />
                      Link to a course that was already created
                    </CanvasIntegrationOption>
                  </CanvasIntegrationOptions>
                </CanvasFlowContent>
              )}

              {copyStep === "details" && (
                <CanvasFlowContent>
                  <CanvasSelectedCoursePanel>
                    <CanvasSelectedCourseHero>
                      <CanvasCourseCover aria-hidden="true">
                        {selectedTitle.coverLabel}
                      </CanvasCourseCover>
                      <div>
                        <h2>
                          {selectedTitle.title} - {selectedTitle.edition}
                        </h2>
                        <p>{selectedTitle.authors}</p>
                        <p>ISBN-13: {selectedTitle.isbn13}</p>
                        <p>
                          Platform: <strong>MindTap</strong>
                        </p>
                        <p>
                          License Type: <strong>Inclusive Access</strong>
                        </p>
                      </div>
                    </CanvasSelectedCourseHero>
                    <CanvasInfoBanner>
                      <InfoIcon aria-hidden size={26} />
                      Your course will have the latest MindTap updates,
                      including improved activity editing and student
                      accommodation settings.
                    </CanvasInfoBanner>
                  </CanvasSelectedCoursePanel>

                  <CourseDetailsSection>
                    <CanvasFlowHeading>
                      <h1>Confirm new course details</h1>
                    </CanvasFlowHeading>
                    <p>* Required field</p>
                    <CourseDetailsPanel>
                      <CourseDetailsField>
                        Course Name *
                        <input
                          aria-label="Course Name"
                          onChange={(event) =>
                            setCourseDetailsDraft((currentDraft) => ({
                              ...currentDraft,
                              courseName: event.target.value,
                            }))
                          }
                          value={courseDetailsDraft.courseName}
                        />
                      </CourseDetailsField>
                      <CourseDetailsField>
                        Time zone *
                        <input
                          aria-label="Time zone"
                          onChange={(event) =>
                            setCourseDetailsDraft((currentDraft) => ({
                              ...currentDraft,
                              timeZone: event.target.value,
                            }))
                          }
                          value={courseDetailsDraft.timeZone}
                        />
                      </CourseDetailsField>
                      <CourseDetailsGrid>
                        <CourseDetailsField>
                          Course start date *
                          <input
                            aria-label="Course start date"
                            onChange={(event) =>
                              setCourseDetailsDraft((currentDraft) => ({
                                ...currentDraft,
                                startDate: event.target.value,
                              }))
                            }
                            placeholder="mm/dd/yyyy"
                            value={courseDetailsDraft.startDate}
                          />
                          <span>Set this to the first day of class</span>
                        </CourseDetailsField>
                        <CourseDetailsField>
                          Course end date *
                          <input
                            aria-label="Course end date"
                            onChange={(event) =>
                              setCourseDetailsDraft((currentDraft) => ({
                                ...currentDraft,
                                endDate: event.target.value,
                              }))
                            }
                            placeholder="mm/dd/yyyy"
                            value={courseDetailsDraft.endDate}
                          />
                        </CourseDetailsField>
                      </CourseDetailsGrid>
                    </CourseDetailsPanel>
                  </CourseDetailsSection>
                </CanvasFlowContent>
              )}

              {copyStep === "integrated" && (
                <IntegratedSuccessView>
                  <IntegratedSuccessIcon aria-hidden="true">
                    &#10003;
                  </IntegratedSuccessIcon>
                  <h1>Your LMS course is integrated with Cengage</h1>
                  <strong>Take the next steps</strong>
                  <p>
                    Select Cengage content to provide students with direct links
                    to specific activities. Or add one course link to access the
                    entire course. You can select more content at any point.
                  </p>
                  <IntegratedActionRow>
                    <IntegratedActionButton type="button">
                      Add Course Link
                    </IntegratedActionButton>
                    <IntegratedActionButton
                      data-variant="primary"
                      onClick={() => setCopyStep("content")}
                      type="button"
                    >
                      Select Content
                    </IntegratedActionButton>
                  </IntegratedActionRow>
                </IntegratedSuccessView>
              )}

              {copyStep === "content" && (
                <CanvasFlowContent>
                  <CanvasSelectContentToolbar>
                    <button onClick={goBack} type="button">
                      &lt; Back to Course Setup
                    </button>
                    <span>Select Content | Expand All</span>
                  </CanvasSelectContentToolbar>

                  <CanvasSelectContentCard>
                    <CanvasSelectedCourseHero>
                      <CanvasCourseCover aria-hidden="true">
                        {selectedTitle.coverLabel}
                      </CanvasCourseCover>
                      <div>
                        <h2>
                          {selectedTitle.title} - {selectedTitle.edition}
                        </h2>
                        <p>{selectedTitle.authors}</p>
                        <p>ISBN-13: {selectedTitle.isbn13}</p>
                        <p>
                          Platform: <strong>MindTap</strong>
                        </p>
                        <p>
                          Copying from:{" "}
                          <strong>
                            {selectedSourceCourse?.name || "Selected course"}
                          </strong>
                        </p>
                      </div>
                    </CanvasSelectedCourseHero>
                  </CanvasSelectContentCard>

                  <CanvasSelectContentRow>
                    <input aria-label="Select all course content" type="checkbox" />
                    <button
                      aria-label={`Open MindTap course link ${courseDetailsDraft.courseName}`}
                      onClick={() =>
                        openMindTap({ openScheduleDialog: true })
                      }
                      type="button"
                    >
                      {courseDetailsDraft.courseName}
                    </button>
                    <span>Course Link</span>
                    <strong>14 items</strong>
                    <input aria-label="Add course link to gradebook" type="checkbox" />
                  </CanvasSelectContentRow>
                  <CanvasSelectContentRow>
                    <input aria-label="Select Welcome to Your Course" type="checkbox" />
                    <span>Welcome to Your Course</span>
                    <strong>4 items</strong>
                  </CanvasSelectContentRow>
                  <CanvasSelectContentRow>
                    <input aria-label="Select Module 1" type="checkbox" />
                    <span>
                      Module 1: Introduction to KimTay Pet Supplies and StayWell
                      Student Accommodation Databases
                    </span>
                    <strong>6 items</strong>
                  </CanvasSelectContentRow>
                  <CanvasSelectContentRow>
                    <input aria-label="Select Module 2" type="checkbox" />
                    <span>Module 2: Database Design Fundamentals</span>
                    <strong>7 items</strong>
                  </CanvasSelectContentRow>

                  <CanvasSelectContentFooter>
                    No content selected. Select content to continue
                    <CanvasPrimaryActionButton disabled type="button">
                      Continue
                    </CanvasPrimaryActionButton>
                  </CanvasSelectContentFooter>
                </CanvasFlowContent>
              )}

              {isFlowFooterStep && (
                <CanvasFooterBar>
                  <CanvasBackButton onClick={goBack} type="button">
                    &lt; Back
                  </CanvasBackButton>
                  <CanvasPrimaryActionButton
                    disabled={isContinueDisabled}
                    onClick={continueFlow}
                    type="button"
                  >
                    {continueButtonLabel}
                  </CanvasPrimaryActionButton>
                </CanvasFooterBar>
              )}
            </>
          )}
        </CengageAppShell>
      </CanvasMain>

      {dialog === "schedule" && (
        <ModalScrim>
          <ScheduleBreaksDialog
            aria-modal="true"
            role="dialog"
            aria-labelledby="schedule-breaks-title"
          >
            <ScheduleContent>
              <ScheduleHeader>
                <ScheduleIntro>
                  <h2 id="schedule-breaks-title">Schedule &amp; Breaks</h2>
                  <p>
                    Set meeting days and mark holidays or breaks to help manage
                    due dates for this course copy.
                  </p>
                </ScheduleIntro>
                <DialogCloseButton
                  aria-label="Close Schedule & Breaks"
                  onClick={() => setDialog(null)}
                  type="button"
                >
                  x
                </DialogCloseButton>
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
                            currentDays.includes(day)
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
                <ScheduleSectionTitle>
                  Add Breaks or Holidays
                </ScheduleSectionTitle>
                {scheduleBreakEditDraft && (
                  <ScheduleBreakEditCard data-placement="top">
                    <ScheduleBreakEditNameField>
                      Break Name
                      <ScheduleBreakEditNameInput
                        aria-label="Break Name"
                        onChange={(event) =>
                          updateScheduleBreakEditDraft({
                            name: event.target.value,
                          })
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            saveScheduleBreakEditDraft();
                          }

                          if (event.key === "Escape") {
                            setScheduleBreakEditDraft(null);
                          }
                        }}
                        placeholder="Break Name"
                        value={scheduleBreakEditDraft.name}
                      />
                    </ScheduleBreakEditNameField>
                    <ScheduleBreakEditDateField>
                      <DatePicker
                        containerStyle={customBreakDatePickerContainerStyle}
                        inputStyle={customBreakDatePickerInputStyle}
                        isClearable
                        labelStyle={customBreakDatePickerLabelStyle}
                        labelText="Start Date"
                        onChange={updateScheduleBreakEditDateInput(
                          "startDate",
                        )}
                        onClear={() =>
                          updateScheduleBreakEditDraft({ startDate: "" })
                        }
                        onDateChange={updateScheduleBreakEditDate("startDate")}
                        placeholder="mm/dd/yyyy"
                        value={getScheduleDatePickerValue(
                          scheduleBreakEditDraft.startDate,
                        )}
                      />
                    </ScheduleBreakEditDateField>
                    <ScheduleBreakEditDateField>
                      <DatePicker
                        containerStyle={customBreakDatePickerContainerStyle}
                        inputStyle={customBreakDatePickerInputStyle}
                        isClearable
                        labelStyle={customBreakDatePickerLabelStyle}
                        labelText="End Date"
                        onChange={updateScheduleBreakEditDateInput("endDate")}
                        onClear={() =>
                          updateScheduleBreakEditDraft({ endDate: "" })
                        }
                        onDateChange={updateScheduleBreakEditDate("endDate")}
                        placeholder="mm/dd/yyyy"
                        value={getScheduleDatePickerValue(
                          scheduleBreakEditDraft.endDate,
                        )}
                      />
                    </ScheduleBreakEditDateField>
                    <ScheduleBreakEditActions>
                      <ScheduleBreakEditCancelButton
                        aria-label={`Cancel editing ${scheduleBreakEditDraft.name || "break"}`}
                        onClick={() => setScheduleBreakEditDraft(null)}
                        type="button"
                      >
                        <CloseIcon aria-hidden size={20} />
                      </ScheduleBreakEditCancelButton>
                      <ScheduleBreakEditSaveButton
                        disabled={
                          !scheduleBreakEditDraft.name.trim() ||
                          !scheduleBreakEditDraft.startDate.trim()
                        }
                        onClick={saveScheduleBreakEditDraft}
                        type="button"
                      >
                        Save
                      </ScheduleBreakEditSaveButton>
                    </ScheduleBreakEditActions>
                  </ScheduleBreakEditCard>
                )}
                <ScheduleBreakCalendar aria-label="Breaks and holidays calendar">
                  {visibleScheduleBreakCalendarBreakViews.map((breakView) => {
                    const isSelected = selectedBreakIds.includes(
                      breakView.breakItem.id,
                    );

                    if (breakView.breakItem.id === scheduleBreakEditDraft?.breakId) {
                      return (
                        <ScheduleBreakEditCard
                          data-placement="inline"
                          key={breakView.id}
                        >
                          <ScheduleBreakEditNameField>
                            Break Name
                            <ScheduleBreakEditNameInput
                              aria-label="Break Name"
                              onChange={(event) =>
                                updateScheduleBreakEditDraft({
                                  name: event.target.value,
                                })
                              }
                              onKeyDown={(event) => {
                                if (event.key === "Enter") saveScheduleBreakEditDraft();
                                if (event.key === "Escape") setScheduleBreakEditDraft(null);
                              }}
                              placeholder="Break Name"
                              value={scheduleBreakEditDraft.name}
                            />
                          </ScheduleBreakEditNameField>
                          <ScheduleBreakEditDateField>
                            <DatePicker
                              containerStyle={customBreakDatePickerContainerStyle}
                              inputStyle={customBreakDatePickerInputStyle}
                              isClearable
                              labelStyle={customBreakDatePickerLabelStyle}
                              labelText="Start Date"
                              onChange={updateScheduleBreakEditDateInput("startDate")}
                              onClear={() => updateScheduleBreakEditDraft({ startDate: "" })}
                              onDateChange={updateScheduleBreakEditDate("startDate")}
                              placeholder="mm/dd/yyyy"
                              value={getScheduleDatePickerValue(scheduleBreakEditDraft.startDate)}
                            />
                          </ScheduleBreakEditDateField>
                          <ScheduleBreakEditDateField>
                            <DatePicker
                              containerStyle={customBreakDatePickerContainerStyle}
                              inputStyle={customBreakDatePickerInputStyle}
                              isClearable
                              labelStyle={customBreakDatePickerLabelStyle}
                              labelText="End Date"
                              onChange={updateScheduleBreakEditDateInput("endDate")}
                              onClear={() => updateScheduleBreakEditDraft({ endDate: "" })}
                              onDateChange={updateScheduleBreakEditDate("endDate")}
                              placeholder="mm/dd/yyyy"
                              value={getScheduleDatePickerValue(scheduleBreakEditDraft.endDate)}
                            />
                          </ScheduleBreakEditDateField>
                          <ScheduleBreakEditActions>
                            <ScheduleBreakEditCancelButton
                              aria-label={`Cancel editing ${scheduleBreakEditDraft.name || "break"}`}
                              onClick={() => setScheduleBreakEditDraft(null)}
                              type="button"
                            >
                              <CloseIcon aria-hidden size={20} />
                            </ScheduleBreakEditCancelButton>
                            <ScheduleBreakEditSaveButton
                              disabled={!scheduleBreakEditDraft.name.trim() || !scheduleBreakEditDraft.startDate.trim()}
                              onClick={saveScheduleBreakEditDraft}
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
                        aria-label={`${breakView.breakItem.name}, ${
                          isSelected ? "selected" : "not selected"
                        }`}
                        aria-pressed={isSelected}
                        data-selected={isSelected}
                        key={breakView.id}
                        onClick={() => toggleScheduleBreak(breakView.breakItem.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            toggleScheduleBreak(breakView.breakItem.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <ScheduleBreakCalendarEventList>
                          <ScheduleBreakCalendarEvent data-selected={isSelected}>
                            <ScheduleBreakCalendarEventDetails>
                              <ScheduleBreakCalendarEventTitle
                                data-long-title={
                                  breakView.breakItem.name.length > 28
                                }
                              >
                                {breakView.breakItem.name}
                              </ScheduleBreakCalendarEventTitle>
                              <ScheduleBreakCalendarEventDateButton
                                aria-label={`Edit date range for ${breakView.breakItem.name}`}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  openScheduleBreakEditor(breakView.breakItem);
                                }}
                                type="button"
                              >
                                {breakView.breakItem.startDate
                                  ? formatScheduleBreakRangeDisplay({
                                      endDate: breakView.breakItem.endDate || "",
                                      startDate: breakView.breakItem.startDate,
                                    })
                                  : breakView.breakItem.date || "Set date"}
                              </ScheduleBreakCalendarEventDateButton>
                            </ScheduleBreakCalendarEventDetails>
                            <ScheduleBreakCalendarEventAction
                              aria-label={`Edit title for ${breakView.breakItem.name}`}
                              onClick={(event) => {
                                event.stopPropagation();
                                openScheduleBreakEditor(breakView.breakItem);
                              }}
                              type="button"
                            >
                              <EditIcon aria-hidden size={20} />
                            </ScheduleBreakCalendarEventAction>
                          </ScheduleBreakCalendarEvent>
                        </ScheduleBreakCalendarEventList>
                        <ScheduleBreakCalendarMonthList>
                          {breakView.months.slice(0, 1).map((month) => (
                            <ScheduleBreakCalendarMonth key={month.id}>
                              <ScheduleBreakCalendarHeader>
                                <span>{month.monthLabel}</span>
                                <span>{month.yearLabel}</span>
                              </ScheduleBreakCalendarHeader>
                              <ScheduleBreakCalendarGrid>
                                {scheduleBreakCalendarWeekdays.map(
                                  (weekdayLabel, index) => (
                                    <ScheduleBreakCalendarWeekday
                                      key={`${month.id}-${weekdayLabel}-${index}`}
                                    >
                                      {weekdayLabel}
                                    </ScheduleBreakCalendarWeekday>
                                  ),
                                )}
                                {month.cells.map((cell) => (
                                  <ScheduleBreakCalendarDay
                                    aria-label={
                                      cell.breakNames.length
                                        ? `${cell.date.toFormat(
                                            "LLLL d, yyyy",
                                          )}: ${cell.breakNames.join(", ")}`
                                        : cell.date.toFormat("LLLL d, yyyy")
                                    }
                                    data-current-month={cell.isCurrentMonth}
                                    data-selected={cell.isSelectedBreakDay}
                                    key={cell.id}
                                    title={cell.breakNames.join(", ")}
                                  >
                                    {cell.date.day}
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
                <ScheduleCustomBreakButton
                  onClick={openCustomBreakEditor}
                  style={customBreakDraft ? { display: "none" } : undefined}
                  type="button"
                >
                  <AddIcon size={20} />
                  Add Custom Break
                </ScheduleCustomBreakButton>
                {customBreakDraft && (
                  <ScheduleCustomBreakPanel aria-label="Add Custom Break details">
                    <ScheduleCustomBreakDateFields>
                      <ScheduleCustomBreakDateField data-size="name">
                        Break Name
                        <ScheduleCustomBreakDateInput
                          aria-label="Break Name"
                          onChange={(event) =>
                            updateCustomBreakDraft({
                              name: event.target.value,
                            })
                          }
                          placeholder={defaultCustomBreakName}
                          value={customBreakDraft.name}
                        />
                      </ScheduleCustomBreakDateField>
                      <ScheduleCustomBreakDateField data-size="date">
                        <DatePicker
                          containerStyle={customBreakDatePickerContainerStyle}
                          inputStyle={customBreakDatePickerInputStyle}
                          isClearable
                          labelStyle={customBreakDatePickerLabelStyle}
                          labelText="Start Date"
                          onChange={updateCustomBreakDateInput("startDate")}
                          onClear={() =>
                            updateCustomBreakDraft({ startDate: "" })
                          }
                          onDateChange={updateCustomBreakDate("startDate")}
                          placeholder="mm/dd/yyyy"
                          value={getScheduleDatePickerValue(
                            customBreakDraft.startDate,
                          )}
                        />
                      </ScheduleCustomBreakDateField>
                      <ScheduleCustomBreakDateField data-size="date">
                        <DatePicker
                          containerStyle={customBreakDatePickerContainerStyle}
                          inputStyle={customBreakDatePickerInputStyle}
                          isClearable
                          labelStyle={customBreakDatePickerLabelStyle}
                          labelText="End Date"
                          onChange={updateCustomBreakDateInput("endDate")}
                          onClear={() =>
                            updateCustomBreakDraft({ endDate: "" })
                          }
                          onDateChange={updateCustomBreakDate("endDate")}
                          placeholder="mm/dd/yyyy"
                          value={getScheduleDatePickerValue(
                            customBreakDraft.endDate,
                          )}
                        />
                      </ScheduleCustomBreakDateField>
                      <ScheduleCustomBreakActions>
                        <ScheduleCustomBreakDatePickerIconButton
                          aria-label="Cancel custom break"
                          data-variant="outlined"
                          onClick={() => setCustomBreakDraft(null)}
                          type="button"
                        >
                          <CloseIcon aria-hidden size={18} />
                        </ScheduleCustomBreakDatePickerIconButton>
                        <ScheduleCustomBreakSaveButton
                          disabled={!customBreakDraft.startDate.trim()}
                          onClick={saveCustomBreak}
                          type="button"
                        >
                          Save
                        </ScheduleCustomBreakSaveButton>
                      </ScheduleCustomBreakActions>
                    </ScheduleCustomBreakDateFields>
                  </ScheduleCustomBreakPanel>
                )}
              </ScheduleSection>

              <ScheduleFooter>
                <DialogPrimaryButton
                  onClick={() => {
                    setDialog(null);
                    openMindTap();
                  }}
                  type="button"
                >
                  Next
                </DialogPrimaryButton>
              </ScheduleFooter>
            </ScheduleContent>
          </ScheduleBreaksDialog>
        </ModalScrim>
      )}
    </CanvasShell>
  );
}

function getScheduleDateFromInput(value: string) {
  return DateTime.fromFormat(value, "MM/dd/yyyy", {
    zone: copiedSectionTimeZone,
  });
}

function getScheduleDatePickerValue(value: string) {
  const parsedDate = getScheduleDateFromInput(value);

  if (!parsedDate.isValid) return undefined;

  return new Date(parsedDate.year, parsedDate.month - 1, parsedDate.day);
}

function formatScheduleDateFromDate(date: Date | null) {
  if (!date) {
    return "";
  }

  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${month}/${day}/${date.getFullYear()}`;
}

function normalizeScheduleDatePickerInput(
  value: Date | string | null | undefined,
) {
  if (!value) {
    return "";
  }

  if (value instanceof Date) return formatScheduleDateFromDate(value);

  const isoDate = value.match(/^(\d{4})-(\d{2})-(\d{2})T/);

  if (isoDate) {
    const [, year, month, day] = isoDate;

    return `${month}/${day}/${year}`;
  }

  return value;
}

function getSelectedPreviewBreaks({
  selectedBreakIds,
  scheduleBreaks,
}: {
  selectedBreakIds: string[];
  scheduleBreaks: ScheduleBreak[];
}): CourseEntryBreak[] {
  const selectedBreakIdSet = new Set(selectedBreakIds);

  return scheduleBreaks.flatMap((breakItem) => {
    if (!breakItem.startDate || !selectedBreakIdSet.has(breakItem.id)) {
      return [];
    }

    return [
      {
        dateText: breakItem.date,
        ...(breakItem.endDate ? { endDate: breakItem.endDate } : {}),
        id: breakItem.id,
        name: breakItem.name,
        startDate: breakItem.startDate,
      },
    ];
  });
}

function getScheduleBreakCalendarBreakViews(
  scheduleBreaks: ScheduleBreak[],
  selectedBreakIds: string[],
): ScheduleBreakCalendarBreakView[] {
  const selectedBreakIdSet = new Set(selectedBreakIds);
  const datedBreaks = scheduleBreaks
    .filter((breakItem) => getScheduleBreakDateRange(breakItem))
    .sort((firstBreak, secondBreak) => {
      const firstDate = getScheduleBreakDateRange(firstBreak)?.startDate;
      const secondDate = getScheduleBreakDateRange(secondBreak)?.startDate;

      return (firstDate?.toMillis() || 0) - (secondDate?.toMillis() || 0);
    });
  return datedBreaks.flatMap((breakItem) => {
    const range = getScheduleBreakDateRange(breakItem);

    if (!range) return [];

    const monthBreaks = [breakItem];

    return [
      {
        breakItem,
        id: breakItem.id,
        months: getMonthStartDatesInRange(
          range.startDate,
          range.endDate,
        ).map((monthStartDate) => ({
          cells: getScheduleBreakCalendarCells({
            monthBreaks,
            monthStartDate,
            selectedBreakIdSet,
          }),
          id: `${breakItem.id}-${monthStartDate.toFormat("yyyy-MM")}`,
          monthLabel: monthStartDate.toFormat("LLLL"),
          yearLabel: monthStartDate.toFormat("yyyy"),
        })),
      },
    ];
  });
}

function getMonthStartDatesInRange(startDate: DateTime, endDate: DateTime) {
  const monthStartDates: DateTime[] = [];
  let currentMonthStartDate = startDate.startOf("month");
  const lastMonthStartDate = endDate.startOf("month");

  while (currentMonthStartDate.toMillis() <= lastMonthStartDate.toMillis()) {
    monthStartDates.push(currentMonthStartDate);
    currentMonthStartDate = currentMonthStartDate.plus({ months: 1 });
  }

  return monthStartDates;
}

function getScheduleBreakCalendarCells({
  monthBreaks,
  monthStartDate,
  selectedBreakIdSet,
}: {
  monthBreaks: ScheduleBreak[];
  monthStartDate: DateTime;
  selectedBreakIdSet: Set<string>;
}): ScheduleBreakCalendarCell[] {
  const monthEndDate = monthStartDate.endOf("month");
  let calendarStartDate = monthStartDate.startOf("month");
  let calendarEndDate = monthEndDate;

  while (calendarStartDate.weekday !== 1) {
    calendarStartDate = calendarStartDate.minus({ days: 1 });
  }

  while (calendarEndDate.weekday !== 5) {
    calendarEndDate = calendarEndDate.plus({ days: 1 });
  }

  const cells: ScheduleBreakCalendarCell[] = [];
  let cellDate = calendarStartDate;

  while (cellDate.toMillis() <= calendarEndDate.toMillis()) {
    if (cellDate.weekday <= 5) {
      const cellBreaks = monthBreaks.filter((breakItem) => {
        if (!selectedBreakIdSet.has(breakItem.id)) return false;

        const range = getScheduleBreakDateRange(breakItem);

        return (
          !!range &&
          cellDate.toMillis() >= range.startDate.toMillis() &&
          cellDate.toMillis() <= range.endDate.toMillis()
        );
      });

      cells.push({
        breakNames: cellBreaks.map((breakItem) => breakItem.name),
        date: cellDate,
        id: cellDate.toISODate() || `${monthStartDate.toISO()}-${cells.length}`,
        isCurrentMonth: cellDate.hasSame(monthStartDate, "month"),
        isSelectedBreakDay: cellBreaks.length > 0,
      });
    }

    cellDate = cellDate.plus({ days: 1 });
  }

  return cells;
}

function getScheduleBreakDateRange(breakItem: ScheduleBreak) {
  const startDate = getScheduleDateFromInput(breakItem.startDate || "");
  const endDate = getScheduleDateFromInput(breakItem.endDate || "");

  if (!startDate.isValid) return null;

  return {
    endDate:
      endDate.isValid && endDate.toMillis() >= startDate.toMillis()
        ? endDate.startOf("day")
        : startDate.startOf("day"),
    startDate: startDate.startOf("day"),
  };
}

function formatScheduleBreakRangeDisplay({
  endDate,
  startDate,
}: {
  endDate: string;
  startDate: string;
}) {
  const parsedStartDate = getScheduleDateFromInput(startDate);
  const parsedEndDate = getScheduleDateFromInput(endDate);

  if (!parsedStartDate.isValid) return startDate;

  if (
    !parsedEndDate.isValid ||
    parsedEndDate.toMillis() < parsedStartDate.toMillis()
  ) {
    return parsedStartDate.toFormat("cccc, LLLL d, yyyy");
  }

  if (parsedStartDate.hasSame(parsedEndDate, "year")) {
    return `${parsedStartDate.toFormat("LLLL d")} - ${parsedEndDate.toFormat(
      "LLLL d, yyyy",
    )}`;
  }

  return `${parsedStartDate.toFormat(
    "LLLL d, yyyy",
  )} - ${parsedEndDate.toFormat("LLLL d, yyyy")}`;
}
