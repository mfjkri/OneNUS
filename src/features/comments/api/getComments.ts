import { useQuery } from "react-query";

import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

import { commentKeys } from "./queries";
import { Comment } from "../types";

export type GetCommentsDTO = {
  postId: number;
  perPage: number;
  pageNumber: number;
  sortOption: string;
  sortOrder: string;
};

export type GetCommentsResponse = {
  comments: Comment[];
  commentsCount: number;
};

export const getComments = (
  data: GetCommentsDTO
): Promise<GetCommentsResponse> => {
  return axios.get(
    `/comments/get/${data.postId}/${data.perPage}/${data.pageNumber}/${data.sortOption}/${data.sortOrder}`
  );
};

type QueryFnType = typeof getComments;

type UseCommentsOptions = {
  data: GetCommentsDTO;
  config?: QueryConfig<QueryFnType>;
};

export const useComments = ({ data, config = {} }: UseCommentsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    useErrorBoundary: false,
    keepPreviousData: true,
    ...config,
    queryKey: commentKeys.list(data),
    queryFn: () => getComments(data),
  });
};
