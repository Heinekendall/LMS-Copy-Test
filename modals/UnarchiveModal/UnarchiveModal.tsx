import {
  Button,
  ButtonColor,
  ButtonGroup,
  ButtonGroupAlignment,
  Modal,
  Paragraph,
} from "react-magma-dom";

import { useAppDispatch } from "../../hooks/reduxHooks.ts";
import { SnapshotActions } from "../../store/snapshot/snapshot.ts";
import type { ModalProps } from "../../types/modalTypes.ts";

export default function UnarchiveModal(props: ModalProps) {
  const dispatch = useAppDispatch();
  const unarchive = () => {
    dispatch(SnapshotActions.unarchiveStudentData());
    props.onClose();
  };

  return (
    <Modal
      header="Archived course"
      isOpen
      onClose={() => props.onClose()}
      isBackgroundClickDisabled
    >
      <Paragraph noTopMargin>
        The student data for this course was automatically archived. This means
        you can still browse this course, but you won't see any grades or other
        student data. Would you like to unarchive the student data now?
      </Paragraph>
      <ButtonGroup alignment={ButtonGroupAlignment.right}>
        <Button color={ButtonColor.secondary} onClick={() => props.onClose()}>
          Later
        </Button>
        <Button color={ButtonColor.primary} onClick={() => unarchive()}>
          Unarchive now
        </Button>
      </ButtonGroup>
    </Modal>
  );
}
