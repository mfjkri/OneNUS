import { BaseEntity } from "types";

export type Post = {
  title: string;
  tag: string;
  text: string;
  author: string;
  repliesCount: number;
} & BaseEntity;
