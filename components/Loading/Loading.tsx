import { Announce, VisuallyHidden } from "react-magma-dom";

import { useAppSelector } from "../../hooks/reduxHooks.ts";
import { WorkflowSelectors } from "../../store/workflow/workflow.ts";
import { LoadingSpinner, LoadingStyled } from "./Loading.styled.ts";

export default function Loading() {
  const showLoading = useAppSelector(WorkflowSelectors.getShowLoading);

  return (
    <>
      <Announce>
        <VisuallyHidden>
          {showLoading ? "Loading, please wait" : ""}
        </VisuallyHidden>
      </Announce>
      {showLoading && (
        <LoadingStyled>
          <LoadingSpinner />
        </LoadingStyled>
      )}
    </>
  );
}
