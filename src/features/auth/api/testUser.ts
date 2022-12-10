import { UserResponse } from "../types";
import { LoginCredentialsDTO } from "./login";

export const getTestUser = (data: LoginCredentialsDTO): UserResponse => {
  return {
    jwt: "jwttest",
    user: {
      id: "idtest",
      username: "test",
    },
  };
};
