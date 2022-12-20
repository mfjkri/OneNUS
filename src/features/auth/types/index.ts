export type AuthUser = {
  id: number;
  username: string;
  role: string;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};

export enum UserRoles {
  ADMIN = "admin",
  MEMBER = "member",
}
