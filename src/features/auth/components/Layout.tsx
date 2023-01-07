import * as React from "react";

import { Link } from "components/Elements";
import { Head } from "components/Head";
import { Footer } from "components/Layout";
import logo from "assets/logo.svg";
import { Tooltip } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

export type AuthAvatarPreviewProps = {
  username: string;
};

export const AuthAvatarPreview = ({ username }: AuthAvatarPreviewProps) => {
  username = username.toLowerCase();

  return username ? (
    <Tooltip
      content={
        <div className="flex flex-col bg-secondary dark:bg-primary rounded-3xl p-4 ml-12 border-primary2 border-2">
          <img
            src={`https://avatars.dicebear.com/api/micah/${username}.svg`}
            alt=""
            className="w-20 h-full"
          />
          <p className="m-auto">{username}</p>
          <p className="m-auto text-[8px] text-primary2 dark:text-secondary2">
            Avatar preview
          </p>
        </div>
      }
      placement="right"
    >
      <img
        src={`https://avatars.dicebear.com/api/micah/${username}.svg`}
        alt=""
        className="w-4 h-4"
      />
    </Tooltip>
  ) : (
    <UserIcon className="w-4 h-4" aria-hidden="true" />
  );
};

export type LayoutProps = {
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
