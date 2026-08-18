import * as React from "react";
import {
  ButtonColor,
  ButtonIconPosition,
  ButtonSize,
  ButtonTextTransform,
  ButtonType,
  ButtonVariant,
  DatePicker,
  ModalSize,
  Radio,
  RadioGroup,
  TimePicker,
} from "react-magma-dom";
import { AutoAwesomeIcon } from "react-magma-icons";

import type { ModalProps } from "../../types/modalTypes.ts";
import CourseScheduleTemplateModal from "../CourseScheduleTemplateModal/CourseScheduleTemplateModal.tsx";
import {
  BulkEditDatesActions,
  BulkEditDatesAssistantButton,
  BulkEditDatesAtText,
  BulkEditDatesBanner,
  BulkEditDatesBannerMessage,
  BulkEditDatesCancelButton,
  BulkEditDatesContent,
  BulkEditDatesDescription,
  BulkEditDatesFieldRow,
  BulkEditDatesFields,
  BulkEditDatesModalShell,
  BulkEditDatesNewBadge,
  BulkEditDatesSaveButton,
} from "./BulkEditDatesModal.styled.ts";

const dateModeOptions = ["Select Dates", "Shift Dates", "Remove Dates"];
const courseScheduleTemplateButtonLabel = "Course Schedule Template";
const inputStyle = {
  borderRadius: 8,
  height: 40,
} as const;
const fieldContainerStyle = {
  width: "100%",
} as const;

type BulkEditDatesModalData = {
  selectedActivityCount?: number;
};

function getActivityLabel(count: number) {
  return count === 1 ? "Activity" : "Activities";
}

export default function BulkEditDatesModal({ data, onClose }: ModalProps) {
  const { selectedActivityCount = 0 } = data as BulkEditDatesModalData;
  const [isScheduleTemplateView, setIsScheduleTemplateView] =
    React.useState(false);
  const [selectedDateMode, setSelectedDateMode] = React.useState(
    dateModeOptions[0],
  );
  const [availableDate, setAvailableDate] = React.useState<Date>();
  const [availableTime, setAvailableTime] = React.useState<string>();
  const [dueDate, setDueDate] = React.useState<Date>();
  const [dueTime, setDueTime] = React.useState<string>();

  const modalTitle = `Edit Dates for ${selectedActivityCount} ${getActivityLabel(
    selectedActivityCount,
  )}`;

  if (isScheduleTemplateView) {
    return <CourseScheduleTemplateModal data={data} onClose={onClose} />;
  }

  return (
    <BulkEditDatesModalShell
      header={modalTitle}
      headerLevel={1}
      isOpen
      onClose={() => onClose(false)}
      size={ModalSize.medium}
    >
      <BulkEditDatesContent>
        <RadioGroup
          isTextVisuallyHidden
          labelText="Date edit mode"
          name="bulk-edit-date-mode"
          onChange={(event) => setSelectedDateMode(event.target.value)}
          value={selectedDateMode}
        >
          {dateModeOptions.map((option) => (
            <Radio key={option} labelText={option} value={option} />
          ))}
        </RadioGroup>

        <BulkEditDatesDescription>
          Extending the due date{" "}
          <strong>
            automatically removes late penalty deductions from existing
            submissions.
          </strong>{" "}
          This might take a few minutes to reflect in the gradebook.
        </BulkEditDatesDescription>

        <BulkEditDatesBanner>
          <BulkEditDatesBannerMessage>
            <BulkEditDatesNewBadge>New!</BulkEditDatesNewBadge>
            <span>
              Build a course schedule template by selecting meeting days and
              adding breaks or holidays.
            </span>
          </BulkEditDatesBannerMessage>
          <BulkEditDatesAssistantButton
            color={ButtonColor.primary}
            icon={<AutoAwesomeIcon size={16} />}
            iconPosition={ButtonIconPosition.left}
            onClick={() => setIsScheduleTemplateView(true)}
            size={ButtonSize.small}
            textTransform={ButtonTextTransform.none}
            type={ButtonType.button}
            variant={ButtonVariant.solid}
          >
            {courseScheduleTemplateButtonLabel}
          </BulkEditDatesAssistantButton>
        </BulkEditDatesBanner>

        <BulkEditDatesFields>
          <BulkEditDatesFieldRow>
            <DatePicker
              containerStyle={fieldContainerStyle}
              inputStyle={inputStyle}
              labelText="Date Available"
              onDateChange={(date) => setAvailableDate(date)}
              placeholder="mm/dd/yyyy"
              value={availableDate}
            />
            <BulkEditDatesAtText>at</BulkEditDatesAtText>
            <TimePicker
              containerStyle={fieldContainerStyle}
              id="bulk-edit-date-available-time"
              inputStyle={inputStyle}
              labelText="Time Available"
              onChange={setAvailableTime}
              value={availableTime}
            />
          </BulkEditDatesFieldRow>

          <BulkEditDatesFieldRow>
            <DatePicker
              containerStyle={fieldContainerStyle}
              inputStyle={inputStyle}
              labelText="Date Due"
              onDateChange={(date) => setDueDate(date)}
              placeholder="mm/dd/yyyy"
              value={dueDate}
            />
            <BulkEditDatesAtText>at</BulkEditDatesAtText>
            <TimePicker
              containerStyle={fieldContainerStyle}
              id="bulk-edit-date-due-time"
              inputStyle={inputStyle}
              labelText="Time Due"
              onChange={setDueTime}
              value={dueTime}
            />
          </BulkEditDatesFieldRow>
        </BulkEditDatesFields>

        <BulkEditDatesActions>
          <BulkEditDatesCancelButton
            color={ButtonColor.secondary}
            onClick={() => onClose(false)}
          >
            Cancel
          </BulkEditDatesCancelButton>
          <BulkEditDatesSaveButton
            color={ButtonColor.primary}
            onClick={() =>
              onClose({
                availableDate,
                availableTime,
                dueDate,
                dueTime,
                selectedDateMode,
              })
            }
          >
            Save
          </BulkEditDatesSaveButton>
        </BulkEditDatesActions>
      </BulkEditDatesContent>
    </BulkEditDatesModalShell>
  );
}
