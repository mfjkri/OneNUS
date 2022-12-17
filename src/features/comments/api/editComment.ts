import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { Comment } from "../types";

export type EditCommentDTO = {
  commentId: number;
  text: string;
};

export const editComment = (data: EditCommentDTO): Promise<Comment> => {
  return axios.post("/comments/updatetext", data);
};

type UseEditCommentOptions = {
  config?: MutationConfig<typeof editComment>;
};

export const useEditComment = ({ config }: UseEditCommentOptions = {}) => {
  return useMutation({
    onMutate: async (editingComment) => {
      await queryClient.cancelQueries(["comments", editingComment.commentId]);

      const previousComment = queryClient.getQueryData<Comment>([
        "comments",
        editingComment.commentId,
      ]);

      queryClient.setQueryData(["comments", editingComment.commentId], {
        ...previousComment,
        ...editingComment,
      });

      return { previousComment };
    },

    onError: (_, __, context: any) => {
      if (context?.previousComment) {
        queryClient.setQueryData(
          ["comments", context.previousComment.id],
          context.previousComment
        );
      }
    },

    onSuccess: (data) => {
      queryClient.cancelQueries(["comments", data.id]);
      queryClient.invalidateQueries("comments");
    },
    ...config,
    mutationFn: editComment,
  });
};
