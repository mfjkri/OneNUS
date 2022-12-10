import * as React from "react";

import { Button, Link } from "components/Elements";

import logo from "assets/logo.svg";
import { useAuth } from "lib/auth";

// const Logo = () => {
//   return (
//     <Link className="flex items-center text-white" to=".">
//       <img className="h-8 w-auto" src={logo} alt="Workflow" />
//       <span className="text-xl text-white font-semibold">
//         Bulletproof React
//       </span>
//     </Link>
//   );
// };

type MainLayoutProps = {
  children: React.ReactNode;
};

const NavigationBar = () => {
  const { logout, isLoggingOut } = useAuth();

  return (
    <nav className="px-2 sm:px-4 py-2.5 bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/app" className="flex items-center">
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            OneNUS
          </span>
        </Link>
        <div className="flex md:order-2">
          <Button
            isLoading={isLoggingOut}
            onClick={async () => {
              await logout();
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
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
