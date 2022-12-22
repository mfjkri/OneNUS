import * as React from "react";
import { Input } from "@material-tailwind/react";
import {
  variant,
  size,
  color,
  icon,
} from "@material-tailwind/react/types/components/input";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

export type InputFieldProps = FieldWrapperPassThroughProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    type?: "text" | "email" | "password";
    variant?: variant;
    size?: size;
    color?: color;
    icon?: icon;
    label?: string;
    registration: Partial<UseFormRegisterReturn>;
  };

/*
Input element with preset styling, options and error message.

Attributes:
  - variant, size, color, icon, label: Refer to
    https://www.material-tailwind.com/docs/react/input
    https://www.material-tailwind.com/docs/react/props/input

  - registration: Partial<UseFormRegisterReturn>
    Relevant props for input validation set by react-hook-form

  - ALL OTHER NATIVE INPUT PROPS
*/
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type = "text",
      variant,
      size,
      color,
      icon,
      label,
      registration,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <FieldWrapper error={error}>
        <Input
          type={type}
          variant={variant}
          size={size}
          color={color}
          icon={icon}
          label={label}
          error={error?.message !== undefined}
          ref={ref}
          {...props}
          {...registration}
        />
      </FieldWrapper>
    );
  }
);
