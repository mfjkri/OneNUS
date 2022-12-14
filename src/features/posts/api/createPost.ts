import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { Post } from "../types";

export type CreatePostDTO = {
  title: string;
  tag: string;
  text: string;
};

export const createPost = (data: CreatePostDTO): Promise<Post> => {
  return axios.post("/posts/create", data);
};

type UseCreatePostOptions = {
  config?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({ config }: UseCreatePostOptions = {}) => {
  return useMutation({
    onMutate: async (newPost) => {
      await queryClient.cancelQueries("posts");

      const previousPosts = queryClient.getQueryData<Post[]>("posts");
      queryClient.setQueryData("posts", [...(previousPosts || []), newPost]);
      return { previousPosts: previousPosts };
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
    mutationFn: createPost,
  });
};
