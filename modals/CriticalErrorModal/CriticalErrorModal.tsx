import { Modal } from "react-magma-dom";

export default function CriticalErrorModal() {
  return (
    <Modal
      header="Something went wrong"
      isOpen
      isCloseButtonHidden
      isBackgroundClickDisabled
    >
      An error has occurred and we are looking into it. Please refresh and try
      again. If the problem persists, please contact Customer Support.
    </Modal>
  );
}
