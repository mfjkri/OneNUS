import * as z from "zod";

import { Button } from "components/Elements";
import { Form, TextAreaField } from "components/Form";

import { CreateCommentDTO, useCreateComment } from "../../api/createComment";
import { MAX_COMMENT_TEXT_CHAR } from "config";

export const NewCommentSchema = z.object({
  text: z
    .string()
    .min(1, "Required")
    .max(
      MAX_COMMENT_TEXT_CHAR,
      `Maximum of ${MAX_COMMENT_TEXT_CHAR} characters`
    ),
});

type NewCommentProps = {
  postId: number;
  onSuccess: () => void;
};

export const NewComment = ({ postId, onSuccess }: NewCommentProps) => {
  const createCommentMutation = useCreateComment({ postId: postId });

  return (
    <Form<CreateCommentDTO, typeof NewCommentSchema>
      onSubmit={async (values) => {
        await createCommentMutation.mutateAsync({
          ...values,
          postId: postId,
        });
        onSuccess();
      }}
      schema={NewCommentSchema}
    >
      {({ register, formState }) => (
        <>
          <TextAreaField
            label="Share your thoughts!"
            className="h-20"
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
