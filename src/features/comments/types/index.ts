import { SortOptions } from "components/Pagination";
import { BaseEntity } from "types";

export type Comment = {
  text: string;
  author: string;
  postId: number;
  userId: number;
} & BaseEntity;

export const CommentSortOptions = new SortOptions(
  [["new", "Sort by creation date"]],
  "new"
);
