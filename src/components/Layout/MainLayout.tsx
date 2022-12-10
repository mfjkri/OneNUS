import * as React from "react";
// import { Link } from "react-router-dom";

// import logo from "assets/logo.svg";

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

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              {/* <UserNavigation /> */}
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
