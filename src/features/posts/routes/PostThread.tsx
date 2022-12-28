import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import { Button, Link, SpinnerWithBackground } from "components/Elements";
import { ContentLayout } from "components/Layout";
import { NotFound } from "features/misc";
import { Comments } from "features/comments";
import { AuthUser } from "features/auth";
import { useAuth } from "lib/auth";

import { ReadPost } from "../components/crud/ReadPost";
import { usePost } from "../api/getPost";

type ValidPostProps = {
  postId: number;
  user: AuthUser;
};

const ValidPost = ({ postId, user }: ValidPostProps) => {
  const navigate = useNavigate();
  const postQuery = usePost({ postId: postId });

  if (postQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!postQuery.data) {
    return <NotFound />;
  }

  return (
    <ContentLayout title="">
      <Button
        variant="text"
        startIcon={
          <ChevronLeftIcon className="w-auto h-4" aria-hidden="true" />
        }
        onClick={() => navigate(-1)}
      >
        <p className="text-xl font-bold leading-tight">Back to posts</p>
      </Button>
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl p-7">
        <ReadPost
          user={user}
          post={postQuery.data}
          refetch={postQuery.refetch}
        />
      </div>
      <div className="px-2 md:px-6 py-5">
        <Comments user={user} post={postQuery.data} />
      </div>
    </ContentLayout>
  );
};

export const PostThread = () => {
  const { postId } = useParams();
  const { user } = useAuth();

  const parsedPostId = postId ? parseInt(postId) : 0;
  // Check for any invalid postIds
  const targetPostId = parsedPostId && parsedPostId > 0 ? parsedPostId : -1;

  return (
    <>
      {!user || targetPostId === -1 ? (
        <NotFound />
      ) : (
        <ValidPost postId={targetPostId} user={user} />
      )}
    </>
  );
};
