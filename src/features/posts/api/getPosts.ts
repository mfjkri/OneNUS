import { useQuery } from "react-query";

import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

import { Post } from "../types";

export type GetPostsDTO = {
  perPage: number;
  pageNumber: number;
  sortBy: string;
  filterTag: string;
};

export type GetPostsResponse = {
  posts: Post[];
  postsCount: number;
};

export const getPosts = (data: GetPostsDTO): Promise<GetPostsResponse> => {
  return axios.get(
    `/posts/get/${data.perPage}/${data.pageNumber}/${data.sortBy}/${data.filterTag}`
  );
};

type QueryFnType = typeof getPosts;

type UsePostsOptions = {
  data: GetPostsDTO;
  config?: QueryConfig<QueryFnType>;
};

export const usePosts = ({ data, config = {} }: UsePostsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    keepPreviousData: true,
    queryKey: ["posts"],
    queryFn: () => getPosts(data),
  });
};
