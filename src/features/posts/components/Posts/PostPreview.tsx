import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";

import { Link } from "components/Elements";
import { ProfilePreview, Timestamps } from "components/ThreadDrawer";

import { Post } from "../../types";
import { PostFlair } from "./PostFlair";

export type PostPreviewProps = {
  post: Post;
  postIndex: number;
  ownPost: boolean;
};

export const PostPreview = ({ post, ownPost }: PostPreviewProps) => {
  return (
    <Link to={`/app/posts/${post.id}`}>
      <div
        className={
          `my-2 py-3 pl-2 pr-4 bg-secondary dark:bg-primary hover:bg-secondary2 dark:hover:bg-primary2 hover:opacity-80 ` +
          `text-primary dark:text-secondary rounded-2xl  hover:cursor-pointer group`
        }
      >
        <div className="flex flex-row h-[154px]">
          {/* Post author details */}
          <ProfilePreview
            userId={post.userId}
            author={post.author}
            authorTitle={ownPost ? "Me" : ""}
            showProfileLink={false}
          />

          {/* Post title and contents */}
          <div className="grow flex flex-col max-w-[calc(100%-140px)] md:max-w-[calc(100%-140px)]">
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

        {/* Timestamp */}
        <div className="mt-3">
          <Timestamps createdAt={post.createdAt} />
        </div>
      </div>
    </Link>
  );
};
