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

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: variant;
  size?: size;
  color?: color;
  ripple?: ripple;
  icon: React.ReactElement;
  toolTip?: string;
  isLoading?: boolean;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { variant, size, color, ripple, icon, toolTip, isLoading, ...props },
    ref
  ) => {
    return (
      <MaterialIconbutton
        variant={variant}
        size={size}
        color={color}
        ripple={ripple}
        disabled={isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size} variant="light" />
        ) : (
          <Tooltip content={toolTip}>{icon}</Tooltip>
        )}
      </MaterialIconbutton>
    );
  }
);
