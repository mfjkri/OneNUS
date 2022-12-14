import { useAuth } from "lib/auth";

import { Button, Link } from "components/Elements";
import { ContentLayout } from "components/Layout";

export const Overview = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="">
      <h1 className="font-extrabold text-4xl mb-4">
        Welcome <u>{user?.username}</u>!
      </h1>
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary rounded-3xl w-full p-4 mb-5">
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
        <Link to="/app/posts">
          <Button>Proceed</Button>
        </Link>
      </div>
    </ContentLayout>
  );
};
