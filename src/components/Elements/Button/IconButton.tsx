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

import { Spinner } from "components/Elements";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: variant;
  size?: size;
  color?: color;
  ripple?: ripple;
  icon: React.ReactElement;
  tooltip?: string;
  isLoading?: boolean;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { variant, size, color, ripple, icon, tooltip, isLoading, ...props },
    ref
  ) => {
    return (
      <Tooltip content={tooltip}>
        <MaterialIconbutton
          variant={variant}
          size={size}
          color={color}
          ripple={ripple}
          disabled={isLoading}
          ref={ref}
          {...props}
        >
          {isLoading ? <Spinner size={size} variant="light" /> : icon}
        </MaterialIconbutton>
      </Tooltip>
    );
  }
);
