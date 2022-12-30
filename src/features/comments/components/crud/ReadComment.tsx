import {
  InlineProfilePreview,
  Controls,
  ProfilePreview,
  Timestamps,
} from "components/ThreadDrawer";
import { useDisclosure } from "hooks/useDisclosure";

import { UpdateCommentForm } from "./UpdateComment";
import { DeleteComment } from "./DeleteComment";
import { Comment } from "../../types";

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
  const authorTitle = ownComment ? "Me" : isPosterComment ? "Author" : "";

  return (
    <div className="my-5">
      <InlineProfilePreview
        userId={comment.userId}
        author={comment.author}
        authorTitle={authorTitle}
        actionText="Commented by"
      />
      <div className="flex flex-row h-fit">
        <ProfilePreview
          userId={comment.userId}
          author={comment.author}
          authorTitle={authorTitle}
          showProfileLink={true}
          responsiveHide={true}
        />
        <div className="grow w-[85%]">
          <div className="float-right ml-4 pt-1">
            <Controls
              canEdit={canEdit}
              canDelete={canDelete}
              deleteControls={
                <DeleteComment commentId={comment.id} postId={comment.postId} />
              }
              toggleEditMode={toggleEditMode}
            />
          </div>
          <p className="text-md break-all whitespace-pre-line">
            {comment.text}
          </p>
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
    <>
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
    </>
  );
};
