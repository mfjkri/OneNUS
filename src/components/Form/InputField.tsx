import { Input } from "@material-tailwind/react";
import { variant } from "@material-tailwind/react/types/components/input";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password";
  variant?: variant;
  className?: string;
  disabled?: boolean;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = "text",
    variant,
    label,
    className,
    disabled,
    registration,
    error,
  } = props;

  return (
    <FieldWrapper error={error}>
      <Input
        type={type}
        variant={variant}
        label={label}
        className={className}
        disabled={disabled}
        {...registration}
      />
    </FieldWrapper>
  );
};
