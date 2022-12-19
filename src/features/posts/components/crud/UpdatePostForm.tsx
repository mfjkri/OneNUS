import * as z from "zod";

import { Form, InputField, TextAreaField } from "components/Form";
import { Button, DiscardConfirmationDialog } from "components/Elements";

import { MAX_POST_TEXT_CHAR, MAX_POST_TITLE_CHAR } from "config";

import { Post } from "../../types";
import { UpdatePostDTO, useUpdatePost } from "../../api/updatePost";

const UpdatePostSchema = z.object({
  title: z
    .string()
    .min(1, "Required")
    .max(MAX_POST_TITLE_CHAR, `Maximum of ${MAX_POST_TITLE_CHAR} characters`),
  text: z
    .string()
    .min(1, "Required")
    .max(MAX_POST_TEXT_CHAR, `Maximum of ${MAX_POST_TEXT_CHAR} characters`),
});

type UpdatePostFormProps = {
  post: Post;
  onSuccess: () => void;
  onCancel: () => void;
};

export const UpdatePostForm = ({
  post,
  onSuccess,
  onCancel,
}: UpdatePostFormProps) => {
  const updatePostMutation = useUpdatePost();

  return (
    <div>
      <Form<UpdatePostDTO, typeof UpdatePostSchema>
        onSubmit={async (values) => {
          await updatePostMutation.mutateAsync({
            ...values,
            postId: post.id,
          });
          onSuccess();
        }}
        schema={UpdatePostSchema}
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
              className="h-72"
              error={formState.errors["text"]}
              registration={register("text", { value: post.text })}
            />
            <div>
              <Button
                type="submit"
                className="w-full mb-2"
                isLoading={updatePostMutation.isLoading}
              >
                Update Post
              </Button>

              <DiscardConfirmationDialog onDiscard={onCancel} />
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
