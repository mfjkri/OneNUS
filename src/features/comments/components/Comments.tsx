import { useState, useCallback } from "react";

import { useAppSelector, useAppDispatch } from "hooks/typedRedux";
import { SpinnerWithBackground } from "components/Elements";
import {
  PagePaginator,
  PageSortBy,
  SortOrderTypes,
} from "components/Pagination";
import { Post } from "features/posts";
import { AuthUser } from "features/auth";

import { CommentsList } from "./CommentsList";
import { CreateComment } from "./crud/CreateComment";
import { useComments } from "../api/getComments";
import { resetSortOrder, setSortOption, toggleSortOrder } from "../slice";
import { CommentSortOptions } from "../types";

export type CommentsProps = {
  user: AuthUser;
  post: Post;
};

export const Comments = ({ user, post }: CommentsProps) => {
  // CommentsState props
  const [activePageNumber, setPageNumber] = useState(1);
  const activePerPage = useAppSelector((state) => state.comments.perPage);
  const activeSortOption = useAppSelector((state) => state.comments.sortOption);
  const activeSortOrder = useAppSelector((state) => state.comments.sortOrder);

  const dispatch = useAppDispatch();

  // Callbacks for updating CommentsState (passed down)
  const resetPageNumber = useCallback(() => setPageNumber(1), []);
  const setActiveSortOption = useCallback(
    (sortOption: string) => {
      resetPageNumber();
      dispatch(resetSortOrder());
      dispatch(setSortOption(sortOption));
    },
    [dispatch, resetPageNumber]
  );
  const toggleActiveSortOrder = useCallback(() => {
    resetPageNumber();
    dispatch(toggleSortOrder());
  }, [dispatch, resetPageNumber]);

  // Fetch comments
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
      <CreateComment postId={post.id} />
      <div className="flex flex-row flex-wrap-reverse mt-4  px-2">
        <h1 className="grow text-xl ml-3">Comments</h1>
        <div className="flex-none w-fit my-auto">
          <PageSortBy
            sortOptions={CommentSortOptions}
            activeSortOption={activeSortOption}
            setSortOption={setActiveSortOption}
            activeSortOrder={activeSortOrder}
            toggleSortOrder={toggleActiveSortOrder}
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
