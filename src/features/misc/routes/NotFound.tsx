import { FaceFrownIcon } from "@heroicons/react/24/outline";

import logo from "assets/logo.svg";
import { Button, Link } from "components/Elements";

import { Head } from "components/Head";

export const NotFound = () => {
  return (
    <>
      <Head description="Not Found!" />
      <div className="h-[100vh] flex items-center text-secondary">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <img className="w-full my-3" src={logo} alt="react" />
          <div className="flex flex-row">
            <FaceFrownIcon
              className="h-12 w-auto my-auto mr-2"
              aria-hidden="true"
            />
            <h2 className="my-auto text-3xl font-extrabold sm:text-4xl">
              PAGE NOT FOUND!
            </h2>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link to="/">
                <Button>Go Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
