import { UserIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

import { NotFound } from "features/misc";
import { Spinner } from "components/Elements";
import { useAuth } from "lib/auth";

import { useDisclosure } from "hooks/useDisclosure";
import { UTCEpochToLocalDate } from "utils/format";

import { Post } from "../../types";
import { usePost } from "../../api/getPost";
import { StarPost } from "../StarPost";
import { DeletePost } from "./DeletePost";
import { EditPostForm } from "./EditPostForm";

type PostRenderProps = {
  post: Post;
  ownPost: boolean;
  toggleEditMode: () => void;
};

const PostRender = ({ post, ownPost, toggleEditMode }: PostRenderProps) => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-none w-[10%]">
          <UserIcon className="w-auto h-auto" aria-hidden="true" />
          <p className="break-all text-center">{post.author}</p>
          {ownPost && (
            <p className="text-[10px] text-center font-bold text-green-600 dark:text-green-600">
              Me
            </p>
          )}
        </div>
        <div className="grow w-[80%] ml-4">
          <div className="float-right ml-4 pt-1">
            {ownPost ? (
              <div className="flex flex-row rounded-lg p-1 bg-secondary2 dark:bg-primary2">
                <DeletePost postId={post.id} />
                <PencilIcon
                  className="h-6 w-auto ml-2 hover:fill-primary dark:hover:fill-secondary hover:cursor-pointer"
                  onClick={toggleEditMode}
                />
              </div>
            ) : (
              <StarPost starsCount={post.starsCount} />
            )}
          </div>
          <h2 className="text-2xl break-all underline font-extrabold mb-2">
            {post.title}
          </h2>
          <p className="text-md break-words whitespace-pre-line">{post.text}</p>
        </div>
      </div>
      <div className="grow mt-8 text-xs text-right text-gray-700 dark:text-gray-400">
        <p>Posted at: {UTCEpochToLocalDate(post.createdAt)}</p>
        <p>Last modified at: {UTCEpochToLocalDate(post.updatedAt)}</p>
      </div>
    </div>
  );
};

type PostViewProps = {
  postId: number;
};

export const PostView = ({ postId }: PostViewProps) => {
  const { user } = useAuth();
  const { isOpen: editMode, toggle } = useDisclosure(false);
  const postQuery = usePost({ postId });

  if (!user) {
    return null;
  }

  if (postQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!postQuery.data) {
    return <NotFound />;
  }

  return (
    <div>
      {editMode ? (
        <EditPostForm
          post={postQuery.data}
          onSuccess={() => {
            toggle();
            postQuery.refetch();
          }}
          onCancel={toggle}
        />
      ) : (
        <PostRender
          post={postQuery.data}
          ownPost={user.id === postQuery.data.userId}
          toggleEditMode={toggle}
        />
      )}
    </div>
  );
};