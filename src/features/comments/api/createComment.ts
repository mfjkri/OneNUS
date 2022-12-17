import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { Comment } from "../types";

export type CreateCommentDTO = {
  postId: number;
  text: string;
};

export const createComment = (data: CreateCommentDTO): Promise<Comment> => {
  return axios.post("/comments/create", data);
};

type UseCreateCommentOptions = {
  config?: MutationConfig<typeof createComment>;
};

export const useCreateComment = ({ config }: UseCreateCommentOptions = {}) => {
  return useMutation({
    onMutate: async (newComment) => {
      await queryClient.cancelQueries("comments");
      return { newComment };
    },
    onError: (_, __, context: any) => {
      console.log("Failed to create new comment", context.newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
    ...config,
    mutationFn: createComment,
  });
};
