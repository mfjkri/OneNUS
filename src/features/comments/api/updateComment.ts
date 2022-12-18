import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { commentKeys } from "./queries";
import { Comment } from "../types";

export type UpdateCommentDTO = {
  commentId: number;
  text: string;
};

export const updateComment = (data: UpdateCommentDTO): Promise<Comment> => {
  return axios.post("/comments/updatetext", data);
};

type UseUpdateCommentOptions = {
  postId: number;
  config?: MutationConfig<typeof updateComment>;
};

export const useUpdateComment = ({
  postId,
  config = {},
}: UseUpdateCommentOptions) => {
  return useMutation({
    onMutate: async (updatingComment) => {
      const queryKey = commentKeys.comment(updatingComment.commentId);
      await queryClient.cancelQueries(queryKey);

      const previousComment = queryClient.getQueryData<Comment>(queryKey);

      queryClient.setQueryData(queryKey, {
        ...previousComment,
        ...updatingComment,
      });

      return { previousComment };
    },

    onError: (_, __, context: any) => {
      if (context?.previousComment) {
        queryClient.setQueryData(
          commentKeys.comment(context.previousComment.id),
          context.previousComment
        );
      }
    },

    onSuccess: (data) => {
      queryClient.cancelQueries(commentKeys.comment(data.id));
      queryClient.invalidateQueries(commentKeys.lists(postId));
    },
    ...config,
    mutationFn: updateComment,
  });
};
