import { useEffect, useState } from "react";

import { Spinner } from "components/Elements";
import { PagePaginator } from "components/Pagination";

import { useAuth } from "lib/auth";

import { SortTypes } from "../types";
import { useComments } from "../api/getComments";
import { CommentsList } from "./CommentsList";
import { NewComment } from "./crud/NewComment";

type CommentsListProps = {
  postId: number;
};

export const CommentsThread = ({ postId }: CommentsListProps) => {
  const { user } = useAuth();

  const [pageNumber, setPageNumber] = useState(1);
  // eslint-disable-next-line
  const [perPage, setPerPage] = useState(5);
  // eslint-disable-next-line
  const [sortBy, setSortBy] = useState(SortTypes[SortTypes.ByNew]);

  const commentsQuery = useComments({
    data: {
      postId: postId,
      perPage: perPage,
      pageNumber: pageNumber,
      sortBy: sortBy,
    },
  });

  useEffect(() => {
    commentsQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, perPage, sortBy]);

  if (!user) {
    return null;
  }

  if (commentsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!commentsQuery.data) return null;

  return (
    <div>
      <NewComment postId={postId} onSuccess={() => null} />
      <h1 className="text-xl ml-3">Comments</h1>
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl mt-5">
        {commentsQuery.data.comments ? (
          <CommentsList comments={commentsQuery.data.comments} user={user} />
        ) : (
          <NoComments />
        )}
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

const NoComments = () => {
  return <div className="ml-3 px-6 py-4">No Comments</div>;
};
