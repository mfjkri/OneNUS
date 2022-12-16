export type AuthUser = {
  id: number;
  username: string;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
