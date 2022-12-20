import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import { Button, Link, SpinnerWithBackground } from "components/Elements";
import { ContentLayout } from "components/Layout";
import { NotFound } from "features/misc";
import { CommentsThread } from "features/comments";

import { useAuth } from "lib/auth";

import { ReadPost } from "../components/crud/ReadPost";
import { usePost } from "../api/getPost";

export const PostThread = () => {
  const { postId } = useParams();
  const { user } = useAuth();
  const parsedPostId = postId ? parseInt(postId) : 0;
  const postQuery = usePost({ postId: parsedPostId });

  if (postQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!postQuery.data || !user) {
    return <NotFound />;
  }

  return (
    <ContentLayout title="">
      <Link to="/app/posts">
        <Button
          variant="text"
          startIcon={
            <ChevronLeftIcon className="w-auto h-4" aria-hidden="true" />
          }
        >
          <p className="text-xl font-bold leading-tight">Back to posts</p>
        </Button>
      </Link>
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl p-7">
        <ReadPost
          user={user}
          post={postQuery.data}
          refetch={postQuery.refetch}
        />
      </div>
      <div className="px-6 py-5">
        <CommentsThread post={postQuery.data} />
      </div>
    </ContentLayout>
  );
};
