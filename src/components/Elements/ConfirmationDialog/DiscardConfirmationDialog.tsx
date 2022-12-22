import { Button } from "../Button";
import { ConfirmationDialog } from "./ConfirmationDialog";

export type DiscardConfirmationDialogProps = {
  onDiscard: () => void;
};

/*
Specific use case of ConfirmationDialog with preset title and body
for discarding changes.

Attributes:
  - onDiscard: function [() => void]
    Callback called after confirming the dialog.
*/
export const DiscardConfirmationDialog = ({
  onDiscard,
}: DiscardConfirmationDialogProps) => {
  return (
    <ConfirmationDialog
      title="Discard changes"
      body="Are you sure you want to discard your changes?"
      triggerButton={
        <Button fullWidth={true} variant="filled" color="red">
          Discard Changes
        </Button>
      }
      confirmButton={
        <Button variant="filled" color="red" onClick={onDiscard}>
          Discard
        </Button>
      }
    />
  );
};
