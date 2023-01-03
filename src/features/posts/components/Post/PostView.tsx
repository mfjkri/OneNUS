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
import { StarPost } from "./StarPost";
import { Post } from "../../types";

export type PostViewProps = {
  user: AuthUser;
  post: Post;
  refetchPost: () => void;
};

export const PostView = ({ user, post, refetchPost }: PostViewProps) => {
  const { isOpen: editMode, toggle } = useDisclosure(false);

  const onEditSucess = useCallback(() => {
    toggle();
    refetchPost();
  }, [refetchPost, toggle]);

  const isOwner = user.id === post.userId;
  const authorTitle = isOwner ? "Me" : "";

  return (
    <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl p-7">
      {editMode ? (
        // Editing Post form
        <UpdatePostForm
          post={post}
          onSuccess={onEditSucess}
          onCancel={toggle}
        />
      ) : (
        <>
          {/* Post author name (only shown if on a small resolution size) */}
          <InlineProfilePreview
            userId={post.userId}
            author={post.author}
            authorTitle={authorTitle}
            actionText="Posted by"
          />

          <div className="flex flex-row">
            {/* Post author avatar and name */}
            <ProfilePreview
              userId={post.userId}
              author={post.author}
              authorTitle={authorTitle}
              showProfileLink={true}
              responsiveHide={true}
            />

            <div className="grow w-[80%]">
              {/* Post Controls (Star, Edit and Delete) */}
              <div className="float-right ml-4 pt-1">
                <Controls
                  canEdit={isOwner}
                  canDelete={isOwner || user.role === UserRoles.ADMIN}
                  deleteControls={<DeletePost postId={post.id} />}
                  altControls={<StarPost starsCount={post.starsCount} />}
                  toggleEditMode={toggle}
                />
              </div>

              {/* Post title and text */}
              <h2 className="text-2xl break-all font-extrabold mb-2">
                {post.title}
              </h2>
              <p className="text-md break-words whitespace-pre-line">
                {post.text}
              </p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="mt-8">
            <Timestamps createdAt={post.createdAt} updatedAt={post.updatedAt} />
          </div>
        </>
      )}
    </div>
  );
};
