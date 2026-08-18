import * as React from "react";
import { AlertVariant } from "react-magma-dom";

import { reindexQuery } from "../../../api/nb/service/snapshot/reindexQuery.ts";
import { useAppDispatch } from "../../../hooks/reduxHooks.ts";
import { WorkflowActions } from "../../../store/workflow/workflow.ts";
import { SearchReindexButton } from "../Search.styled.ts";

interface SearchPopulateButtonProps {
  snapshotId: number;
}

export default function SearchPopulateButton(props: SearchPopulateButtonProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const populateSearchData = async () => {
    try {
      setIsLoading(true);
      await reindexQuery(props.snapshotId);
    } finally {
      setIsLoading(false);
      dispatch(
        WorkflowActions.addToast({
          message:
            "Indexing your course. Please retry your search in 10 minutes",
          variant: AlertVariant.success,
        }),
      );
    }
  };

  return (
    <div>
      <SearchReindexButton
        testId="populateSearchDataBtn"
        className="reindex_btn"
        isLoading={isLoading}
        onClick={populateSearchData}
      >
        Populate Search Data
      </SearchReindexButton>
    </div>
  );
}
