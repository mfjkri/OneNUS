import { SpinnerWithBackground } from "components/Elements";
import { ContentLayout } from "components/Layout";
import { PagePaginator, PageSortBy } from "components/Pagination";

import { useAppSelector, useAppDispatch } from "hooks/typedRedux";
import { useAuth } from "lib/auth";

import { PostsList } from "../components/PostsList";
import { PostFlairs } from "../components/PostFlair";
import { usePosts } from "../api/getPosts";
import { SortTypes } from "../types";
import { setPageNumber, setSortby } from "../slices";

export const Posts = () => {
  const { user } = useAuth();

  // TODO Add pageNumber and filterTag selectors
  const pageNumber = useAppSelector((state) => state.posts.pageNumber);
  const perPage = useAppSelector((state) => state.posts.perPage);
  const filterTag = useAppSelector((state) => state.posts.filterTag);
  const sortBy = useAppSelector((state) => state.posts.sortBy);

  const dispatch = useAppDispatch();
  const goToPage = (newPageNumber: number) =>
    dispatch(setPageNumber(newPageNumber));

  const postsQuery = usePosts({
    data: {
      perPage: perPage,
      pageNumber: pageNumber,
      sortBy: sortBy,
      filterTag: filterTag,
    },
  });

  if (!user) return null;

  if (postsQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!postsQuery.data) return null;

  return (
    <ContentLayout title="">
      <div className="flex flex-col md:flex-row px-6 py-2">
        <div className="grow">
          <PostFlairs />
        </div>
        <div className="flex-none w-fit">
          <PageSortBy
            sortOptions={[
              [SortTypes[SortTypes.byHot], "hot", "Sort by replies count"],
              [SortTypes[SortTypes.ByNew], "new", "Sort by creation date"],
              [
                SortTypes[SortTypes.byRecent],
                "recent",
                "Sort by lastest replies",
              ],
            ]}
            activeSortOption={sortBy}
            setSortOption={(sortOption: string) => {
              dispatch(setSortby(sortOption));
              goToPage(1);
            }}
          />
        </div>
      </div>
      <div>
        <PostsList posts={postsQuery.data.posts} user={user} />
        <div className="mt-5">
          <PagePaginator
            pageNumber={pageNumber}
            maxPageNumber={Math.ceil(postsQuery.data.postsCount / perPage)}
            goToPage={goToPage}
          />
        </div>
      </div>
    </ContentLayout>
  );
};
