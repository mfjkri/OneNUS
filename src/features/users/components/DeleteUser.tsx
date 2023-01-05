import { Button, ConfirmationDialog } from "components/Elements";

import { useDeleteUser } from "../api/deleteUser";
import { useAuth } from "lib/auth";

export const DeleteUser = () => {
  const { logout } = useAuth();
  const deleteUserMutation = useDeleteUser({ logoutFn: logout });

  return (
    <ConfirmationDialog
      title="Deleting account"
      body="Are you sure you want to delete your account?"
      icon="danger"
      isDone={deleteUserMutation.isSuccess}
      triggerButton={
        <Button color="red" fullWidth={true}>
          Delete account
        </Button>
      }
      confirmButton={
        <Button
          color="red"
          isLoading={deleteUserMutation.isLoading}
          onClick={async () => {
            await deleteUserMutation.mutateAsync(undefined);
          }}
        >
          Delete
        </Button>
      }
    />
  );
};
