import { UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "@material-tailwind/react";
import {
  variant,
  size,
  color,
} from "@material-tailwind/react/types/components/input";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

export type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  variant?: variant;
  size?: size;
  color?: color;
  label?: string;
  resize?: boolean;
  disabled?: boolean;
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const {
    variant,
    size,
    color,
    label,
    resize = true,
    disabled,
    className,
    registration,
    error,
  } = props;
  return (
    <FieldWrapper error={error}>
      <Textarea
        variant={variant}
        size={size}
        color={color}
        label={label}
        resize={resize}
        className={className}
        disabled={disabled}
        error={error?.message !== undefined}
        {...registration}
      />
    </FieldWrapper>
  );
};
