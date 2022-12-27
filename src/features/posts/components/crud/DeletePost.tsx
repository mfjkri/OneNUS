import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

import { Button, IconButton, ConfirmationDialog } from "components/Elements";
import { useAppDispatch } from "hooks/typedRedux";

import { useDeletePost } from "../../api/deletePost";
import { resetState } from "../../slices";

type DeletePostProps = {
  postId: number;
};

export const DeletePost = ({ postId }: DeletePostProps) => {
  const deletePostMutation = useDeletePost();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <ConfirmationDialog
      title="Delete post"
      body="Are you sure you want to delete this post?"
      icon="danger"
      isDone={deletePostMutation.isSuccess}
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
          isLoading={deletePostMutation.isLoading}
          onClick={async () => {
            await deletePostMutation.mutateAsync(postId);
            dispatch(resetState());
            navigate("/app/posts");
          }}
        >
          Delete
        </Button>
      }
    />
  );
};
