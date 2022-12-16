import * as z from "zod";
import { UserIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

import { Form, InputField, TextAreaField } from "components/Form";
import { Button, ConfirmationDialog, Spinner } from "components/Elements";
import { useAuth } from "lib/auth";

import { useDisclosure } from "hooks/useDisclosure";
import { UTCEpochToLocalDate } from "utils/format";

import { Post } from "../types";
import { DeletePost } from "./DeletePost";
import { StarPost } from "./StarPost";
import { EditPostDTO, useEditPost } from "../api/editPost";
import { usePost } from "../api/getPost";

const EditPostSchema = z.object({
  title: z.string().min(1, "Required").max(100, "Maximum of 100 characters"),
  text: z.string().min(1, "Required").max(5000, "Maximum of 5000 characters"),
});

type EditPostFormProps = {
  post: Post;
  onSuccess: () => void;
  onCancel: () => void;
};

const EditPostForm = ({ post, onSuccess, onCancel }: EditPostFormProps) => {
  const editPostMutation = useEditPost();

  return (
    <div>
      <Form<EditPostDTO, typeof EditPostSchema>
        onSubmit={async (values) => {
          await editPostMutation.mutateAsync({
            ...values,
            postId: post.id,
          });
          onSuccess();
        }}
        schema={EditPostSchema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              className="hover:cursor-not-allowed"
              disabled={true}
              label="Title"
              error={formState.errors["title"]}
              registration={register("title", {
                value: post.title,
              })}
            />
            <TextAreaField
              label="Body"
              className="h-96"
              error={formState.errors["text"]}
              registration={register("text", { value: post.text })}
            />
            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={editPostMutation.isLoading}
              >
                Update Post
              </Button>

              <ConfirmationDialog
                triggerButton={
                  <Button className="mt-2 w-full" variant="danger">
                    Discard Changes
                  </Button>
                }
                confirmButton={
                  <Button variant="danger" onClick={onCancel}>
                    Discard
                  </Button>
                }
                title="Are you sure you want to discard your changes?"
              />
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

type PostRenderProps = {
  post: Post;
  ownPost: boolean;
  toggleEditMode: () => void;
};

const PostRender = ({ post, ownPost, toggleEditMode }: PostRenderProps) => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="flex-none w-20">
          <UserIcon className="w-auto h-auto" aria-hidden="true" />
          <p className="text-center">{post.author}</p>
        </div>
        <div className="grow ml-5">
          <div className="float-right mr-2 pt-1">
            {ownPost ? (
              <div className="flex flex-row">
                <DeletePost postId={post.id} />
                <div className="w-1"></div>
                <PencilIcon
                  className="h-6 w-auto hover:fill-primary dark:hover:fill-secondary hover:cursor-pointer"
                  onClick={toggleEditMode}
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

type PostViewProps = {
  postId: string;
};

export const PostView = ({ postId }: PostViewProps) => {
  const { user } = useAuth();
  const { isOpen, toggle } = useDisclosure(false);
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
    return null;
  }

  return (
    <div>
      {isOpen ? (
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
          ownPost={user.username === postQuery.data.author}
          toggleEditMode={toggle}
        />
      )}
    </div>
  );
};
