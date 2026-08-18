import {
  LoadingScreenSpinner,
  LoadingScreenStyled,
  LoadingScreenText,
} from "./LoadingScreen.styled.ts";

export default function LoadingScreen() {
  return (
    <LoadingScreenStyled>
      <LoadingScreenSpinner>
        <img src={`${import.meta.env.BASE_URL}spinner.gif`} alt="Loading" />
        <LoadingScreenText>
          <p>loading</p>
        </LoadingScreenText>
      </LoadingScreenSpinner>
    </LoadingScreenStyled>
  );
}
