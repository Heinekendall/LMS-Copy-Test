import {
  Button,
  ButtonGroup,
  IconButton,
  magma,
  styled,
} from "react-magma-dom";

export const SearchStyled = styled.div`
  background-color: ${magma.colors.neutral900}CC; // hex + 80% alpha
  position: absolute;
  inset: 0;
  z-index: 100;
  color: ${magma.colors.neutral100};
  overflow: auto;
  display: flex;
  justify-content: center;
`;

export const SearchCloseButton = styled(IconButton)`
  display: block;
  position: absolute;
  top: ${magma.spaceScale.spacing03};
  right: ${magma.spaceScale.spacing03};
`;

export const SearchContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: max-content;
  padding: 80px 20px 10px;
`;

export const SearchTipsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing06};
`;

export const SearchReindexButton = styled(Button)`
  min-width: 200px;
  margin-top: 15px;
`;

export const SearchResultsContainer = styled.div`
  background-color: ${magma.colors.neutral100};
  border-radius: ${magma.borderRadiusSmall};
`;

export const SearchResultsList = styled(ButtonGroup)`
  > li:first-child > button {
    border-radius: ${magma.borderRadiusSmall} ${magma.borderRadiusSmall} 0 0;
  }

  > li:last-child > button {
    border-radius: 0 0 ${magma.borderRadiusSmall} ${magma.borderRadiusSmall};
  }
`;

export const SearchResultButton = styled(Button)`
  border-width: 0 0 1px;
  border-radius: 0;
  height: auto;
  justify-content: flex-start;
  text-align: left;
  white-space: normal;

  > span {
    align-items: flex-start;
    gap: ${magma.spaceScale.spacing05};
  }
`;

export const SearchResultContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${magma.spaceScale.spacing02};
`;
export const SearchResultTitle = styled.div`
  color: ${magma.colors.primary};
  font-weight: 600;
`;
export const SearchResultDocTitle = styled.div`
  color: ${magma.colors.neutral500};
  font-size: 14px;
`;
export const SearchResultDescription = styled.div`
  font-size: 14px;
`;

export const SearchDotsLoader = styled.div`
  color: ${magma.colors.neutral700};
  padding: 20px;
  text-align: center;
  font-style: italic;

  &::after {
    content: " .";
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      color: rgba(0, 0, 0, 0);
      text-shadow:
        0.25em 0 0 rgba(0, 0, 0, 0),
        0.5em 0 0 rgba(0, 0, 0, 0);
    }

    40% {
      color: ${magma.colors.neutral700};
      text-shadow:
        0.25em 0 0 rgba(0, 0, 0, 0),
        0.5em 0 0 rgba(0, 0, 0, 0);
    }

    60% {
      text-shadow:
        0.25em 0 0 ${magma.colors.neutral700},
        0.5em 0 0 rgba(0, 0, 0, 0);
    }

    80%,
    100% {
      text-shadow:
        0.25em 0 0 ${magma.colors.neutral700},
        0.5em 0 0 ${magma.colors.neutral700};
    }
  }
`;
