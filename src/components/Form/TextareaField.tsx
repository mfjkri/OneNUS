import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { label, className, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        className={clsx(
          `appearance-none block w-full px-3 py-2 border dark:border-0 border-gray-400 rounded-md shadow-sm placeholder-gray-400 dark:text-secondary dark:bg-primary2
          focus:outline-none focus:border-2 focus:ring-[#2196f3] focus:border-[#2196f3] dark:focus:border-[#2196f3] sm:text-sm`,
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
