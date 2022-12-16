import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import { Button, Link } from "components/Elements";
import { ContentLayout } from "components/Layout";
import { CommentsList } from "features/comments";

import { PostView } from "../components/PostView";

export const PostThread = () => {
  const { postId } = useParams();
  if (!postId) {
    return null;
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
        <PostView postId={parseInt(postId)} />
      </div>
      <div className="ml-5 mt-5">
        <CommentsList />
      </div>
    </ContentLayout>
  );
};
