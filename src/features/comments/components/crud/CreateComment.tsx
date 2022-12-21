import * as z from "zod";

import { Button } from "components/Elements";
import { Form, TextAreaField } from "components/Form";

import { CreateCommentDTO, useCreateComment } from "../../api/createComment";
import { MAX_COMMENT_TEXT_CHAR } from "config";

export const CreateCommentSchema = z.object({
  text: z
    .string()
    .min(1, "Required")
    .max(
      MAX_COMMENT_TEXT_CHAR,
      `Maximum of ${MAX_COMMENT_TEXT_CHAR} characters`
    ),
});

type CreateCommentProps = {
  postId: number;
  onSuccess: () => void;
};

export const CreateComment = ({ postId, onSuccess }: CreateCommentProps) => {
  const createCommentMutation = useCreateComment({ postId: postId });

  return (
    <Form<CreateCommentDTO, typeof CreateCommentSchema>
      onSubmit={async (values) => {
        await createCommentMutation.mutateAsync({
          ...values,
          postId: postId,
        });
        onSuccess();
      }}
      schema={CreateCommentSchema}
    >
      {({ register, formState }) => (
        <>
          <TextAreaField
            label="Share your thoughts!"
            className="h-20 bg-secondary2 dark:bg-gray-900"
            error={formState.errors["text"]}
            registration={register("text")}
          />
          <div className="flex flex-row -translate-y-2">
            <div className="grow"></div>
            <div className="flex flex-row">
              <Button
                type="submit"
                className="ml-3"
                isLoading={createCommentMutation.isLoading}
              >
                Comment
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  );
};
