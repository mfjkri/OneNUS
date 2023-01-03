import * as React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { size } from "@material-tailwind/react/types/components/dialog";
import { colors } from "@material-tailwind/react/types/generic";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { Button } from "../Button";
import { useDisclosure } from "hooks/useDisclosure";

/*
Adds a trigger button that upon trigger will present user with a Dialog, with 
possible actions of Confirm and Cancel.

Attributes:
  - triggerButton: React.ReactElement
    Button to trigger / open the Dialog
  
  - confirmButton: React.ReactElement
    Button to confirm / complete the Dialog
  
  - title: string
    Title of the Dialog
  
  - body: string | undefined
    Body of the Dialog. Defaults to an empty body "".

  - cancelButtonText: string | undefined
    Text displayed on the Cancel Dialog button. Defaults to "Cancel".

  - cancelButtonColor: colors | undefined
    Color of the Cancel Dialog button. Defaults to "blue".
  
  - icon: "danger" | "info" | ""
    Whether to add an Icon to the Dialog. Defaults to no icon.

  - size: size | undefined
    Size of the Dialog window. Defaults to "sm".
  
  - isDone: boolean | undefined
    Whether the Dialog is completed. Defaults to false.
  
  - ALL OTHER NATIVE DIALOG PROPS
*/

const DangerIcon = () => {
  return (
    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-opacity-5 sm:mx-0 sm:h-10 sm:w-10">
      <ExclamationCircleIcon
        className="h-6 w-6 text-red-600"
        aria-hidden="true"
      />
    </div>
  );
};

const InfoIcon = () => {
  return (
    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
      <InformationCircleIcon
        className="h-6 w-6 text-blue-600"
        aria-hidden="true"
      />
    </div>
  );
};

export type ConfirmationDialogProps = {
  triggerButton: React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  cancelButtonColor?: colors;
  icon?: "danger" | "info" | "";
  size?: size;
  isDone?: boolean;
};

export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  title,
  body = "",
  cancelButtonText = "Cancel",
  cancelButtonColor = "blue",
  icon = "",
  size = "sm",
  isDone = false,
}: ConfirmationDialogProps) => {
  const { close, open, isOpen } = useDisclosure();

  React.useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  const trigger = React.cloneElement(triggerButton, {
    onClick: open,
  });

  return (
    <React.Fragment>
      {trigger}
      <Dialog open={isOpen} handler={open} size={size}>
        <DialogHeader>
          {icon !== "" && (
            <div className="mr-3">
              {icon === "danger" && <DangerIcon />}

              {icon === "info" && <InfoIcon />}
            </div>
          )}
          {title}
        </DialogHeader>
        <DialogBody>{body}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color={cancelButtonColor}
            onClick={close}
            className="mr-1"
          >
            <span>{cancelButtonText}</span>
          </Button>
          {confirmButton}
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
};
