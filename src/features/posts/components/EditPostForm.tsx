import * as z from "zod";

import { Button, ConfirmationDialog, Link, Spinner } from "components/Elements";
import { Form, InputField, TextAreaField } from "components/Form";

import { EditPostDTO, useEditPost } from "../api/editPost";
import { usePost } from "../api/getPost";

export const EditPostSchema = z.object({
  title: z.string().min(1, "Required").max(100, "Maximum of 100 characters"),
  text: z.string().min(1, "Required").max(5000, "Maximum of 5000 characters"),
});

type EditPostFormProps = {
  postId: string | undefined;
  onSuccess: () => void;
};

export const EditPostForm = ({ postId, onSuccess }: EditPostFormProps) => {
  const editPostMutation = useEditPost();
  const postQuery = usePost({ postId });

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
      <Form<EditPostDTO, typeof EditPostSchema>
        onSubmit={async (values) => {
          await editPostMutation.mutateAsync({
            ...values,
            postId: postQuery.data.id,
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
                value: postQuery.data.title,
              })}
            />
            <TextAreaField
              label="Body"
              className="h-96"
              error={formState.errors["text"]}
              registration={register("text", { value: postQuery.data.text })}
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
                  <Link to="/app/posts">
                    <Button className="w-full" variant="danger">
                      Discard
                    </Button>
                  </Link>
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
