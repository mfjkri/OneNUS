import { TrashIcon } from "@heroicons/react/24/outline";

import { Button, IconButton, ConfirmationDialog } from "components/Elements";

import { useDeleteComment } from "../../api/deleteComment";

export type DeleteCommentProps = {
  commentId: number;
  postId: number;
};

export const DeleteComment = ({ commentId, postId }: DeleteCommentProps) => {
  const deleteCommentMutation = useDeleteComment({ postId: postId });

  return (
    <ConfirmationDialog
      title="Delete comment"
      body="Are you sure you want to delete this comment?"
      icon="danger"
      isDone={deleteCommentMutation.isSuccess}
      triggerButton={
        <IconButton
          variant="text"
          color="red"
          size="sm"
          icon={<TrashIcon className="h-6 w-6" />}
          toolTip="Delete"
        />
      }
      confirmButton={
        <Button
          color="red"
          isLoading={deleteCommentMutation.isLoading}
          onClick={async () => {
            await deleteCommentMutation.mutateAsync(commentId);
          }}
        >
          Delete
        </Button>
      }
    />
  );
};
