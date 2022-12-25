import {
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import * as React from "react";

import { Button, Link } from "components/Elements";

import logo from "assets/logo.svg";
import { useAuth } from "lib/auth";

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
      <div className="flex flex-row px-3">
        <Link to="/app/posts" className="flex items-center hover:opacity-60">
          <img src={logo} className="h-6 mr-2 sm:h-9" alt="OneNUS" />
          <span className="invisible md:visible self-center text-xl font-semibold whitespace-nowrap text-white">
            OneNUS
          </span>
        </Link>
        <div className="grow"></div>
        <div className="flex md:order-2 h-auto">
          <NewPostButton />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer>
      <div className="bg-primary p-4 mt-28 border-t border-primary2 text-primary dark:text-secondary">
        <div className="flex flex-col items-center content-center">
          <a
            href="https://github.com/mfjkri/oneNUS"
            className="my-auto hover:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-secondary">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <div className="mt-2 text-sm text-gray-500">
            <i>A webforum designed with simplicity in mind.</i>
          </div>
          <div className="">OneNUS © | CVWO 22/23 Winter Assignment</div>
        </div>
      </div>
    </footer>
  );
};

export type MainLayoutProps = {
  children: React.ReactNode;
};

/*
Standardized parent layout for all components in protected routes.

Attributes:
  - children: ReactNode
    Children nodes contained in the MainLayout.
*/
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="min-h-screen flex overflow-hidden">
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
      <Footer />
    </>
  );
};
