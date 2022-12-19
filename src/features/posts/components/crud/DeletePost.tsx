import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

import { Button, IconButton, ConfirmationDialog } from "components/Elements";

import { useDeletePost } from "../../api/deletePost";

type DeletePostProps = {
  postId: number;
};

export const DeletePost = ({ postId }: DeletePostProps) => {
  const deletePostMutation = useDeletePost();
  const navigate = useNavigate();

  return (
    <ConfirmationDialog
      title="Delete post"
      body="Are you sure you want to delete this post?"
      triggerButton={
        <IconButton
          variant="text"
          color="red"
          size="sm"
          icon={<TrashIcon className="h-6 w-6" />}
          iconAria="Delete"
        />
      }
      confirmButton={
        <Button
          color="red"
          isLoading={deletePostMutation.isLoading}
          onClick={async () => {
            await deletePostMutation.mutateAsync(postId);
            navigate("/app/posts");
          }}
        >
          Delete
        </Button>
      }
    />
  );
};
