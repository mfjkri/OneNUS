import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { postKeys } from "./queries";
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
      const queryKey = postKeys.post(editingPost.postId);
      await queryClient.cancelQueries(queryKey);

      const previousPost = queryClient.getQueryData<Post>(queryKey);

      queryClient.setQueryData(queryKey, {
        ...previousPost,
        ...editingPost,
      });

      return { previousPost };
    },

    onError: (_, __, context: any) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          postKeys.post(context.previousPost.postId),
          context.previousPost
        );
      }
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.post(data.id),
        refetchActive: false,
      });
    },
    ...config,
    mutationFn: editPost,
  });
};
