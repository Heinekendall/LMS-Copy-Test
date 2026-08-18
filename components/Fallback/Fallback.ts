import * as React from "react";

import { useAppDispatch } from "../../hooks/reduxHooks.ts";
import { WorkflowActions } from "../../store/workflow/workflow.ts";

export default function Fallback() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(WorkflowActions.toggleLoading(true));
    return () => {
      dispatch(WorkflowActions.toggleLoading(false));
    };
  }, [dispatch]);

  return null;
}
