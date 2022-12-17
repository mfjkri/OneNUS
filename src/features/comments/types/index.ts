import { BaseEntity } from "types";

export type Comment = {
  text: string;
  author: string;
  postId: number;
  userId: number;
} & BaseEntity;

export enum SortTypes {
  ByNew,
  byHot,
  byRecent,
}
