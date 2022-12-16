import { BaseEntity } from "types";

export type Comment = {
  text: string;
  author: string;
  postId: number;
  userId: number;
} & BaseEntity;
