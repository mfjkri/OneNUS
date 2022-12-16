import { Spinner } from "components/Elements";
import { ContentLayout } from "components/Layout";

import { PostsList } from "../components/PostsList";
import { usePosts } from "../api/getPosts";
import { SortTypes } from "../types";
import { useState } from "react";
import { PagePaginator, PageSortBy } from "components/Pagination";

export const Posts = () => {
  // TODO Add pageNumber and filterTag selectors
  const [pageNumber, setPageNumber] = useState(1);
  // eslint-disable-next-line
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(SortTypes[SortTypes.ByNew]);
  // eslint-disable-next-line
  const [filterTag, setFilterTag] = useState("-");

  const postsQuery = usePosts({
    pageNumber: pageNumber,
    perPage: perPage,
    sortBy: sortBy,
    filterTag: filterTag,
    data: {
      perPage: perPage,
      pageNumber: pageNumber,
      sortBy: sortBy,
      filterTag: filterTag,
    },
  });

  if (postsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!postsQuery.data) return null;

  return (
    <ContentLayout title="">
      <div className="float-right">
        <PageSortBy
          sortOptions={[
            [SortTypes[SortTypes.byHot], "hot"],
            [SortTypes[SortTypes.ByNew], "new"],
            [SortTypes[SortTypes.byRecent], "recent"],
          ]}
          activeSortOption={sortBy}
          setSortOption={(sortOption: string) => {
            setSortBy(sortOption);
            setPageNumber(1);
          }}
        />
      </div>
      <div className="mt-3 clear-both">
        <PostsList posts={postsQuery.data.posts} />
        <div className="mt-5">
          <PagePaginator
            pageNumber={pageNumber}
            maxPageNumber={Math.ceil(postsQuery.data.postsCount / perPage)}
            goToPage={setPageNumber}
          />
        </div>
      </div>
    </ContentLayout>
  );
};
