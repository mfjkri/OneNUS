import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { postKeys } from "./queries";
import { Post } from "../types";

export type UpdatePostDTO = {
  postId: number;
  title: string;
  text: string;
};

export const updatePost = (data: UpdatePostDTO): Promise<Post> => {
  return axios.post("/posts/updatetext", data);
};

type UseUpdatePostOptions = {
  config?: MutationConfig<typeof updatePost>;
};

export const useUpdatePost = ({ config }: UseUpdatePostOptions = {}) => {
  return useMutation({
    onMutate: async (updatingPost) => {
      const queryKey = postKeys.post(updatingPost.postId);
      await queryClient.cancelQueries(queryKey);

      const previousPost = queryClient.getQueryData<Post>(queryKey);

      queryClient.setQueryData(queryKey, {
        ...previousPost,
        ...updatingPost,
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
    mutationFn: updatePost,
  });
};
