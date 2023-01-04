import { Post } from "features/posts";
import { BaseEntity } from "types";

export type User = {
  username: string;
  role: string;
  bio: string;
  starredPosts: Post[];
  postsCount: number;
  commentsCount: number;
} & BaseEntity;
