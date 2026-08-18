import * as React from "react";
import {
  Announce,
  ButtonGroupAlignment,
  ButtonGroupOrientation,
  Paragraph,
  TypographyVisualStyle,
  VisuallyHidden,
} from "react-magma-dom";

import { ACTIVITY_TYPES } from "../../../constants/activityConstants.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks.ts";
import { FeatureFlagsSelectors } from "../../../store/featureFlags.ts";
import { SearchSelectors } from "../../../store/search/search.ts";
import {
  WorkflowActions,
  WorkflowSelectors,
} from "../../../store/workflow/workflow.ts";
import {
  SearchDotsLoader,
  SearchResultsContainer,
  SearchResultsList,
} from "../Search.styled.ts";
import SearchResult from "./Search.Result.tsx";

interface SearchListProps {
  onClose: (restoreFocus?: boolean) => void;
}

export default function SearchList(props: SearchListProps) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(SearchSelectors.getSearchState);
  const shouldCloseSearch = useShouldCloseSearch();
  const { isLoading, initial, hits, total } = state;

  const openSearchResult = ({ activityId }: { activityId: number }) => {
    if (shouldCloseSearch(activityId)) {
      props.onClose(false);
    }
    // TODO launch activity (LPN epic) instead of toast
    dispatch(WorkflowActions.addToast({ message: "Activity launched" }));
    // dispatch(launchActivity({ activityId, bookmark, highlights }));
  };

  const notFound = !isLoading && !hits.length && initial;

  if (notFound) {
    return (
      <Paragraph isInverse visualStyle={TypographyVisualStyle.bodyLarge}>
        Your search did not return any results. Check your criteria and try
        again.
      </Paragraph>
    );
  }

  return (
    <>
      {!!total && (
        <Paragraph isInverse visualStyle={TypographyVisualStyle.bodySmall}>
          {total.toLocaleString("en")} results found
        </Paragraph>
      )}

      <SearchResultsContainer>
        <SearchResultsList
          alignment={ButtonGroupAlignment.fill}
          orientation={ButtonGroupOrientation.vertical}
          noSpace
        >
          {hits.map((hit) => (
            <SearchResult
              key={hit._source.activityId}
              onOpen={openSearchResult}
              hit={hit}
            />
          ))}
        </SearchResultsList>
        <Announce>
          {isLoading && !!hits.length && (
            <SearchDotsLoader>
              Loading more<VisuallyHidden> search results</VisuallyHidden>
            </SearchDotsLoader>
          )}
        </Announce>
      </SearchResultsContainer>
    </>
  );
}

function useShouldCloseSearch() {
  const { activities } = useAppSelector(WorkflowSelectors.getNodes);
  const { isEReaderEmbedded } = useAppSelector(
    FeatureFlagsSelectors.getFeatureFlags,
  );

  return React.useCallback(
    (activityId: number) => {
      const activity = activities[activityId];
      return (
        activity.activityType !== ACTIVITY_TYPES.READING || isEReaderEmbedded
      );
    },
    [activities, isEReaderEmbedded],
  );
}
