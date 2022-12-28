import clsx from "clsx";
import { Link as RouterLink, LinkProps } from "react-router-dom";

/*
Wrapper around Link from react-router-dom that will route users to another
page upon clicking.
*/
export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={clsx(
        "text-indigo-300 dark:text-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-300",
        className
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
