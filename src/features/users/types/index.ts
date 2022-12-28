import { BaseEntity } from "types";

export type User = {
  username: string;
  role: string;
  bio: string;
  postsCount: number;
  commentsCount: number;
} & BaseEntity;
