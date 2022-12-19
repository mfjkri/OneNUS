import * as React from "react";
import { Button as MaterialButton } from "@material-tailwind/react";
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
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      color,
      ripple,
      fullWidth,
      isLoading,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <MaterialButton
        ref={ref}
        variant={variant}
        size={size}
        color={color}
        ripple={ripple}
        fullWidth={fullWidth}
        disabled={isLoading}
        {...props}
      >
        <div className="flex justify-center items-center m-auto">
          {isLoading && <Spinner size="sm" variant="light" />}
          {!isLoading && startIcon}
          <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
        </div>
      </MaterialButton>
    );
  }
);
