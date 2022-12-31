import { useCallback } from "react";
import { useParams } from "react-router-dom";

import { BackButton, SpinnerWithBackground } from "components/Elements";
import { ContentLayout } from "components/Layout";
import { NotFound } from "features/misc";
import { Comments } from "features/comments";
import { AuthUser } from "features/auth";
import { useAuth } from "lib/auth";

import { PostView } from "../components/Post/PostView";
import { usePost } from "../api/getPost";

type ValidPostProps = {
  postId: number;
  user: AuthUser;
};

const ValidPost = ({ postId, user }: ValidPostProps) => {
  const postQuery = usePost({ postId: postId });
  const refetchQuery = useCallback(
    () => postQuery.refetch,
    [postQuery.refetch]
  );

  if (postQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!postQuery.data) {
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

export const Post = () => {
  const { postId } = useParams();
  const { user } = useAuth();

  const parsedPostId = postId ? parseInt(postId) : 0;
  const targetPostId = parsedPostId && parsedPostId > 0 ? parsedPostId : -1;

  // Display ValidPost is postId is a valid number else NotFound
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
