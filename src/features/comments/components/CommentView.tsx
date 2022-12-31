import {
  InlineProfilePreview,
  Controls,
  ProfilePreview,
  Timestamps,
} from "components/ThreadDrawer";
import { useDisclosure } from "hooks/useDisclosure";

import { UpdateCommentForm } from "./UpdateComment";
import { DeleteComment } from "./DeleteComment";
import { Comment } from "../types";

export type CommentViewProps = {
  comment: Comment;
  canEdit: boolean;
  canDelete: boolean;
  ownComment: boolean;
  isPosterComment: boolean;
};

export const CommentView = ({
  comment,
  canEdit,
  canDelete,
  ownComment,
  isPosterComment,
}: CommentViewProps) => {
  const { isOpen: editMode, toggle } = useDisclosure(false);

  const authorTitle = ownComment ? "Me" : isPosterComment ? "Author" : "";

  return (
    <>
      {editMode ? (
        <UpdateCommentForm
          comment={comment}
          onSuccess={toggle}
          onCancel={toggle}
        />
      ) : (
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
                    <DeleteComment
                      commentId={comment.id}
                      postId={comment.postId}
                    />
                  }
                  toggleEditMode={toggle}
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
      )}
    </>
  );
};
