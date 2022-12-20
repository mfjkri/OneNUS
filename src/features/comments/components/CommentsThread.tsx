import { useState } from "react";

import { COMMENTS_PER_PAGE } from "config";
import { SpinnerWithBackground } from "components/Elements";
import { PagePaginator } from "components/Pagination";
import { Post } from "features/posts";
import { AuthUser } from "features/auth";

import { SortTypes } from "../types";
import { useComments } from "../api/getComments";
import { CommentsList } from "./CommentsList";
import { CreateComment } from "./crud/CreateComment";

type CommentsListProps = {
  user: AuthUser;
  post: Post;
};

export const CommentsThread = ({ user, post }: CommentsListProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  // eslint-disable-next-line
  const [perPage, setPerPage] = useState(COMMENTS_PER_PAGE);
  // eslint-disable-next-line
  const [sortBy, setSortBy] = useState(SortTypes[SortTypes.ByNew]);

  const commentsQuery = useComments({
    data: {
      postId: post.id,
      perPage: perPage,
      pageNumber: pageNumber,
      sortBy: sortBy,
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
          pageNumber={pageNumber}
          maxPageNumber={Math.ceil(commentsQuery.data?.commentsCount / perPage)}
          goToPage={setPageNumber}
        />
      </div>
    </div>
  );
};
