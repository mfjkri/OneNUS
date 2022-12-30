import { useMutation } from "react-query";

import { axios } from "lib/axios";
import { MutationConfig, queryClient } from "lib/react-query";
import { store } from "stores/store";

import { addNotification } from "components/Notifications";

import { userKeys } from "./queries";
import { User } from "../types";

export type UpdateBioDTO = {
  userId: number;
  bio: string;
};

export const updateBio = (data: UpdateBioDTO): Promise<User> => {
  return axios.post("/users/updatebio", data);
};

type UseUpdateBioOptions = {
  config?: MutationConfig<typeof updateBio>;
};

export const useUpdateBio = ({ config }: UseUpdateBioOptions = {}) => {
  return useMutation({
    onMutate: async (updatingBio) => {
      const queryKey = userKeys.user(updatingBio.userId);
      await queryClient.cancelQueries(queryKey);

      const previousUser = queryClient.getQueryData<User>(queryKey);

      queryClient.setQueryData(queryKey, {
        ...previousUser,
        bio: updatingBio.bio,
      });

      return { previousUser };
    },

    onError: (_, __, context: any) => {
      if (context?.previousUser) {
        queryClient.setQueryData(
          userKeys.user(context.previousUser.id),
          context.previousUser
        );
      }
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(userKeys.user(data.id));

      store.dispatch(
        addNotification({
          type: "success",
          title: "Success",
          message: "Updated your bio!",
        })
      );
    },
    ...config,
    mutationFn: updateBio,
  });
};
