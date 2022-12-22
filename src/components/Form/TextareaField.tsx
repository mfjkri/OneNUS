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

/*
Textarea element with preset styling, options and error message.

Attributes:
  - variant, size, color, label, resize: Refer to
    https://www.material-tailwind.com/docs/react/textarea
    https://www.material-tailwind.com/docs/react/props/textarea

  - disabled: boolean | undefined
    Whether the textarea is disabled.
  
  - className: string | undefined
    Any additional styling for the textarea element.

  - registration: Partial<UseFormRegisterReturn>
    Relevant props for input validation set by react-hook-form
*/
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
