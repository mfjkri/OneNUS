import { UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "@material-tailwind/react";
import { variant } from "@material-tailwind/react/types/components/input";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  variant?: variant;
  resize?: boolean;
  disabled?: boolean;
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const {
    variant,
    resize = true,
    disabled,
    label,
    className,
    registration,
    error,
  } = props;
  return (
    <FieldWrapper error={error}>
      <Textarea
        variant={variant}
        label={label}
        className={className}
        resize={resize}
        disabled={disabled}
        error={error?.message !== undefined}
        {...registration}
      />
    </FieldWrapper>
  );
};
