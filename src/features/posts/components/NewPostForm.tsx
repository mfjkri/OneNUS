import * as z from "zod";

import { Button, ConfirmationDialog, Link } from "components/Elements";
import { Form, InputField, TextAreaField, SelectField } from "components/Form";

import { CreatePostDTO, useCreatePost } from "../api/createPost";
import { PostTags } from "../types";

export const NewPostSchema = z.object({
  title: z.string().min(1, "Required").max(100, "Maximum of 100 characters"),
  text: z.string().min(1, "Required").max(2500, "Maximum of 2500 characters"),
  tag: z.string().min(1, "Required"),
});

type NewPostFormProps = {
  onSuccess: () => void;
};

export const NewPostForm = ({ onSuccess }: NewPostFormProps) => {
  const createPostMutation = useCreatePost();

  return (
    <Form<CreatePostDTO, typeof NewPostSchema>
      onSubmit={async (values) => {
        await createPostMutation.mutateAsync(values);
        onSuccess();
      }}
      schema={NewPostSchema}
    >
      {({ register, formState }) => (
        <>
          <InputField
            type="text"
            label="Title"
            error={formState.errors["title"]}
            registration={register("title")}
          />
          <TextAreaField
            label="Body"
            className="h-96"
            error={formState.errors["text"]}
            registration={register("text")}
          />
          <SelectField
            label="Category"
            className="bg-primary dark:bg-secondary "
            error={formState.errors["tag"]}
            registration={register("tag")}
            options={PostTags.map((type) => ({
              label: type,
              value: type,
            }))}
          />
          <div>
            <Button
              type="submit"
              className="w-full"
              isLoading={createPostMutation.isLoading}
            >
              Create Post
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
              title="Are you sure you want to discard this post?"
            />
          </div>
        </>
      )}
    </Form>
  );
};
