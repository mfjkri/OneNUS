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
        <p>OneNUS is the one-stop place for you to hangout!</p>
        <br />
        <p>Before you begin, do give the rules below a read.</p>
        <br />
        <p className="font-extrabold underline">Rules:</p>
        <ul className="pl-8 list-disc">
          <li>Do not post any inappropriate content.</li>
          <li>Be nice to everyone.</li>
          <li>Have fun!! 🤩🤩</li>
        </ul>
        <br />
        <p className="text-sm underline">
          Note that this website is not affiliated with NUS in any way.
        </p>
      </div>
      <div className="ml-3 inline-flex">
        <Link to="/posts">
          <Button size="lg">Proceed</Button>
        </Link>
      </div>
    </ContentLayout>
  );
};
