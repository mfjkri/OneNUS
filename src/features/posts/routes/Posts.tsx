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
import { PostFlairs } from "../components/PostFlair";
import { usePosts } from "../api/getPosts";
import {
  setPageNumber,
  setSortOption,
  resetSortOrder,
  toggleSortOrder,
  resetPageNumber,
} from "../slices";
import { PostSortOptions } from "../types";

export const Posts = () => {
  const { user } = useAuth();

  const activePageNumber = useAppSelector((state) => state.posts.pageNumber);
  const activePerPage = useAppSelector((state) => state.posts.perPage);
  const activeFilterTag = useAppSelector((state) => state.posts.filterTag);
  const activeSortOption = useAppSelector((state) => state.posts.sortOption);
  const activeSortOrder = useAppSelector((state) => state.posts.sortOrder);

  const dispatch = useAppDispatch();
  const goToPage = (newPageNumber: number) =>
    dispatch(setPageNumber(newPageNumber));

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
          <PostFlairs />
        </div>
        <div className="flex-none w-fit mt-1">
          <PageSortBy
            sortOptions={PostSortOptions}
            activeSortOption={activeSortOption}
            setSortOption={(sortOption: string) => {
              dispatch(setSortOption(sortOption));
              dispatch(resetSortOrder());
              dispatch(resetPageNumber());
            }}
            activeSortOrder={activeSortOrder}
            toggleSortOrder={() => {
              dispatch(toggleSortOrder());
              dispatch(resetPageNumber());
            }}
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
