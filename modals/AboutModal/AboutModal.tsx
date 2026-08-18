import * as React from "react";
import { Modal, ModalSize } from "react-magma-dom";

import { LOGO_ALT_TEXT } from "../../constants/commonConstants.ts";
import { fetchAboutModalData } from "../../services/aboutDataService.ts";
import focusManager from "../../services/focusManager.ts";
import type { ModalProps } from "../../types/modalTypes.ts";
import type {
  AboutModalData,
  TransformedAboutData,
} from "../../types/types.ts";
import { LOADING_ABOUT_DATA } from "./AboutModal.constants.ts";
import { AboutModalHeader, LogoImage } from "./AboutModal.styled.ts";
import AboutModalContent from "./AboutModalContent/AboutModalContent.tsx";

export default function AboutModal({ data, onClose }: ModalProps) {
  const modalData = data as AboutModalData;
  const [aboutData, setAboutData] = React.useState<
    TransformedAboutData | undefined
  >(undefined);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAboutModalData(modalData.snapshot.id, modalData.snapshot.coreTextISBN)
      .then((aboutData) => {
        setAboutData(aboutData);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const onCloseModal = () => {
    onClose();
    focusManager.restore("about-modal");
  };

  return (
    <Modal
      ariaLabel="About MindTap"
      isOpen
      onClose={onCloseModal}
      size={ModalSize.large}
      testId="aboutModal"
    >
      <AboutModalHeader>
        <span>
          <LogoImage
            alt={LOGO_ALT_TEXT}
            src={`${import.meta.env.BASE_URL}cengage-mindtap-logo.svg`}
          />
        </span>
      </AboutModalHeader>
      {aboutData?.books && (
        <AboutModalContent
          snapshot={modalData.snapshot}
          aboutData={aboutData}
          ssoToken={modalData.ssoToken}
        />
      )}
      {isLoading && <div>{LOADING_ABOUT_DATA}</div>}
      {hasError && <div>Failed to load about data</div>}
    </Modal>
  );
}
