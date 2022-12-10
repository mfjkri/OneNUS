// import { axios } from "lib/axios";

import { AuthUser } from "../types";
import { getTestUser } from "./testUser";

async function testUser(): Promise<AuthUser> {
  return getTestUser().user;
}

export const getUser = (): Promise<AuthUser> => {
  return testUser();
  // return axios.get("/auth/me");
};
