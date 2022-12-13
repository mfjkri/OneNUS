import { PlusIcon } from "@heroicons/react/24/solid";

import { Button, Spinner } from "components/Elements";
import { ContentLayout } from "components/Layout";

import { PostsList } from "../components/PostsList";
import { usePosts } from "../api/getPosts";
import { SortTypes } from "../types";
import { useState } from "react";
import { PageNavigator, PageSortBy } from "components/Pagination";

export const PostsView = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("");
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
            [SortTypes.byHot, "hot"],
            [SortTypes.ByNew, "new"],
            [SortTypes.byRecent, "recent"],
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
        <PageNavigator
          pageNumber={pageNumber}
          maxPageNumber={Math.ceil(postsQuery.data.postsCount / perPage)}
          goToPage={setPageNumber}
        />
      </div>
    </ContentLayout>
  );
};
