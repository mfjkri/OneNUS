import clsx from "clsx";
import * as React from "react";
import { FieldError } from "react-hook-form";

/*
Wrapper component around the other form fields (e.g. InputField).
Provides error message functionality, label and description.

Attributes:
  - label: string | undefined
    Label text at the top of the form field.

  - className: string | undefined
    Any additional styling for the wrapper element.

  - children: ReactNode
    Form field components that is wrapped by this component.

  - error: FieldError | undefined
    Error object that is provided by react-hook-form. 
    Error message will be displayed.
*/

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = ({
  label,
  className,
  children,
  error,
}: FieldWrapperProps) => {
  return (
    <div>
      <label
        className={clsx(
          "block text-sm font-medium text-gray-700 dark:text-secondary3",
          className
        )}
      >
        <p className="ml-1">{label}</p>
        <div className="mt-1">{children}</div>
      </label>
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="text-sm font-semibold text-red-500"
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
