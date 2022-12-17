import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import { Button, Link } from "components/Elements";
import { ContentLayout } from "components/Layout";
import { CommentsThread } from "features/comments";
import { NotFound } from "features/misc";

import { PostView } from "../components/crud/PostView";

export const PostThread = () => {
  const { postId } = useParams();
  const parsedPostId = postId ? parseInt(postId) : undefined;

  if (!parsedPostId) {
    return <NotFound />;
  }

  return (
    <ContentLayout title="">
      <Link to="/app/posts">
        <Button
          startIcon={
            <ChevronLeftIcon className="w-auto h-4" aria-hidden="true" />
          }
          variant="no_bg_dark"
        >
          <p className="text-xl font-bold leading-tight">Back to posts</p>
        </Button>
      </Link>
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl p-7">
        <PostView postId={parsedPostId} />
      </div>
      <div className="px-6 py-5">
        <CommentsThread postId={parsedPostId} />
      </div>
    </ContentLayout>
  );
};
