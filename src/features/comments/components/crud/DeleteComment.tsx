import { TrashIcon } from "@heroicons/react/24/outline";

import { Button, ConfirmationDialog } from "components/Elements";

import { useDeleteComment } from "../../api/deleteComment";

type DeleteCommentProps = {
  commentId: number;
};

export const DeleteComment = ({ commentId }: DeleteCommentProps) => {
  const deleteCommentMutation = useDeleteComment();

  return (
    <ConfirmationDialog
      isDone={deleteCommentMutation.isSuccess}
      triggerButton={
        <TrashIcon className="flex-none h-6 w-6 hover:fill-red-600 hover:cursor-pointer" />
      }
      confirmButton={
        <Button
          isLoading={deleteCommentMutation.isLoading}
          onClick={async () => {
            await deleteCommentMutation.mutateAsync(commentId);
          }}
          variant="danger"
        >
          Delete
        </Button>
      }
      title="Are you sure you want to delete your comment?"
    />
  );
};
