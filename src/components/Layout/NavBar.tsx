import { Tooltip } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { Button, IconButton, Link } from "components/Elements";
import { useAuth } from "lib/auth";
import { UseMutateAsyncFunction } from "react-query";
import logo from "assets/logo.svg";

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

type LogoutButtonProps = {
  logout: UseMutateAsyncFunction<any, any, void, any>;
  isLoggingOut: boolean;
};

const LogoutButton = ({ logout, isLoggingOut }: LogoutButtonProps) => {
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

type UserProfileButtonProps = {
  id: number;
};

const UserProfileButton = ({ id }: UserProfileButtonProps) => {
  return (
    <Link to={`/app/users/${id}`}>
      <Tooltip content="View profile">
        <IconButton
          variant="text"
          icon={<UserCircleIcon className="w-full h-full" />}
        />
      </Tooltip>
    </Link>
  );
};

export const NavigationBar = () => {
  const authUser = useAuth();

  if (!authUser.user) return null;

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
          <LogoutButton
            logout={authUser.logout}
            isLoggingOut={authUser.isLoggingOut}
          />
          <UserProfileButton id={authUser.user?.id} />
        </div>
      </div>
    </nav>
  );
};
