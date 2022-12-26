import { useState } from "react";

import { COMMENTS_PER_PAGE } from "config";
import { SpinnerWithBackground } from "components/Elements";
import { PagePaginator, SortOrderTypes } from "components/Pagination";
import { Post } from "features/posts";
import { AuthUser } from "features/auth";

import { CommentSortOptions } from "../types";
import { useComments } from "../api/getComments";
import { CommentsList } from "./CommentsList";
import { CreateComment } from "./crud/CreateComment";

type CommentsListProps = {
  user: AuthUser;
  post: Post;
};

export const CommentsThread = ({ user, post }: CommentsListProps) => {
  const [activePageNumber, setPageNumber] = useState(1);
  // eslint-disable-next-line
  const [activePerPage, setPerPage] = useState(COMMENTS_PER_PAGE);
  // eslint-disable-next-line
  const [activeSortOption, setSortBy] = useState(
    CommentSortOptions.defaultOption
  );
  // eslint-disable-next-line
  const [activeSortOrder, setSortOrder] = useState(SortOrderTypes.descending);

  const commentsQuery = useComments({
    data: {
      postId: post.id,
      perPage: activePerPage,
      pageNumber: activePageNumber,
      sortOption: activeSortOption,
      sortOrder: SortOrderTypes[activeSortOrder],
    },
  });

  if (commentsQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!commentsQuery.data) return null;

  return (
    <div>
      <CreateComment postId={post.id} onSuccess={() => null} />
      <h1 className="text-xl ml-3">Comments</h1>
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl mt-5">
        <CommentsList
          comments={commentsQuery.data.comments}
          user={user}
          postUserid={post.userId}
        />
      </div>
      <div className="mt-3">
        <PagePaginator
          pageNumber={activePageNumber}
          maxPageNumber={Math.ceil(
            commentsQuery.data?.commentsCount / activePerPage
          )}
          goToPage={setPageNumber}
        />
      </div>
    </div>
  );
};
