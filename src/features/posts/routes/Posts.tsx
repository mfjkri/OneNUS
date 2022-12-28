import { useCallback } from "react";

import { useAuth } from "lib/auth";
import { useAppSelector, useAppDispatch } from "hooks/typedRedux";
import { SpinnerWithBackground } from "components/Elements";
import { ContentLayout } from "components/Layout";
import {
  PagePaginator,
  PageSortBy,
  SortOrderTypes,
} from "components/Pagination";

import { PostsList } from "../components/PostsList";
import { PostFlairFilters } from "../components/PostFlair";
import { usePosts } from "../api/getPosts";
import {
  setPageNumber,
  setSortOption,
  resetSortOrder,
  toggleSortOrder,
  resetPageNumber,
  setFilterTag,
} from "../slice";
import { PostSortOptions } from "../types";

export const Posts = () => {
  const { user } = useAuth();

  // PostsState props
  const activePageNumber = useAppSelector((state) => state.posts.pageNumber);
  const activePerPage = useAppSelector((state) => state.posts.perPage);
  const activeFilterTag = useAppSelector((state) => state.posts.filterTag);
  const activeSortOption = useAppSelector((state) => state.posts.sortOption);
  const activeSortOrder = useAppSelector((state) => state.posts.sortOrder);

  const dispatch = useAppDispatch();

  // Callbacks for updating PostsState (passed down)
  const goToPage = useCallback(
    (newPageNumber: number) => dispatch(setPageNumber(newPageNumber)),
    [dispatch]
  );
  const setActiveFilterTag = useCallback(
    (filterTag: string) => {
      dispatch(resetPageNumber());
      dispatch(setFilterTag(filterTag));
    },
    [dispatch]
  );
  const setActiveSortOption = useCallback(
    (sortOption: string) => {
      dispatch(resetPageNumber());
      dispatch(resetSortOrder());
      dispatch(setSortOption(sortOption));
    },
    [dispatch]
  );
  const toggleActiveSortOrder = useCallback(() => {
    dispatch(resetPageNumber());
    dispatch(toggleSortOrder());
  }, [dispatch]);

  // Fetch posts
  const postsQuery = usePosts({
    data: {
      perPage: activePerPage,
      pageNumber: activePageNumber,
      sortOption: activeSortOption,
      sortOrder: SortOrderTypes[activeSortOrder],
      filterTag: activeFilterTag,
    },
  });

  if (!user) return null;

  if (postsQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!postsQuery.data) return null;

  return (
    <ContentLayout title="">
      <div className="flex flex-row flex-wrap-reverse px-6 py">
        <div className="grow mr-3">
          <PostFlairFilters
            activeFilterTag={activeFilterTag}
            setActiveFilterTag={setActiveFilterTag}
          />
        </div>
        <div className="flex-none w-fit mt-1">
          <PageSortBy
            sortOptions={PostSortOptions}
            activeSortOption={activeSortOption}
            setSortOption={setActiveSortOption}
            activeSortOrder={activeSortOrder}
            toggleSortOrder={toggleActiveSortOrder}
          />
        </div>
      </div>
      <div>
        <PostsList posts={postsQuery.data.posts} user={user} />
        <div className="mt-5">
          <PagePaginator
            pageNumber={activePageNumber}
            maxPageNumber={Math.ceil(
              postsQuery.data.postsCount / activePerPage
            )}
            goToPage={goToPage}
          />
        </div>
      </div>
    </ContentLayout>
  );
};
