import * as React from "react";
import { Button as MaterialButton, Tooltip } from "@material-tailwind/react";
import {
  variant,
  size,
  color,
  ripple,
  fullWidth,
} from "@material-tailwind/react/types/components/button";

import { Spinner } from "components/Elements/Spinner";

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: variant;
  size?: size;
  color?: color;
  ripple?: ripple;
  fullWidth?: fullWidth;
  isLoading?: boolean;
  toolTip?: string;
} & IconProps;

/*
Button element with preset styling and options.

Attributes:
  - variant, size, color, ripple, fullWidth: Refer to
    https://www.material-tailwind.com/docs/react/button
    https://www.material-tailwind.com/docs/react/props/button

  - isLoading: boolean | undefined
    If true, the button will be disabled and a spinning icon is displayed as the startIcon

  - toolTip: string | undefined
    Tooltip text to show on hover (if omitted, no tooltip is shown)

  - startIcon, endIcon: React.ReactElement | undefined
    Icons to display either before or after the button text (exclusive or, only one type of icon can be used)

  - ALL OTHER NATIVE BUTTON PROPS
*/
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      color,
      ripple,
      fullWidth,
      isLoading,
      toolTip,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <Tooltip content={toolTip}>
        <MaterialButton
          variant={variant}
          size={size}
          color={color}
          ripple={ripple}
          fullWidth={fullWidth}
          disabled={isLoading}
          ref={ref}
          {...props}
        >
          <div className="flex justify-center items-center m-auto">
            {isLoading && <Spinner size="sm" variant="light" />}
            {!isLoading && startIcon}
            <span className="mx-2">{props.children}</span>{" "}
            {!isLoading && endIcon}
          </div>
        </MaterialButton>
      </Tooltip>
    );
  }
);
