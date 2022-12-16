import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { Post } from "../types";

export type EditPostDTO = {
  postId: number;
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

      const previousPost = queryClient.getQueryData<Post>([
        "posts",
        editingPost.postId,
      ]);

      queryClient.setQueryData(["posts", editingPost.postId], {
        ...previousPost,
        ...editingPost,
      });

      return { previousPost };
    },

    onError: (_, __, context: any) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          ["posts", context.previousPost.id],
          context.previousPost
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
