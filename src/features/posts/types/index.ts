import { SortOptions } from "components/Pagination";
import { BaseEntity } from "types";

export const PostTagColors = {
  all: "deep-purple",
  general: "blue",
  cs: "red",
  life: "yellow",
  misc: "green",
};

export type PostTag = "all" | "general" | "cs" | "life" | "misc";

export const PostTags = [
  ["general", "General"],
  ["cs", "CS"],
  ["life", "Life"],
  ["misc", "Misc"],
];

export const PostSortOptions = new SortOptions(
  [
    ["hot", "Sort by replies count"],
    ["new", "Sort by creation date"],
    ["recent", "Sort by latest replies"],
  ],
  "new"
);

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
