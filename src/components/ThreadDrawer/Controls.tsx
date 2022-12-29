import { PencilIcon } from "@heroicons/react/24/outline";

import { IconButton } from "components/Elements";

export type ControlsProps = {
  canEdit: boolean;
  canDelete: boolean;
  deleteControls?: React.ReactNode;
  altControls?: React.ReactNode;
  toggleEditMode: () => void;
};

export const Controls = ({
  canEdit,
  canDelete,
  deleteControls = null,
  altControls = null,
  toggleEditMode,
}: ControlsProps) => {
  return (
    <>
      {canEdit || canDelete ? (
        <div className="flex flex-row rounded-lg p-1 bg-secondary2 dark:bg-primary2">
          {canDelete && deleteControls && deleteControls}
          {canEdit && (
            <IconButton
              variant="text"
              color="white"
              size="sm"
              icon={<PencilIcon className="h-6 w-6" />}
              toolTip="Edit"
              onClick={toggleEditMode}
            />
          )}
        </div>
      ) : (
        altControls && altControls
      )}
    </>
  );
};
