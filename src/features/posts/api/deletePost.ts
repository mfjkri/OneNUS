import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { removeCommentListsQuery } from "features/comments";

import { postKeys } from "./queries";

export const deletePost = (postId: number) => {
  return axios.delete(`posts/delete/${postId}`);
};

type UseDeletePostOptions = {
  config?: MutationConfig<typeof deletePost>;
};

export const useDeletePost = ({ config }: UseDeletePostOptions = {}) => {
  return useMutation({
    onMutate: async (deletedPostId) => {
      await queryClient.cancelQueries(postKeys.lists());
      return { deletedPostId };
    },
    onError: (_, __, context: any) => {
      console.log("Failed to delete post", context.deletedPostId);
    },
    onSuccess: (_, __, context: any) => {
      queryClient.removeQueries(postKeys.post(context.deletedPostId));
      removeCommentListsQuery(context.deletedPostId);

      queryClient.invalidateQueries(postKeys.lists());
    },
    ...config,
    mutationFn: deletePost,
  });
};
