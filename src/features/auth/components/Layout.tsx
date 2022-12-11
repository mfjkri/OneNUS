import * as React from "react";

import logo from "assets/logo.svg";
import { Link } from "components/Elements";
import { Head } from "components/Head";

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
          <div className="bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
          <p className="text-center">
            <u>Max 12 characters</u> for username and password!
          </p>
        </div>
      </div>
    </>
  );
};
