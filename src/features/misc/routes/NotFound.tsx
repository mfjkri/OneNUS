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
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block mt-4">PAGE NOT FOUND!</span>
          </h2>

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
