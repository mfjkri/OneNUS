import { useCallback } from "react";

import { useAuth } from "lib/auth";
import { useAppSelector, useAppDispatch } from "hooks/typedRedux";
import { SpinnerWithBackground } from "components/Elements";
import {
  PagePaginator,
  PageSortBy,
  SortOrderTypes,
} from "components/Pagination";

import { PostPreview } from "./PostPreview";
import { PostFlairFilters } from "./PostFlair";
import { usePosts } from "../../api/getPosts";
import { Post, PostSortOptions } from "../../types";
import {
  setPageNumber,
  setSortOption,
  resetSortOrder,
  toggleSortOrder,
  resetPageNumber,
  setFilterTag,
} from "../../slice";

export type PostsListProps = {
  filterUserId?: number;
  disableControls?: boolean;
  disablePageControls?: boolean;
  disableSortControls?: boolean;
};

export const PostsList = ({
  filterUserId = 0,
  disableControls = false,
  disablePageControls = false,
  disableSortControls = false,
}: PostsListProps) => {
  const { user } = useAuth();

  // PostsState props
  const activePageNumber = useAppSelector((state) => state.posts.pageNumber);
  const activePerPage = useAppSelector((state) => state.posts.perPage);
  const activeFilterTag = useAppSelector((state) => state.posts.filterTag);
  const activeSortOption = useAppSelector((state) => state.posts.sortOption);
  const activeSortOrder = useAppSelector((state) => state.posts.sortOrder);

  // Fetch posts
  const postsQuery = usePosts({
    data: {
      perPage: activePerPage,
      pageNumber: activePageNumber,
      sortOption: activeSortOption,
      sortOrder: SortOrderTypes[activeSortOrder],
      filterUserId: filterUserId,
      filterTag: activeFilterTag,
    },
  });

  const dispatch = useAppDispatch();

  // Callbacks for updating state
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

  if (!user) return null;

  if (postsQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!postsQuery.data) return null;

  return (
    <>
      {/* Sort and filter controls */}
      {!disableControls && !disableSortControls && (
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
      )}

      {/* List of post previews */}
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl">
        {postsQuery.data.posts ? (
          <ul className="divide-y divide-solid divide-primary dark:divide-secondary px-3 py-1">
            {postsQuery.data.posts.map((post: Post, postIndex: number) => (
              <li key={postIndex}>
                <PostPreview
                  post={post}
                  postIndex={postIndex}
                  ownPost={user.id === post.userId}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-4">No Posts</div>
        )}
      </div>

      {/* Page Controls */}
      {!disableControls && !disablePageControls && (
        <div className="mt-5">
          <PagePaginator
            pageNumber={activePageNumber}
            maxPageNumber={Math.ceil(
              postsQuery.data.postsCount / activePerPage
            )}
            goToPage={goToPage}
          />
        </div>
      )}
    </>
  );
};
