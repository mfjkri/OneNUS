import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

import { useAuth } from "lib/auth";

import { UTCEpochToLocalDate } from "utils/format";

import { Post } from "../types";
import { DeletePost } from "./DeletePost";
import { StarPost } from "./StarPost";

type PostViewProps = {
  post: Post;
};

export const PostView = ({ post }: PostViewProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-none w-20">
          <UserIcon className="w-auto h-auto" aria-hidden="true" />
          <p className="text-center">{post.author}</p>
        </div>
        <div className="grow ml-5">
          <div className="float-right mr-2 pt-1">
            {post.author === user?.username ? (
              <div className="flex flex-row">
                <DeletePost postId={post.id} />
                <div className="w-1"></div>
                <PencilIcon
                  className="h-6 w-auto hover:fill-primary dark:hover:fill-secondary hover:cursor-pointer"
                  onClick={() => navigate(`/app/posts/edit/${post.id}`)}
                />
              </div>
            ) : (
              <StarPost starsCount={post.starsCount} />
            )}
          </div>
          <h2 className="text-2xl underline font-extrabold mb-1">
            {post.title}
          </h2>
          <p className="text-md break-words whitespace-pre-line">{post.text}</p>
        </div>
      </div>
      <div className="grow mt-8 text-xs text-right text-gray-700 dark:text-gray-400">
        <p>Created at: {UTCEpochToLocalDate(post.createdAt)}</p>
        <p>Last modified at: {UTCEpochToLocalDate(post.updatedAt)}</p>
      </div>
    </div>
  );
};
