import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { commentKeys } from "./queries";
import { Comment } from "../types";

export type EditCommentDTO = {
  commentId: number;
  text: string;
};

export const editComment = (data: EditCommentDTO): Promise<Comment> => {
  return axios.post("/comments/updatetext", data);
};

type UseEditCommentOptions = {
  postId: number;
  config?: MutationConfig<typeof editComment>;
};

export const useEditComment = ({
  postId,
  config = {},
}: UseEditCommentOptions) => {
  return useMutation({
    onMutate: async (editingComment) => {
      const queryKey = commentKeys.comment(editingComment.commentId);
      await queryClient.cancelQueries(queryKey);

      const previousComment = queryClient.getQueryData<Comment>(queryKey);

      queryClient.setQueryData(queryKey, {
        ...previousComment,
        ...editingComment,
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
    mutationFn: editComment,
  });
};
