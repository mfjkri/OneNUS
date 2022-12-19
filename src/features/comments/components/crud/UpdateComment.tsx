import { Form, TextAreaField } from "components/Form";
import { Button, DiscardConfirmationDialog } from "components/Elements";

import { Comment } from "../../types";
import { UpdateCommentDTO, useUpdateComment } from "../../api/updateComment";
import { CreateCommentSchema } from "./CreateComment";

type UpdateCommentFormProps = {
  comment: Comment;
  onSuccess: () => void;
  onCancel: () => void;
};

export const UpdateCommentForm = ({
  comment,
  onSuccess,
  onCancel,
}: UpdateCommentFormProps) => {
  const updateCommentMutation = useUpdateComment({ postId: comment.postId });

  return (
    <div className="p-4">
      <Form<UpdateCommentDTO, typeof CreateCommentSchema>
        onSubmit={async (values) => {
          await updateCommentMutation.mutateAsync({
            ...values,
            commentId: comment.id,
          });
          onSuccess();
        }}
        schema={CreateCommentSchema}
      >
        {({ register, formState }) => (
          <>
            <TextAreaField
              label="Now editing comment:"
              className="h-20"
              error={formState.errors["text"]}
              registration={register("text", { value: comment.text })}
            />
            <div className="flex flex-row">
              <div className="grow"></div>
              <div className="flex flex-row">
                <DiscardConfirmationDialog onDiscard={onCancel} />
                <Button
                  type="submit"
                  fullWidth={true}
                  className="ml-3"
                  isLoading={updateCommentMutation.isLoading}
                >
                  Update
                </Button>
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
