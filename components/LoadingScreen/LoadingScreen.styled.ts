import { magma, styled } from "react-magma-dom";

export const LoadingScreenStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoadingScreenSpinner = styled.div`
  width: 83px;
  height: 83px;
`;

export const LoadingScreenText = styled.div`
  color: ${magma.colors.neutral500};
  text-align: left;
  padding: 10px 0 0 10px;
  
  & p::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ellipsis steps(4, end) 900ms infinite;
    content: '\\2026';
    width: 0;
  }

  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }
} 
`;
