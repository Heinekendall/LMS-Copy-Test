import * as React from "react";

import {
  MODAL_TYPES,
  type ModalTypes,
} from "../../constants/modalConstants.ts";
import AboutModal from "../../modals/AboutModal/AboutModal.tsx";
import AutoSetPointsPossibleModal from "../../modals/AutoSetPointsPossibleModal/AutoSetPointsPossibleModal.tsx";
import BulkEditDatesModal from "../../modals/BulkEditDatesModal/BulkEditDatesModal.tsx";
import CourseScheduleTemplateModal from "../../modals/CourseScheduleTemplateModal/CourseScheduleTemplateModal.tsx";
import IdleModal from "../../modals/IdleModal/IdleModal.tsx";
import MoveActivityModal from "../../modals/MoveActivityModal/MoveActivityModal.tsx";
import NodeInfoModal from "../../modals/NodeInfoModal/NodeInfoModal.tsx";
import UnarchiveModal from "../../modals/UnarchiveModal/UnarchiveModal.tsx";
import type { ModalProps } from "../../types/modalTypes.ts";

const modalMap = new Map<ModalTypes, React.ComponentType<ModalProps>>([
  [MODAL_TYPES.ABOUT, AboutModal],
  [MODAL_TYPES.IDLE_MODAL, IdleModal],
  [MODAL_TYPES.NODE_INFO, NodeInfoModal],
  [MODAL_TYPES.UNARCHIVE, UnarchiveModal],
  [MODAL_TYPES.MOVE_ACTIVITY, MoveActivityModal],
  [MODAL_TYPES.BULK_EDIT_DATES, BulkEditDatesModal],
  [MODAL_TYPES.COURSE_SCHEDULE_TEMPLATE, CourseScheduleTemplateModal],
  [MODAL_TYPES.AUTO_SET_POINTS_POSSIBLE, AutoSetPointsPossibleModal],
]);

type ModalsMapProps = ModalProps & { type: ModalTypes };
export default function ModalsMap(props: ModalsMapProps) {
  const Component = modalMap.get(props.type);

  if (!Component) return null;

  // eslint-disable-next-line react-hooks/static-components
  return <Component data={props.data} onClose={props.onClose} />;
}
