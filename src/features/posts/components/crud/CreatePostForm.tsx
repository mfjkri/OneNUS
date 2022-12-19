import * as z from "zod";
import { useNavigate } from "react-router-dom";

import { Button, DiscardConfirmationDialog } from "components/Elements";
import { Form, InputField, TextAreaField, SelectField } from "components/Form";

import { MAX_POST_TEXT_CHAR, MAX_POST_TITLE_CHAR } from "config";

import { CreatePostDTO, useCreatePost } from "../../api/createPost";
import { PostTags } from "../../types";

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, "Required")
    .max(MAX_POST_TITLE_CHAR, `Maximum of ${MAX_POST_TITLE_CHAR} characters`),
  text: z
    .string()
    .min(1, "Required")
    .max(MAX_POST_TEXT_CHAR, `Maximum of ${MAX_POST_TEXT_CHAR} characters`),
  tag: z.string().min(1, "Required"),
});

type CreatePostFormProps = {
  onSuccess: () => void;
};

export const CreatePostForm = ({ onSuccess }: CreatePostFormProps) => {
  const createPostMutation = useCreatePost();
  const navigate = useNavigate();

  return (
    <Form<CreatePostDTO, typeof CreatePostSchema>
      onSubmit={async (values) => {
        await createPostMutation.mutateAsync(values);
        onSuccess();
      }}
      schema={CreatePostSchema}
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
              className="w-full mb-2"
              isLoading={createPostMutation.isLoading}
            >
              Create Post
            </Button>

            <DiscardConfirmationDialog
              onDiscard={() => navigate("/app/posts")}
            />
          </div>
        </>
      )}
    </Form>
  );
};
