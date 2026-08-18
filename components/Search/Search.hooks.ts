import MiniSearch, { type SearchResult } from "minisearch";
import * as React from "react";

import { useAppSelector } from "../../hooks/reduxHooks.ts";
import { WorkflowSelectors } from "../../store/workflow/workflow.ts";
import type { NodesMap, NormalizedSearchHit } from "../../types/types.ts";

const toStringValue = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";
const TITLE_BOOST = 4;
const DESCRIPTION_BOOST = 1.5;
const MIN_PREFIX_LENGTH = 3;
const MIN_FUZZY_LENGTH = 5;
const FUZZY_EDIT_DISTANCE = 0.2;

const createActivitySearchIndex = (activities: NodesMap["activities"]) => {
  const miniSearch = new MiniSearch({
    fields: ["title", "activityDesc"],
    storeFields: ["activityId", "title", "activityType", "activityDesc"],
    idField: "activityId",
  });

  const activityDocs = Object.values(activities || {})
    .map((activity) => {
      const activityId = activity?.id;
      const title = toStringValue(activity?.name);
      const activityDesc = toStringValue(activity?.description);

      if (!activityId || (!title && !activityDesc)) {
        return null;
      }

      return {
        activityId: String(activityId),
        title,
        activityType: activity?.activityType,
        activityDesc,
      };
    })
    .filter(Boolean);

  miniSearch.addAll(activityDocs);

  return miniSearch;
};

const mapMiniSearchHit = (hit: SearchResult): NormalizedSearchHit => {
  const title = toStringValue(hit?.title);
  const activityDesc = toStringValue(hit?.activityDesc);
  const parsedActivityId = Number(hit.activityId);
  const activityId = Number.isNaN(parsedActivityId)
    ? hit.activityId
    : parsedActivityId;

  return {
    score: hit.score,
    _source: {
      title,
      activityId,
      bookmark: {},
      isGlossary: false,
      activityType: hit.activityType,
      docTitle: "",
      activityDesc,
    },
    highlight: {
      content: [activityDesc || title || ""],
    },
  };
};

const searchActivitiesWithMiniSearch = (
  miniSearchIndex: MiniSearch,
  query: string,
): NormalizedSearchHit[] => {
  const value = toStringValue(query);

  if (!value) {
    return [];
  }

  const searchOptions = {
    // Keep short queries precise while still allowing partial-word matches.
    prefix: (term: string) => term.length >= MIN_PREFIX_LENGTH,
    // Allow typo tolerance only on longer tokens to avoid noisy matches.
    fuzzy: (term: string) =>
      term.length >= MIN_FUZZY_LENGTH ? FUZZY_EDIT_DISTANCE : false,
    boost: { title: TITLE_BOOST, activityDesc: DESCRIPTION_BOOST },
  };

  const miniSearchResults = miniSearchIndex.search(value, searchOptions);

  return miniSearchResults.map(mapMiniSearchHit);
};

export function useMiniSearch() {
  const { activities } = useAppSelector(WorkflowSelectors.getNodes);
  const miniSearchIndex = React.useMemo(
    () => createActivitySearchIndex(activities),
    [activities],
  );

  return React.useCallback(
    (query: string) => searchActivitiesWithMiniSearch(miniSearchIndex, query),
    [miniSearchIndex],
  );
}
