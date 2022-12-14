import { BaseEntity } from "types";

export type Post = {
  title: string;
  tag: string;
  text: string;
  author: string;
  commentsCount: number;
  commentedAt: number;
  starsCount: number;
} & BaseEntity;

export enum SortTypes {
  ByNew,
  byHot,
  byRecent,
}

export const PostTags = ["general", "cs", "life", "misc"];
