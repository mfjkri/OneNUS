import { useNavigate } from "react-router";

import { useAuth } from "lib/auth";

import { Button } from "components/Elements";
import { ContentLayout } from "components/Layout";

export const Overview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const proceedToDiscussion = () => {
    if (user) {
      navigate("posts/");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <ContentLayout title="">
      <div className="text-secondary">
        <div className="bg"></div>
        <h1 className="text-secondary font-extrabold text-4xl mb-4">
          Welcome <u>{user?.username}</u>!
        </h1>
        <div className="bg-primary rounded-3xl w-full p-4 mb-5">
          <p>oneNUS is the one-stop place for you to hangout!</p>
          <br />
          <p>
            Before you begin, do <u>read through the rules</u> below.
          </p>
          <br />
          <p className="font-extrabold underline">Rules:</p>
          <ul className="pl-8 list-disc">
            <li>
              <u>No</u> illegal content or materials.
            </li>
            <li>Be nice to everyone! 😁</li>
          </ul>
          <br />
          <p>Note that this website is not afflicated with NUS in any other.</p>
          <p>
            By proceeding, you are doing so at <b>YOUR OWN RISK!!</b>
          </p>
        </div>
        <div className="ml-3 inline-flex">
          <Button onClick={proceedToDiscussion}>Proceed</Button>
        </div>
      </div>
    </ContentLayout>
  );
};
