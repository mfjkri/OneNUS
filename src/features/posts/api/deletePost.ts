import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { Post } from "../types";

export const deletePost = (postId: string | undefined = "-") => {
  return axios.delete(`posts/delete/${postId}`);
};

type UseDeletePostOptions = {
  config?: MutationConfig<typeof deletePost>;
};

export const useDeletePost = ({ config }: UseDeletePostOptions = {}) => {
  return useMutation({
    onMutate: async (deletedPostId) => {
      await queryClient.cancelQueries("posts");

      const previousPosts = queryClient.getQueryData<Post[]>("posts");
      queryClient.setQueryData(
        "posts",
        previousPosts?.filter((discussion) => discussion.id !== deletedPostId)
      );

      return { previousPosts };
    },
    onError: (_, __, context: any) => {
      if (context?.previousPosts) {
        queryClient.setQueryData("posts", context.previousPosts);
      }
    },
    onSuccess: () => {
      queryClient.cancelQueries("posts");
    },
    ...config,
    mutationFn: deletePost,
  });
};
