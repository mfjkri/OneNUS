import { useCallback } from "react";

import {
  ProfilePreview,
  Controls,
  Timestamps,
  InlineProfilePreview,
} from "components/ThreadDrawer";
import { useDisclosure } from "hooks/useDisclosure";
import { AuthUser, UserRoles } from "features/auth";

import { UpdatePostForm } from "./UpdatePostForm";
import { DeletePost } from "./DeletePost";
import { StarPost } from "../StarPost";
import { Post } from "../../types";

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
  const authorTitle = ownPost ? "Me" : "";

  return (
    <>
      <InlineProfilePreview
        userId={post.userId}
        author={post.author}
        authorTitle={authorTitle}
        actionText="Posted by"
      />
      <div className="flex flex-row">
        <ProfilePreview
          userId={post.userId}
          author={post.author}
          authorTitle={authorTitle}
          showProfileLink={true}
          responsiveHide={true}
        />
        <div className="grow w-[80%]">
          <div className="float-right ml-4 pt-1">
            <Controls
              canEdit={canEdit}
              canDelete={canDelete}
              deleteControls={<DeletePost postId={post.id} />}
              altControls={<StarPost starsCount={post.starsCount} />}
              toggleEditMode={toggleEditMode}
            />
          </div>
          <h2 className="text-2xl break-all font-extrabold mb-2">
            {post.title}
          </h2>
          <p className="text-md break-words whitespace-pre-line">{post.text}</p>
        </div>
      </div>
      <div className="mt-8">
        <Timestamps createdAt={post.createdAt} updatedAt={post.updatedAt} />
      </div>
    </>
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

  const onEditSucess = useCallback(() => {
    toggle();
    refetch();
  }, [refetch, toggle]);

  return (
    <>
      {editMode ? (
        <UpdatePostForm
          post={post}
          onSuccess={onEditSucess}
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
    </>
  );
};
