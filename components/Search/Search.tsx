import * as React from "react";
import FocusLock from "react-focus-lock";
import {
  ButtonSize,
  ButtonVariant,
  Input,
  InputIconPosition,
  Spinner,
} from "react-magma-dom";
import { CloseIcon, SearchIcon } from "react-magma-icons";

import { useKeyListener } from "../../hooks/hooks.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import { SearchActions, SearchSelectors } from "../../store/search/search.ts";
import { SnapshotSelectors } from "../../store/snapshot/snapshot.ts";
import { UserProfileSelectors } from "../../store/userProfile.ts";
import { isSuperAdminOrCourseCare } from "../../utilities/userProfileUtils.ts";
import { useMiniSearch } from "./Search.hooks.ts";
import {
  SearchCloseButton,
  SearchContent,
  SearchStyled,
} from "./Search.styled";
import { isAtBottom } from "./Search.utils.ts";
import SearchList from "./sub/Search.List.tsx";
import SearchPopulateButton from "./sub/Search.PopulateButton.tsx";
import SearchTips from "./sub/Search.Tips.tsx";

interface SearchProps {
  onClose: (restoreFocus?: boolean) => void;
}

export default function Search(props: SearchProps) {
  const dispatch = useAppDispatch();
  const { isLoading, hasMore, initial } = useAppSelector(
    SearchSelectors.getSearchState,
  );
  const { snapshot } = useAppSelector(SnapshotSelectors.getSnapshotData);
  const { role } = useAppSelector(UserProfileSelectors.getUserProfile);
  const [value, setValue] = React.useState("");
  const { snapshotId, isMaster } = snapshot;
  const showPopulateBtn = !isMaster && isSuperAdminOrCourseCare(role);

  const miniSearch = useMiniSearch();
  const loadSearchResults = React.useCallback(
    (isFirst: boolean) => {
      dispatch(SearchActions.doSearch({ isFirst, query: value, miniSearch }));
    },
    [dispatch, value, miniSearch],
  );
  const handleScroll = React.useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const clientIsAtBottom = isAtBottom(event.currentTarget);
      const isNeedMoreData = !isLoading && clientIsAtBottom && hasMore;

      if (isNeedMoreData) {
        loadSearchResults(false);
      }
    },
    [isLoading, hasMore, loadSearchResults],
  );

  useKeyListener("Escape", props.onClose);
  React.useEffect(() => {
    return () => {
      dispatch(SearchActions.resetState());
    };
  }, [dispatch]);

  return (
    <FocusLock>
      <SearchStyled onScroll={handleScroll}>
        <SearchCloseButton
          icon={<CloseIcon size={32} />}
          aria-label="Cancel Search"
          onClick={() => props.onClose()}
          variant={ButtonVariant.link}
          size={ButtonSize.large}
          isInverse
        />

        <SearchContent>
          <Input
            aria-label="Search this course"
            placeholder="Search Course"
            isClearable
            icon={isLoading ? <Spinner /> : <SearchIcon />}
            iconAriaLabel="Search"
            iconPosition={InputIconPosition.right}
            onIconClick={isLoading ? undefined : () => loadSearchResults(true)}
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onClear={() => setValue("")}
            onKeyUp={(event) => {
              if (event.code === "Enter") {
                loadSearchResults(true);
              }
            }}
          />

          {showPopulateBtn && <SearchPopulateButton snapshotId={snapshotId} />}

          {!initial && <SearchTips />}

          <SearchList onClose={props.onClose} />
        </SearchContent>
      </SearchStyled>
    </FocusLock>
  );
}
