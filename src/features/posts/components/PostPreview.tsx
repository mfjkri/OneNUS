import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";

import { Link } from "components/Elements";
import { Timestamps } from "components/Timestamps";
import { UserIcon } from "features/auth";

import { Post } from "../types";
import { PostFlair } from "./PostFlair";

type PostPreviewProps = {
  post: Post;
  postIndex: number;
  ownPost: boolean;
};

export const PostPreview = ({ post, ownPost }: PostPreviewProps) => {
  return (
    <Link to={`./${post.id}`}>
      <div
        className={
          `my-2 py-3 pl-2 pr-4 bg-secondary dark:bg-primary hover:bg-secondary2 dark:hover:bg-primary2 hover:opacity-80 ` +
          `text-primary dark:text-secondary rounded-2xl  hover:cursor-pointer group`
        }
      >
        <div className="flex flex-row h-40">
          <div className="w-12 min-w-[48px] md:w-24 md:min-w-[96px] flex flex-col">
            <UserIcon
              className="w-auto h-auto"
              userId={post.userId}
              username={post.author}
            />
            <div className="h-[25%] flex flex-col ">
              <p className="h-[50%] invisible md:visible break-all text-center">
                {post.author}
              </p>
              {ownPost && (
                <p className="h-[50%] invisible md:visible text-[10px] text-center font-bold text-green-600 dark:text-green-600">
                  Me
                </p>
              )}
            </div>
          </div>
          <div className="grow flex flex-col ml-4 max-w-[calc(100%-64px)] md:max-w-[calc(100%-112px)]">
            <div className="h-fit">
              <div className="float-right ml-4">
                <div className="flex flex-col">
                  <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
                  <p className="text-center text-[12px]">
                    {post.commentsCount}
                  </p>
                </div>
              </div>
              <div className="flex flex-row my-auto">
                <h2 className="text-xl break-all font-bold truncate text-ellipsis group-hover:underline mr-4">
                  {post.title}
                </h2>
                <PostFlair category={post.tag} />
              </div>
            </div>
            <p className="text-md break-all whitespace-pre-line truncate text-ellipsis grow">
              {post.text}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <Timestamps createdAt={post.createdAt} />
        </div>
      </div>
    </Link>
  );
};
