import { AuthUser } from "features/auth";

import { Comment } from "../types";
import { ReadComment } from "./crud/ReadComment";

type CommentsListProps = {
  comments: Comment[];
  user: AuthUser;
};

export const CommentsList = ({ comments, user }: CommentsListProps) => {
  return (
    <ul className="divide-y divide-dashed px-6 py-2">
      {comments.map((comment, commentIndex) => (
        <li key={commentIndex}>
          <ReadComment
            comment={comment}
            ownComment={user.id === comment.userId}
          />
        </li>
      ))}
    </ul>
  );
};
