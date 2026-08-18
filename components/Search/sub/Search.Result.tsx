import {
  ButtonColor,
  ButtonTextTransform,
  ButtonVariant,
  magma,
} from "react-magma-dom";

import { ACTIVITY_TYPES } from "../../../constants/activityConstants.ts";
import type { NormalizedSearchHit } from "../../../types/types.ts";
import { filterXSS } from "../../../utilities/securityUtils.ts";
import ActivityIcon from "../../common/ActivityIcon/ActivityIcon.tsx";
import {
  SearchResultButton,
  SearchResultContent,
  SearchResultDescription,
  SearchResultDocTitle,
  SearchResultTitle,
} from "../Search.styled.ts";
import { getArrayHighlights } from "../Search.utils.ts";

interface SearchResultProps {
  hit: NormalizedSearchHit;
  onOpen: (arg: {
    activityId: number;
    bookmark: object;
    highlights: string[];
  }) => void;
}

export default function SearchResult({ hit, onOpen }: SearchResultProps) {
  const { activityId, title, bookmark, activityType, docTitle, activityDesc } =
    hit._source;

  const content = hit.highlight.content[0] ?? "";
  const secureTitle = filterXSS(title);
  const secureDocTitle = filterXSS(docTitle);
  const secureDescription = filterXSS(activityDesc || content);
  const highlights = getArrayHighlights(content);

  const openResult = () => onOpen({ activityId, bookmark, highlights });

  return (
    <SearchResultButton
      onClick={openResult}
      variant={ButtonVariant.solid}
      color={ButtonColor.subtle}
      textTransform={ButtonTextTransform.none}
    >
      <ActivityIcon activity={hit._source} color={magma.colors.neutral500} />

      <SearchResultContent>
        <SearchResultTitle dangerouslySetInnerHTML={{ __html: secureTitle }} />

        {secureDocTitle && activityType === ACTIVITY_TYPES.READING && (
          <SearchResultDocTitle
            dangerouslySetInnerHTML={{ __html: secureDocTitle }}
          />
        )}

        {secureDescription && (
          <SearchResultDescription
            dangerouslySetInnerHTML={{
              __html: activityDesc
                ? secureDescription
                : `...${secureDescription}...`,
            }}
          />
        )}
      </SearchResultContent>
    </SearchResultButton>
  );
}
