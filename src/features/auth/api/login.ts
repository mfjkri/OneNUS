// import { axios } from "lib/axios";

import { UserResponse } from "../types";
import { getTestUser } from "./testUser";

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

async function fake_login(data: LoginCredentialsDTO) {
  return getTestUser();
}
export const loginWithUsernameAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return fake_login(data);
  // return axios.post("/auth/login", data);
};
