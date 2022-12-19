import * as React from "react";
import {
  IconButton as MaterialIconbutton,
  Tooltip,
} from "@material-tailwind/react";
import {
  variant,
  size,
  color,
  ripple,
} from "@material-tailwind/react/types/components/button";

import { Spinner } from "components/Elements/Spinner";

type IconWithToolTipProps = {
  icon: React.ReactElement;
  iconAria?: string;
};

export const IconWithToolTip = ({
  icon,
  iconAria = "",
}: IconWithToolTipProps) => {
  return (
    <>{iconAria === "" ? icon : <Tooltip content={iconAria}>{icon}</Tooltip>}</>
  );
};

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: variant;
  size?: size;
  color?: color;
  ripple?: ripple;
  icon: React.ReactElement;
  iconAria?: string;
  isLoading?: boolean;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { variant, size, color, ripple, icon, iconAria = "", isLoading, ...props },
    ref
  ) => {
    return (
      <MaterialIconbutton
        ref={ref}
        variant={variant}
        size={size}
        color={color}
        ripple={ripple}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size} className="text-current" />
        ) : (
          <IconWithToolTip icon={icon} iconAria={iconAria} />
        )}
      </MaterialIconbutton>
    );
  }
);
