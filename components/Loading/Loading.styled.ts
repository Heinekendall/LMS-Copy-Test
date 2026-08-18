import { styled } from "react-magma-dom";

export const LoadingStyled = styled.div`
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

export const LoadingSpinner = styled.div`
  &::before {
    content: url(${import.meta.env.BASE_URL}cengage-logo-color.svg);
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 82px;
    height: 82px;
    margin-top: -41px;
    margin-left: -41px;
  }
}`;
