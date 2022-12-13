import { BaseEntity } from "types";

export type Post = {
  title: string;
  tag: string;
  text: string;
  author: string;
  repliesCount: number;
} & BaseEntity;

export type CreatePostReponse = {
  postId: string;
};

export enum SortTypes {
  default = "ByNew",
  ByNew = "ByNew",
  byHot = "byHot",
  byRecent = "byRecent",
}
