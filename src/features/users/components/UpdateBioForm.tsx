import * as z from "zod";

import { Form, TextAreaField } from "components/Form";
import { Button, DiscardConfirmationDialog } from "components/Elements";
import { MAX_USER_BIO_CHAR } from "config";

import { UpdateBioDTO, useUpdateBio } from "../api/updateBio";

const UpdateBioSchema = z.object({
  bio: z
    .string()
    .min(1, "Required")
    .max(MAX_USER_BIO_CHAR, `Maximum of ${MAX_USER_BIO_CHAR} characters`),
});

type UpdateBioFormProps = {
  currentBio?: string;
  onSuccess: () => void;
  onCancel: () => void;
};

export const UpdateBioForm = ({
  currentBio = "",
  onSuccess,
  onCancel,
}: UpdateBioFormProps) => {
  const updateBioMutation = useUpdateBio();

  return (
    <Form<UpdateBioDTO, typeof UpdateBioSchema>
      onSubmit={async (values) => {
        await updateBioMutation.mutateAsync({
          ...values,
        });
        onSuccess();
      }}
      schema={UpdateBioSchema}
    >
      {({ register, formState }) => (
        <>
          <TextAreaField
            label="Bio"
            error={formState.errors["bio"]}
            registration={register("bio", { value: currentBio })}
          />
          <div>
            <Button
              type="submit"
              className="w-full mb-2"
              isLoading={updateBioMutation.isLoading}
            >
              Update Bio
            </Button>

            <DiscardConfirmationDialog onDiscard={onCancel} />
          </div>
        </>
      )}
    </Form>
  );
};
