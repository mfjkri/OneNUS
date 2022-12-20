import {
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import * as React from "react";

import { Button, Link } from "components/Elements";

import logo from "assets/logo.svg";
import { useAuth } from "lib/auth";

type MainLayoutProps = {
  children: React.ReactNode;
};

const NewPostButton = () => {
  return (
    <Link to="/app/posts/new">
      <Button
        className="mr-2 h-full"
        startIcon={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
      >
        New Post
      </Button>
    </Link>
  );
};

const LogoutButton = () => {
  const { logout, isLoggingOut } = useAuth();

  return (
    <Button
      variant="text"
      isLoading={isLoggingOut}
      endIcon={
        <ArrowRightOnRectangleIcon className="h-6 w-auto" aria-hidden="true" />
      }
      onClick={async () => {
        await logout();
      }}
    >
      Log out
    </Button>
  );
};

const NavigationBar = () => {
  return (
    <nav className="px-2 sm:px-4 py-2.5 bg-primary fixed w-full z-20 top-0 left-0 border-b border-primary2">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/app/posts" className="flex items-center">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="invisible md:visible self-center text-xl font-semibold whitespace-nowrap text-white">
            OneNUS
          </span>
        </Link>
        <div className="flex md:order-2 h-auto">
          <NewPostButton />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen flex overflow-hidden">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16">
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <NavigationBar />
            </div>
          </div>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};
