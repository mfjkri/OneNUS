import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

import { Button, ConfirmationDialog } from "components/Elements";

import { useDeletePost } from "../api/deletePost";
import { delay } from "utils/delay";

export const DeletePost = ({ postId }: { postId: string }) => {
  const deletePostMutation = useDeletePost();
  const navigate = useNavigate();

  return (
    <ConfirmationDialog
      triggerButton={
        <TrashIcon className="flex-none h-6 w-6 hover:fill-red-600 hover:cursor-pointer" />
      }
      confirmButton={
        <Button
          isLoading={deletePostMutation.isLoading}
          onClick={async () => {
            await deletePostMutation.mutateAsync(postId);
            navigate("/app/posts");
            await delay(1000);
          }}
          variant="danger"
        >
          Delete
        </Button>
      }
      title="Are you sure you want to delete this post?"
    />
  );
};
