import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

export type SelectFieldProps = FieldWrapperPassThroughProps &
  React.InputHTMLAttributes<HTMLSelectElement> & {
    options: Option[];
    registration: Partial<UseFormRegisterReturn>;
  };

export const SelectField = React.forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(({ label, options, error, registration, ...props }, ref) => {
  return (
    <FieldWrapper label={label} error={error}>
      <select
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-secondary2 dark:bg-primary2 text-primary dark:text-secondary focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        ref={ref}
        {...props}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
});
