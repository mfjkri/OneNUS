import { PencilIcon } from "@heroicons/react/24/outline";

import { IconButton } from "components/Elements";
import { UserIcon } from "features/auth";

import { useDisclosure } from "hooks/useDisclosure";
import { UTCEpochToLocalDate } from "utils/format";

import { Comment } from "../../types";
import { UpdateCommentForm } from "./UpdateComment";
import { DeleteComment } from "./DeleteComment";

type CommentViewProps = {
  comment: Comment;
  canEdit: boolean;
  canDelete: boolean;
  ownComment: boolean;
  isPosterComment: Boolean;
  toggleEditMode: () => void;
};

export const CommentView = ({
  comment,
  canEdit,
  canDelete,
  ownComment,
  isPosterComment,
  toggleEditMode,
}: CommentViewProps) => {
  return (
    <div className="my-5">
      <div className="flex flex-row h-fit">
        <div className="flex-none w-[10%]">
          <UserIcon
            className="w-auto h-auto"
            userId={comment.userId}
            username={comment.author}
          />
          <p className="break-all text-center">{comment.author}</p>
          {(ownComment || isPosterComment) && (
            <p className="text-[10px] text-center font-bold text-green-600 dark:text-green-600">
              {ownComment ? "Me" : "Author"}
            </p>
          )}
        </div>
        <div className="grow w-[85%] ml-4">
          <div className="float-right ml-4 pt-1">
            {(canEdit || canDelete) && (
              <div className="flex flex-row rounded-lg p-1 bg-secondary2 dark:bg-primary2">
                {canDelete && (
                  <DeleteComment
                    commentId={comment.id}
                    postId={comment.postId}
                  />
                )}
                {canEdit && (
                  <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    icon={<PencilIcon className="h-6 w-6" />}
                    toolTip="Edit"
                    onClick={toggleEditMode}
                  />
                )}
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

type ReadCommentProps = {
  comment: Comment;
  canEdit: boolean;
  canDelete: boolean;
  ownComment: boolean;
  isPosterComment: boolean;
};

export const ReadComment = ({
  comment,
  canEdit,
  canDelete,
  ownComment,
  isPosterComment,
}: ReadCommentProps) => {
  const { isOpen: editMode, toggle } = useDisclosure(false);
  return (
    <div>
      {editMode ? (
        <UpdateCommentForm
          comment={comment}
          onSuccess={toggle}
          onCancel={toggle}
        />
      ) : (
        <CommentView
          comment={comment}
          canEdit={canEdit}
          canDelete={canDelete}
          ownComment={ownComment}
          isPosterComment={isPosterComment}
          toggleEditMode={toggle}
        />
      )}
    </div>
  );
};
