import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password";
  className?: string;
  disabled?: boolean;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = "text",
    label,
    className,
    disabled,
    registration,
    error,
  } = props;

  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        disabled={disabled}
        className={clsx(
          `appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-0 rounded-md shadow-sm placeholder-gray-400 dark:text-secondary dark:bg-primary2 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`,
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
