import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";

export const deleteUser = () => {
  return axios.delete("users/delete");
};

type UseDeleteUserOptions = {
  logoutFn: () => void;
  config?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({
  logoutFn,
  config = {},
}: UseDeleteUserOptions) => {
  return useMutation({
    onError: () => {
      console.log("Failed to delete user");
    },
    onSuccess: () => {
      queryClient.removeQueries();
      logoutFn();
    },
    ...config,
    mutationFn: deleteUser,
  });
};
