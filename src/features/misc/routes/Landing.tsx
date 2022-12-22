import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import logo from "assets/logo.svg";
import { Button } from "components/Elements";

import { Head } from "components/Head";
import { useAuth } from "lib/auth";

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  });

  const redirectLogin = () => {
    if (user) {
      navigate("/app");
    } else {
      window.location.assign("/auth/login");
      // navigate("/auth/login");
    }
  };

  const redirectRegister = () => {
    if (user) {
      navigate("/app");
    } else {
      window.location.assign("/auth/register");
      // navigate("/auth/register");
    }
  };

  return (
    <>
      <Head description="Welcome to OneNUS" />
      <div className="h-[100vh] flex items-center text-secondary">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">OneNUS</span>
          </h2>
          <img className="w-full my-3" src={logo} alt="react" />

          <p>Welcome to OneNUS. Please login or register to continue.</p>
          <div className="mt-8 flex justify-center">
            <Button
              color="blue"
              onClick={redirectLogin}
              className="w-1/3"
              startIcon={
                <ArrowTopRightOnSquareIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              }
            >
              Login
            </Button>
            <Button
              color="white"
              className="ml-3 w-1/3"
              onClick={redirectRegister}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
