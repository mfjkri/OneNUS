import * as React from "react";
import * as z from "zod";

import { Link } from "components/Elements";
import { Head } from "components/Head";
import { Footer } from "components/Layout";
import { isAlphaOnlyString } from "utils/strings";
import logo from "assets/logo.svg";

export const AuthInputSchema = z.object({
  username: z
    .string()
    .min(1, "Required")
    .max(10, "Maximum of 10 characters")
    .refine((val) => isAlphaOnlyString(val), {
      message: "Only alphabetical letters allowed",
    }),
  password: z.string().min(1, "Required").max(32, "Maximum of 32 characters"),
});

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8  text-secondary">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link className="flex items-center" to="/">
              <img className="h-24 w-auto" src={logo} alt="LOGO" />
            </Link>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold">{title}</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary py-8 px-4 shadow sm:rounded-xl sm:px-10">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
