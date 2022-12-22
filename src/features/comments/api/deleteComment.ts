import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { store } from "stores/store";

import { addNotification } from "components/Notifications";

import { commentKeys } from "./queries";

export const deleteComment = (commentId: number) => {
  return axios.delete(`comments/delete/${commentId}`);
};

type UseDeleteCommentOptions = {
  postId: number;
  config?: MutationConfig<typeof deleteComment>;
};

export const useDeleteComment = ({
  postId,
  config,
}: UseDeleteCommentOptions) => {
  return useMutation({
    onMutate: async (deletedCommentId) => {
      await queryClient.cancelQueries(commentKeys.lists(postId));
      return { deletedCommentId };
    },
    onError: (_, __, context: any) => {
      if (context?.deletedCommentId) {
        console.log("Failed to delete comment", context.deletedCommentId);
      }
    },
    onSuccess: (_, __, context) => {
      queryClient.removeQueries(commentKeys.comment(context.deletedCommentId));
      queryClient.invalidateQueries(commentKeys.lists(postId));
      store.dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: "Deleted your comment!",
        })
      );
    },
    ...config,
    mutationFn: deleteComment,
  });
};
