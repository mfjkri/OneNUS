import { useQuery } from "react-query";

import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

import { postKeys } from "./queries";
import { Post } from "../types";

export const getPost = (postId: number): Promise<Post> => {
  return axios.get(`posts/getbyid/${postId}`);
};

type QueryFnType = typeof getPost;

type UsePostOptions = {
  postId: number;
  config?: QueryConfig<QueryFnType>;
};

export const usePost = ({ postId, config = {} }: UsePostOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    useErrorBoundary: false,
    ...config,
    queryKey: postKeys.post(postId),
    queryFn: () => getPost(postId),
  });
};
