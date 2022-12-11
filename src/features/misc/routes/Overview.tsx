import { useNavigate } from "react-router";

import { Button } from "components/Elements";
import { ContentLayout } from "components/Layout";

import { useAuth } from "lib/auth";

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
          Welcome <u>{user?.username}</u>
        </h1>
        <p className="mb-4">To begin, press the button below:</p>
        <div className="ml-3 inline-flex">
          <Button onClick={proceedToDiscussion}>Proceed</Button>
        </div>
      </div>
    </ContentLayout>
  );
};
