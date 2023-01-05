import clsx from "clsx";
import { Tooltip } from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/menu";

export type InfoTooltipProps = {
  displayText?: string;
  customDisplay?: React.ReactNode;
  infoText: string;
  className?: string;
  placement?: placement;
};

export const InfoTooltip = ({
  displayText = "?",
  customDisplay = null,
  infoText,
  className = "",
  placement,
}: InfoTooltipProps) => {
  return (
    <Tooltip
      className={clsx("whitespace-nowrap", className)}
      content={infoText}
      placement={placement}
    >
      {customDisplay ? (
        customDisplay
      ) : (
        <p className="text-xs w-fit text-primary2 dark:text-secondary2">
          {displayText}
        </p>
      )}
    </Tooltip>
  );
};
