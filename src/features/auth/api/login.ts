// import { axios } from "lib/axios";

import { UserResponse } from "../types";
import { getTestUser } from "./testUser";

import { delay } from "utils/delay";
import { ARTIFICIAL_DELAY } from "config";

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

async function fake_login(data: LoginCredentialsDTO) {
  await delay(ARTIFICIAL_DELAY);
  return getTestUser();
}
export const loginWithUsernameAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return fake_login(data);
  // return axios.post("/auth/login", data);
};
