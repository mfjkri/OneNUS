import { PencilIcon } from "@heroicons/react/24/outline";

import { UTCEpochToLocalDate } from "utils/format";
import { useDisclosure } from "hooks/useDisclosure";

import { IconButton } from "components/Elements";
import { AuthUser, UserIcon, UserRoles } from "features/auth";

import { Post } from "../../types";
import { StarPost } from "../StarPost";
import { DeletePost } from "./DeletePost";
import { UpdatePostForm } from "./UpdatePostForm";

type PostViewProps = {
  post: Post;
  canEdit: boolean;
  canDelete: boolean;
  ownPost: boolean;
  toggleEditMode: () => void;
};

const PostView = ({
  post,
  canEdit,
  canDelete,
  ownPost,
  toggleEditMode,
}: PostViewProps) => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="w-12 min-w-[48px] md:w-24 md:min-w-[96px]">
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
        <div className="grow w-[80%] ml-4">
          <div className="float-right ml-4 pt-1">
            {canEdit || canDelete ? (
              <div className="flex flex-row rounded-lg p-1 bg-secondary2 dark:bg-primary2">
                {canDelete && <DeletePost postId={post.id} />}
                {canEdit && (
                  <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    icon={<PencilIcon className="h-6 w-6" />}
                    toolTip="Edit"
                    onClick={toggleEditMode}
                  />
                )}
              </div>
            ) : (
              <StarPost starsCount={post.starsCount} />
            )}
          </div>
          <h2 className="text-2xl break-all font-extrabold mb-2">
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

type ReadPostProps = {
  user: AuthUser;
  post: Post;
  refetch: Function;
};

export const ReadPost = ({ user, post, refetch }: ReadPostProps) => {
  const { isOpen: editMode, toggle } = useDisclosure(false);
  const isOwner = user.id === post.userId;

  return (
    <div>
      {editMode ? (
        <UpdatePostForm
          post={post}
          onSuccess={() => {
            toggle();
            refetch();
          }}
          onCancel={toggle}
        />
      ) : (
        <PostView
          post={post}
          canEdit={isOwner}
          canDelete={isOwner || user.role === UserRoles.ADMIN}
          ownPost={isOwner}
          toggleEditMode={toggle}
        />
      )}
    </div>
  );
};
