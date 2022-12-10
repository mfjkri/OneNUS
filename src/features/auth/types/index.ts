export type AuthUser = {
  id: string;
  username: string;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
