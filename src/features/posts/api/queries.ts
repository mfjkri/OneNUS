import { GetPostsDTO } from "./getPosts";

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (listDetails: GetPostsDTO) =>
    [...postKeys.lists(), { ...listDetails }] as const,
  posts: () => [...postKeys.all, "detail"] as const,
  post: (id: number) => [...postKeys.posts(), id] as const,
};
