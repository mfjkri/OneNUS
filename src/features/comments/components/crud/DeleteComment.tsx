import { TrashIcon } from "@heroicons/react/24/outline";

import { Button, ConfirmationDialog } from "components/Elements";

import { useDeleteComment } from "../../api/deleteComment";

type DeleteCommentProps = {
  commentId: number;
  postId: number;
};

export const DeleteComment = ({ commentId, postId }: DeleteCommentProps) => {
  const deleteCommentMutation = useDeleteComment({ postId: postId });

  return (
    <ConfirmationDialog
      title="Delete comment"
      body="Are you sure you want to delete this comment?"
      isDone={deleteCommentMutation.isSuccess}
      triggerButton={
        <TrashIcon className="flex-none h-6 w-6 hover:fill-red-600 hover:cursor-pointer" />
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
