import { useQuery } from "react-query";

import { axios } from "lib/axios";
import { ExtractFnReturnType, QueryConfig } from "lib/react-query";

import { userKeys } from "./queries";
import { User } from "../types";

export const getUser = (userId: number): Promise<User> => {
  return axios.get(`users/getbyid/${userId}`);
};

type QueryFnType = typeof getUser;

type UseUserOptions = {
  userId: number;
  config?: QueryConfig<QueryFnType>;
};

export const useUser = ({ userId, config = {} }: UseUserOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    useErrorBoundary: false,
    ...config,
    queryKey: userKeys.user(userId),
    queryFn: () => getUser(userId),
  });
};
