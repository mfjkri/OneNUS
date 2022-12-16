import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { QueriedPosts } from "./getPosts";

export const deletePost = (postId: number) => {
  return axios.delete(`posts/delete/${postId}`);
};

type UseDeletePostOptions = {
  config?: MutationConfig<typeof deletePost>;
};

export const useDeletePost = ({ config }: UseDeletePostOptions = {}) => {
  return useMutation({
    onMutate: async (deletedPostId) => {
      await queryClient.cancelQueries("posts");

      const previousPosts = queryClient.getQueryData<QueriedPosts>("posts");
      if (previousPosts) {
        queryClient.setQueryData("posts", {
          posts: previousPosts.posts.filter(
            (post) => post.id !== deletedPostId
          ),
          postCount: previousPosts.postCount - 1,
        });
      }

      return { previousPosts };
    },
    onError: (_, __, context: any) => {
      if (context?.previousPosts) {
        queryClient.setQueryData("posts", context.previousPosts);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
    ...config,
    mutationFn: deletePost,
  });
};
