import { PlusIcon } from "@heroicons/react/24/solid";

import { Button, Spinner } from "components/Elements";
import { ContentLayout } from "components/Layout";

import { PostsList } from "../components/PostsList";
import { usePosts } from "../api/getPosts";
import { SortTypes } from "../types";
import { useState } from "react";
import { PageNavigator } from "components/Pagination";

export const PostsView = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(SortTypes.byHot);
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
      <PostsList posts={postsQuery.data.posts} />

      <div className="mt-3">
        <PageNavigator
          pageNumber={pageNumber}
          maxPageNumber={Math.ceil(postsQuery.data.postsCount / perPage)}
          goToPage={(page: number) => {
            setPageNumber(page);
          }}
        />
      </div>
    </ContentLayout>
  );
};
