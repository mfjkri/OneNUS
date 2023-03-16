import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import { Button } from "components/Elements";
import { Head } from "components/Head";
import { Footer } from "components/Layout";
import { addNotification } from "components/Notifications";
import { useAppDispatch } from "hooks/typedRedux";

export const RSVPForm = () => {
  const [accepted, setAccepted] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <>
      <Head description="Welcome to OneNUS" />
      <div className="h-[100vh] flex items-center text-secondary">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          {!accepted ? (
            <>
              {" "}
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                <span className="block">Invitation</span>
              </h2>
              <h3 className="text-xl font-extrabold tracking-tight sm:text-xl my-3">
                <span>Welcome im sad 😔😔</span>
              </h3>
              <p>You have been cordially invited. Press Yes or No to rsvp.</p>
              <div className="mt-8 flex justify-center">
                <Button
                  color="blue"
                  className="w-1/3"
                  onClick={() => {
                    dispatch(
                      addNotification({
                        type: "success",
                        title: "BLUBLUBLBU",
                        message: "WHEEE YAY",
                      })
                    );

                    setTimeout(() => {
                      setAccepted(true);
                    }, 1000);
                  }}
                  startIcon={
                    <ArrowTopRightOnSquareIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  }
                >
                  Yes
                </Button>
                <Button
                  color="red"
                  className="ml-3 w-1/3"
                  onClick={() => {
                    dispatch(
                      addNotification({
                        type: "error",
                        title: "ERRRORRRR",
                        message: "You cannot reject",
                      })
                    );
                  }}
                >
                  No
                </Button>
              </div>{" "}
            </>
          ) : (
            <p>WHEEEEEEEEE</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
