import { UserResponse } from "../types";

export const getTestUser = (): UserResponse => {
  return {
    jwt: "jwt123",
    user: {
      id: "testuser",
      username: "password",
    },
  };
};
