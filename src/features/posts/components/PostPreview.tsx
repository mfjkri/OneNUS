import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";

import { Link } from "components/Elements";
import { UserIcon } from "features/auth";

import { UTCEpochToLocalDate } from "utils/format";

import { Post } from "../types";

type PostPreviewProps = {
  post: Post;
  postIndex: number;
  ownPost: boolean;
};

export const PostPreview = ({ post, ownPost }: PostPreviewProps) => {
  return (
    <Link to={`./${post.id}`}>
      <div className="my-5 pr-5 text-primary dark:text-secondary hover:opacity-50 hover:cursor-pointer">
        <div className="flex flex-row h-24">
          <div className="flex-none w-[10%]">
            <UserIcon
              className="w-auto h-auto"
              userId={post.userId}
              username={post.author}
            />
            <p className="break-all text-center">{post.author}</p>
            {ownPost && (
              <p className="text-[10px] text-center font-bold text-green-600 dark:text-green-600">
                Me
              </p>
            )}
          </div>
          <div className="grow w-[85%] ml-4">
            <div className="float-right ml-4 pt-1">
              <div className="flex flex-col">
                <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
                <p className="text-center text-[12px]">{post.commentsCount}</p>
              </div>
            </div>
            <h2 className="text-xl break-all underline font-bold mb-2 truncate text-ellipsis">
              {post.title}
            </h2>
            <p className="text-md break-all whitespace-pre-line truncate text-ellipsis max-h-[100%]">
              {post.text}
            </p>
          </div>
        </div>
        <div className="grow mt-10 text-xs text-right text-gray-700 dark:text-gray-400">
          <p>Posted at: {UTCEpochToLocalDate(post.createdAt)}</p>
        </div>
      </div>
    </Link>
  );
};
