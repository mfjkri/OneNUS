import { useCallback } from "react";
import { useParams } from "react-router-dom";

import { BackButton, SpinnerWithBackground } from "components/Elements";
import { ContentLayout } from "components/Layout";
import { NotFound } from "features/misc";
import { Comments } from "features/comments";
import { useAuth } from "lib/auth";

import { PostView } from "../components/Post/PostView";
import { usePost } from "../api/getPost";

export const Post = () => {
  const { postId } = useParams();
  const postQuery = usePost({ postId: parseInt(postId || "") });
  const { user } = useAuth();

  const refetchQuery = useCallback(
    () => postQuery.refetch,
    [postQuery.refetch]
  );

  if (postQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!postQuery.data || !user) {
    return <NotFound />;
  }

  window.scrollTo(0, 0);

  return (
    <ContentLayout title="">
      <BackButton />

      {/* Display Post */}
      <PostView user={user} post={postQuery.data} refetchPost={refetchQuery} />

      {/* Display Post's Comments */}
      <div className="px-2 md:px-6 py-5">
        <Comments user={user} post={postQuery.data} />
      </div>
    </ContentLayout>
  );
};
