import { Button, IconButton, magma, Modal, styled } from "react-magma-dom";

const aiGradientEnd = "#178037";

export const BulkEditDatesModalShell = styled(Modal)`
  width: min(750px, calc(100vw - 48px));
  max-width: min(750px, calc(100vw - 48px));

  > div[class*="ModalHeader"] {
    border-bottom: none;
  }

  > div[class*="ModalHeader"] h1 {
    border-bottom: none;
  }
`;

export const BulkEditDatesContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing05};
  color: ${magma.colors.neutral700};
`;

export const BulkEditDatesDescription = styled.p`
  margin: 0;
  color: ${magma.colors.neutral700};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
`;

export const BulkEditDatesBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${magma.spaceScale.spacing04};
  min-height: 52px;
  padding: ${magma.spaceScale.spacing04} ${magma.spaceScale.spacing05}
    ${magma.spaceScale.spacing04} ${magma.spaceScale.spacing04};
  border: 1px solid ${magma.colors.primary400};
  border-radius: ${magma.borderRadiusSmall};
  background-color: ${magma.colors.primary100};
  color: ${magma.colors.primary500};

  @media (max-width: ${magma.breakpoints.small}px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const BulkEditDatesBannerMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${magma.spaceScale.spacing03};
  min-width: 0;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
`;

export const BulkEditDatesNewBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: ${magma.spaceScale.spacing02};
  border-radius: 9999px;
  background-color: ${magma.colors.primary500};
  color: ${magma.colors.neutral100};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
`;

export const BulkEditDatesAssistantButton = styled(IconButton)`
  && {
    flex-shrink: 0;
    min-width: 198px;
    height: 32px;
    min-height: 32px;
    padding: 6px ${magma.spaceScale.spacing03};
    border: 0;
    border-radius: ${magma.borderRadius};
    background: linear-gradient(
      270deg,
      ${aiGradientEnd} 0%,
      ${magma.colors.primary500} 100%
    );
    box-shadow: 0 1px 6px rgb(93 101 203 / 50%);
    color: ${magma.colors.neutral100};
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0;
    text-transform: none;
    white-space: nowrap;
  }

  &&:hover,
  &&:focus {
    background: linear-gradient(
      270deg,
      ${aiGradientEnd} 0%,
      ${magma.colors.primary600} 100%
    );
    color: ${magma.colors.neutral100};
  }
`;

export const BulkEditDatesFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing05};
`;

export const BulkEditDatesFieldRow = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1fr) 32px minmax(180px, 1fr);
  align-items: end;
  width: 100%;

  @media (max-width: ${magma.breakpoints.small}px) {
    grid-template-columns: 1fr;
    gap: ${magma.spaceScale.spacing03};
  }
`;

export const BulkEditDatesAtText = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: ${magma.colors.neutral700};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.16px;

  @media (max-width: ${magma.breakpoints.small}px) {
    display: none;
  }
`;

export const BulkEditDatesActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${magma.spaceScale.spacing03};
  margin-top: ${magma.spaceScale.spacing01};
`;

export const BulkEditDatesCancelButton = styled(Button)`
  min-width: 96px;
`;

export const BulkEditDatesSaveButton = styled(Button)`
  min-width: 96px;
`;
