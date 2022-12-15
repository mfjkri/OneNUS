import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { Post } from "../types";

export type EditPostDTO = {
  postId: string;
  title: string;
  text: string;
};

export const editPost = (data: EditPostDTO): Promise<Post> => {
  return axios.post("/posts/updatetext", data);
};

type UseEditPostOptions = {
  config?: MutationConfig<typeof editPost>;
};

export const useEditPost = ({ config }: UseEditPostOptions = {}) => {
  return useMutation({
    onMutate: async (editingPost) => {
      await queryClient.cancelQueries(["posts", editingPost.postId]);

      const previousPosts = queryClient.getQueryData<Post>([
        "posts",
        editingPost.postId,
      ]);

      queryClient.setQueryData(["posts", editingPost.postId], {
        ...previousPosts,
        text: editingPost.text,
        postId: editingPost.postId,
      });
    },

    onError: (_, __, context: any) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          ["posts", context.previousPosts.id],
          context.previousPosts
        );
      }
    },

    onSuccess: (data) => {
      queryClient.cancelQueries(["posts", data.id]);
    },
    ...config,
    mutationFn: editPost,
  });
};
