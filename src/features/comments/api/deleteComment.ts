import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

import { GetCommentsResponse } from "./getComments";

export const deleteComment = (commentId: number) => {
  return axios.delete(`comments/delete/${commentId}`);
};

type UseDeleteCommentOptions = {
  postId: number;
  config?: MutationConfig<typeof deleteComment>;
};

export const useDeleteComment = ({
  postId,
  config,
}: UseDeleteCommentOptions) => {
  return useMutation({
    onMutate: async (deletedCommentId) => {
      await queryClient.cancelQueries(["comments", "all", postId]);

      const previousComments = queryClient.getQueryData<GetCommentsResponse>([
        "comments",
        "all",
        postId,
      ]);

      if (previousComments) {
        queryClient.setQueryData(["comments", "all", postId], {
          comments: previousComments.comments.filter(
            (comment) => comment.id !== deletedCommentId
          ),
          commentsCount: previousComments.commentsCount - 1,
        });
      }

      return { previousComments };
    },
    onError: (_, __, context: any) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", "all", postId],
          context.previousComments
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", "all", postId]);
    },
    ...config,
    mutationFn: deleteComment,
  });
};
