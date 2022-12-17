import { Form, TextAreaField } from "components/Form";
import { Button, ConfirmationDialog } from "components/Elements";

import { Comment } from "../../types";
import { EditCommentDTO, useEditComment } from "../../api/editComment";
import { NewCommentSchema } from "./NewComment";

type EditCommentFormProps = {
  comment: Comment;
  onSuccess: () => void;
  onCancel: () => void;
};

export const EditCommentForm = ({
  comment,
  onSuccess,
  onCancel,
}: EditCommentFormProps) => {
  const editCommentMutation = useEditComment();

  return (
    <div className="p-4">
      <Form<EditCommentDTO, typeof NewCommentSchema>
        onSubmit={async (values) => {
          await editCommentMutation.mutateAsync({
            ...values,
            commentId: comment.id,
          });
          onSuccess();
        }}
        schema={NewCommentSchema}
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
                <ConfirmationDialog
                  triggerButton={
                    <Button variant="danger">Discard Changes</Button>
                  }
                  confirmButton={
                    <Button variant="danger" onClick={onCancel}>
                      Discard
                    </Button>
                  }
                  title="Are you sure you want to discard your changes?"
                />
                <Button
                  type="submit"
                  className="ml-3"
                  isLoading={editCommentMutation.isLoading}
                >
                  Update Comment
                </Button>
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
