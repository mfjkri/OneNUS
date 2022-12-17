import * as z from "zod";
import { UserIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

import { Form, TextAreaField } from "components/Form";
import { Button, ConfirmationDialog } from "components/Elements";

import { useDisclosure } from "hooks/useDisclosure";
import { UTCEpochToLocalDate } from "utils/format";

import { Comment } from "../types";
import { DeleteComment } from "./DeleteComment";
import { EditCommentDTO, useEditComment } from "../api/editComment";

const EditPostSchema = z.object({
  text: z.string().min(1, "Required").max(100, "Maximum of 100 characters"),
});

type EditCommentFormProps = {
  comment: Comment;
  onSuccess: () => void;
  onCancel: () => void;
};

const EditCommentForm = ({
  comment,
  onSuccess,
  onCancel,
}: EditCommentFormProps) => {
  const editCommentMutation = useEditComment();

  return (
    <div className="p-4">
      <Form<EditCommentDTO, typeof EditPostSchema>
        onSubmit={async (values) => {
          await editCommentMutation.mutateAsync({
            ...values,
            commentId: comment.id,
          });
          onSuccess();
        }}
        schema={EditPostSchema}
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

type CommentRenderProps = {
  comment: Comment;
  ownComment: boolean;
  toggleEditMode: () => void;
};

export const CommentRender = ({
  comment,
  ownComment,
  toggleEditMode,
}: CommentRenderProps) => {
  return (
    <div className="my-5">
      <div className="flex flex-row h-fit">
        <div className="flex-none w-[10%]">
          <UserIcon className="w-auto h-auto" aria-hidden="true" />
          <p className="break-all text-center">{comment.author}</p>
          {ownComment && (
            <p className="text-[10px] text-center font-bold text-green-600 dark:text-green-600">
              Me
            </p>
          )}
        </div>
        <div className="grow w-[85%] ml-4">
          <div className="float-right ml-4 pt-1">
            {ownComment && (
              <div className="flex flex-row rounded-lg p-1 bg-secondary2 dark:bg-primary2">
                <DeleteComment commentId={comment.id} />
                <PencilIcon
                  className="h-6 w-auto ml-2 hover:fill-primary dark:hover:fill-secondary hover:cursor-pointer"
                  onClick={toggleEditMode}
                />
              </div>
            )}
          </div>
          <p className="text-md break-all whitespace-pre-line">
            {comment.text}
          </p>
        </div>
      </div>
      <div className="grow mt-8 text-xs text-right text-gray-700 dark:text-gray-400">
        <p>Commented at: {UTCEpochToLocalDate(comment.createdAt)}</p>
        <p>Last modified at: {UTCEpochToLocalDate(comment.updatedAt)}</p>
      </div>
    </div>
  );
};

type CommentViewProps = {
  comment: Comment;
  ownComment: boolean;
};

export const CommentView = ({ comment, ownComment }: CommentViewProps) => {
  const { isOpen: editMode, toggle } = useDisclosure(false);
  return (
    <div>
      {editMode ? (
        <EditCommentForm
          comment={comment}
          onSuccess={toggle}
          onCancel={toggle}
        />
      ) : (
        <CommentRender
          comment={comment}
          ownComment={ownComment}
          toggleEditMode={toggle}
        />
      )}
    </div>
  );
};
