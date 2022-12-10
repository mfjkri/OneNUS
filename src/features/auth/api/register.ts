import { axios } from "lib/axios";

import { UserResponse } from "../types";

export type RegisterCredentialsDTO = {
  username: string;
  password: string;
};

export const registerWithUsernameAndPassword = (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  return axios.post("/auth/register", data);
};
