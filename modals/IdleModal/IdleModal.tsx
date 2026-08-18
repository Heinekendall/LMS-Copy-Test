import * as React from "react";
import {
  Button,
  ButtonColor,
  ButtonGroup,
  ButtonGroupAlignment,
  Modal,
  Paragraph,
} from "react-magma-dom";

import { SESSION_MODAL_TIMEOUT } from "../../constants/commonConstants.ts";
import type { ModalProps } from "../../types/modalTypes.ts";

export default function IdleModal({ onClose }: ModalProps) {
  const [seconds, setSeconds] = React.useState(SESSION_MODAL_TIMEOUT);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (seconds <= 0) {
      onClose(false);
    }
  }, [seconds, onClose]);

  return (
    <Modal header="Are you still there?" isOpen onClose={() => onClose(true)}>
      <Paragraph noTopMargin>
        To keep your account secure, we are going to log you out in {seconds}{" "}
        seconds. Do you want to stay signed in?
      </Paragraph>
      <ButtonGroup alignment={ButtonGroupAlignment.right}>
        <Button color={ButtonColor.danger} onClick={() => onClose(false)}>
          No
        </Button>
        <Button color={ButtonColor.secondary} onClick={() => onClose(true)}>
          Yes
        </Button>
      </ButtonGroup>
    </Modal>
  );
}
