import { useQuery } from "react-query";

import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

import { Post } from "../types";

export const getPost = (postId: string | undefined = "-"): Promise<Post> => {
  return axios.get(`posts/getbyid/${postId}`);
};

type QueryFnType = typeof getPost;

type UsePostOptions = {
  postId: string | undefined;
  config?: QueryConfig<QueryFnType>;
};

export const usePost = ({ postId, config }: UsePostOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["posts", postId],
    queryFn: () => getPost(postId),
  });
};