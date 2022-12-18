import { queryClient } from "lib/react-query";

import { GetCommentsDTO } from "./getComments";

export const commentKeys = {
  all: ["comments"] as const,
  lists: (postId: number) => [...commentKeys.all, "list", postId] as const,
  list: (listDetails: GetCommentsDTO) =>
    [...commentKeys.lists(listDetails.postId), { ...listDetails }] as const,
  comments: () => [...commentKeys.all, "detail"] as const,
  comment: (id: number) => [...commentKeys.comments(), id] as const,
};

export const removeCommentListsQuery = (postId: number) => {
  queryClient.cancelQueries(commentKeys.lists(postId));
};
