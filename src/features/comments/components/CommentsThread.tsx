import { useState } from "react";
import { useAppSelector, useAppDispatch } from "hooks/typedRedux";
import { SpinnerWithBackground } from "components/Elements";
import {
  PagePaginator,
  PageSortBy,
  SortOrderTypes,
} from "components/Pagination";
import { Post } from "features/posts";
import { AuthUser } from "features/auth";

import { useComments } from "../api/getComments";
import { CommentsList } from "./CommentsList";
import { CreateComment } from "./crud/CreateComment";
import { resetSortOrder, setSortOption, toggleSortOrder } from "../slices";
import { CommentSortOptions } from "../types";

type CommentsListProps = {
  user: AuthUser;
  post: Post;
};

export const CommentsThread = ({ user, post }: CommentsListProps) => {
  const [activePageNumber, setPageNumber] = useState(1);
  const activePerPage = useAppSelector((state) => state.comments.perPage);
  const activeSortOption = useAppSelector((state) => state.comments.sortOption);
  const activeSortOrder = useAppSelector((state) => state.comments.sortOrder);

  const dispatch = useAppDispatch();

  const resetPageNumber = () => setPageNumber(1);
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
      <div className="flex flex-row flex-wrap-reverse mt-4  px-2">
        <h1 className="grow text-xl ml-3">Comments</h1>
        <div className="flex-none w-fit my-auto">
          <PageSortBy
            sortOptions={CommentSortOptions}
            activeSortOption={activeSortOption}
            setSortOption={(sortOption: string) => {
              dispatch(setSortOption(sortOption));
              dispatch(resetSortOrder());
              resetPageNumber();
            }}
            activeSortOrder={activeSortOrder}
            toggleSortOrder={() => {
              dispatch(toggleSortOrder());
              resetPageNumber();
            }}
          />
        </div>
      </div>
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl mt-1">
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
