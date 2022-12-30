import clsx from "clsx";
import { Tooltip } from "@material-tailwind/react";
import { placement } from "@material-tailwind/react/types/components/menu";

export type InfoTooltipProps = {
  displayText?: string;
  customDisplay?: React.ReactNode;
  infoText: string;
  tooltipclassName?: string;
  tooltipPlacement?: placement;
};

export const InfoTooltip = ({
  displayText = "?",
  customDisplay = null,
  infoText,
  tooltipclassName = "",
  tooltipPlacement,
}: InfoTooltipProps) => {
  return (
    <div>
      <Tooltip
        className={clsx("whitespace-nowrap", tooltipclassName)}
        content={infoText}
        placement={tooltipPlacement}
      >
        {customDisplay ? (
          customDisplay
        ) : (
          <p className="text-xs w-fit text-primary2 dark:text-secondary2">
            {displayText}
          </p>
        )}
      </Tooltip>
    </div>
  );
};
