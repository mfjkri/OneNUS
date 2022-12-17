import { UserIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

import { useDisclosure } from "hooks/useDisclosure";
import { UTCEpochToLocalDate } from "utils/format";

import { Comment } from "../../types";
import { EditCommentForm } from "./EditComment";
import { DeleteComment } from "./DeleteComment";

type CommentRenderProps = {
  comment: Comment;
  ownComment: boolean;
  toggleEditMode: () => void;
};

export const CommentRender = ({
  comment,
  ownComment,
  toggleEditMode,
}: CommentRenderProps) => {
  return (
    <div className="my-5">
      <div className="flex flex-row h-fit">
        <div className="flex-none w-[10%]">
          <UserIcon className="w-auto h-auto" aria-hidden="true" />
          <p className="break-all text-center">{comment.author}</p>
          {ownComment && (
            <p className="text-[10px] text-center font-bold text-green-600 dark:text-green-600">
              Me
            </p>
          )}
        </div>
        <div className="grow w-[85%] ml-4">
          <div className="float-right ml-4 pt-1">
            {ownComment && (
              <div className="flex flex-row rounded-lg p-1 bg-secondary2 dark:bg-primary2">
                <DeleteComment commentId={comment.id} postId={comment.postId} />
                <PencilIcon
                  className="h-6 w-auto ml-2 hover:fill-primary dark:hover:fill-secondary hover:cursor-pointer"
                  onClick={toggleEditMode}
                />
              </div>
            )}
          </div>
          <p className="text-md break-all whitespace-pre-line">
            {comment.text}
          </p>
        </div>
      </div>
      <div className="grow mt-8 text-xs text-right text-gray-700 dark:text-gray-400">
        <p>Commented at: {UTCEpochToLocalDate(comment.createdAt)}</p>
        <p>Last modified at: {UTCEpochToLocalDate(comment.updatedAt)}</p>
      </div>
    </div>
  );
};

type CommentViewProps = {
  comment: Comment;
  ownComment: boolean;
};

export const CommentView = ({ comment, ownComment }: CommentViewProps) => {
  const { isOpen: editMode, toggle } = useDisclosure(false);
  return (
    <div>
      {editMode ? (
        <EditCommentForm
          comment={comment}
          onSuccess={toggle}
          onCancel={toggle}
        />
      ) : (
        <CommentRender
          comment={comment}
          ownComment={ownComment}
          toggleEditMode={toggle}
        />
      )}
    </div>
  );
};
