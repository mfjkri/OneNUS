export type AuthUser = {
  id: number;
  username: string;
  role: string;
  postsCount: number;
  commentsCount: number;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};

export enum UserRoles {
  ADMIN = "admin",
  MEMBER = "member",
}
