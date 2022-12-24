import { AuthUser, UserRoles } from "features/auth";

import { Comment } from "../types";
import { ReadComment } from "./crud/ReadComment";

const NoComments = () => {
  return <div className="ml-3 px-6 py-4">No Comments</div>;
};

type CommentsListProps = {
  comments: Comment[];
  user: AuthUser;
  postUserid: number;
};

export const CommentsList = ({
  comments,
  user,
  postUserid,
}: CommentsListProps) => {
  return (
    <>
      {comments ? (
        <ul className="divide-y divide-solid divide-primary dark:divide-secondary px-6 py-2">
          {comments.map((comment, commentIndex) => (
            <li key={commentIndex}>
              <ReadComment
                comment={comment}
                canEdit={user.id === comment.userId}
                canDelete={
                  user.id === comment.userId || user.role === UserRoles.ADMIN
                }
                ownComment={user.id === comment.userId}
                isPosterComment={postUserid === comment.userId}
              />
            </li>
          ))}
        </ul>
      ) : (
        <NoComments />
      )}
    </>
  );
};
