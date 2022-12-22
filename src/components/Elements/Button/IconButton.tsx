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

/*
Button element with just icon instead of text.

Attributes:
  - variant, size, color, ripple: Refer to
    https://www.material-tailwind.com/docs/react/icon-button
    https://www.material-tailwind.com/docs/react/props/icon-button

  - icon: React.ReactElement
    Icon to display as the button

  - toolTip: string | undefined
    Tooltip text to show on hover (if omitted, no tooltip is shown)

  - isLoading: boolean | undefined
    If true, the button will be disabled and a spinning icon is displayed instead of the icon

  - ALL OTHER NATIVE BUTTON PROPS
*/
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
