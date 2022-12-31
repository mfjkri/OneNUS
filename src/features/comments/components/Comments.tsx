import { useState, useCallback } from "react";

import { useAppSelector, useAppDispatch } from "hooks/typedRedux";
import { SpinnerWithBackground } from "components/Elements";
import {
  PagePaginator,
  PageSortBy,
  SortOrderTypes,
} from "components/Pagination";
import { Post } from "features/posts";
import { AuthUser, UserRoles } from "features/auth";

import { CreateComment } from "./CreateComment";
import { CommentView } from "./CommentView";
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
    <>
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
        {commentsQuery.data.comments ? (
          <ul className="divide-y divide-solid divide-primary dark:divide-secondary px-6 py-2">
            {commentsQuery.data.comments.map((comment, commentIndex) => (
              <li key={commentIndex}>
                <CommentView
                  comment={comment}
                  canEdit={user.id === comment.userId}
                  canDelete={
                    user.id === comment.userId || user.role === UserRoles.ADMIN
                  }
                  ownComment={user.id === comment.userId}
                  isPosterComment={post.userId === comment.userId}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="ml-3 px-6 py-4">No Comments</div>
        )}
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
    </>
  );
};
