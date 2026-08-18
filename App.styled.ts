import { magma, styled } from "react-magma-dom";

export const AppStyled = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;
  overflow: hidden;

  &[data-preview-mode="true"] {
    flex-direction: column;
  }

  &[data-preview-mode="true"] > nav,
  &[data-preview-mode="true"] > div > header {
    display: none;
  }
`;

export const AppPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
`;

export const AppMain = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;

  border-top: 1px solid ${magma.colors.neutral300};
  background-color: ${magma.colors.neutral200};

  &[data-preview-mode="true"] {
    border-top: 0;
  }
`;
