import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { store } from "stores/store";

import { addNotification } from "components/Notifications";

import { postKeys } from "./queries";
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
      await queryClient.cancelQueries(postKeys.lists());
      return { newPost };
    },
    onError: (_, __, context: any) => {
      console.log("Failed to create new post", context.newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(postKeys.lists());
      store.dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: "Created new post!",
        })
      );
    },
    ...config,
    mutationFn: createPost,
  });
};
