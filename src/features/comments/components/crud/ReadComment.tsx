import { PencilIcon } from "@heroicons/react/24/outline";

import { IconButton, Link } from "components/Elements";
import { Timestamps } from "components/Timestamps";
import { UserIcon } from "features/users";
import { useDisclosure } from "hooks/useDisclosure";

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

const CommentView = ({
  comment,
  canEdit,
  canDelete,
  ownComment,
  isPosterComment,
  toggleEditMode,
}: CommentViewProps) => {
  return (
    <div className="my-5">
      <div className="flex flex-col">
        <div className="visible md:invisible mb-2 md:mb-0 h-auto md:h-0 flex flex-row">
          <p className="break-all my-auto text-primary2 dark:text-secondary2 ">
            Commented by:{" "}
            <Link to={`/app/users/${comment.userId}`}>{comment.author}</Link>
          </p>
          {(ownComment || isPosterComment) && (
            <p className="text-xs ml-2 my-auto font-bold text-green-600 dark:text-green-600">
              ({ownComment ? "Me" : "Author"})
            </p>
          )}
        </div>
        <div className="flex flex-row h-fit">
          <div className="flex-none w-0 md:w-24 h-0 md:h-auto invisible md:visible md:mr-4 flex flex-col">
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
            <Link
              to={`/app/users/${comment.userId}`}
              className="text-sm mx-auto mt-1"
            >
              View profile
            </Link>
          </div>
          <div className="grow w-[85%]">
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
      </div>
      <div className="mt-8">
        <Timestamps
          createdAt={comment.createdAt}
          updatedAt={comment.updatedAt}
          createdText="commented"
        />
      </div>
    </div>
  );
};

export type ReadCommentProps = {
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
