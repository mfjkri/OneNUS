import { AuthUser } from "features/auth";

import { Post } from "../types";
import { PostPreview } from "./PostPreview";

type PostsListProps = {
  posts: Post[];
  user: AuthUser;
};

const NoPosts = () => {
  return <div className="px-6 py-4">No Posts</div>;
};

export const PostsList = ({ posts, user }: PostsListProps) => {
  return (
    <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl">
      {posts ? (
        <ul className="divide-y divide-dashed px-6 py-2">
          {posts.map((post: Post, postIndex: number) => (
            <li key={postIndex}>
              <PostPreview
                post={post}
                postIndex={postIndex}
                ownPost={user.id === post.userId}
              />
            </li>
          ))}
        </ul>
      ) : (
        <NoPosts />
      )}
    </div>
  );
};
