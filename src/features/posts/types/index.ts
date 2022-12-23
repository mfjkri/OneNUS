import { BaseEntity } from "types";

export const PostTagColors = {
  general: "blue",
  cs: "red",
  life: "yellow",
  misc: "green",
};

export type PostTag = "general" | "cs" | "life" | "misc";

export const PostTags = [
  ["general", "General"],
  ["cs", "CS"],
  ["life", "Life"],
  ["misc", "Misc"],
];

export type Post = {
  title: string;
  tag: PostTag;
  text: string;

  author: string;
  userId: number;

  commentsCount: number;
  commentedAt: number;

  starsCount: number;
} & BaseEntity;

export enum SortTypes {
  ByNew,
  byHot,
  byRecent,
}
