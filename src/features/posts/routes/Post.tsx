import { useParams } from "react-router-dom";

import { Spinner } from "components/Elements";

import { usePost } from "../api/getPost";
import { ContentLayout } from "components/Layout";
import { PostView } from "../components/PostView";

export const Post = () => {
  const { postId } = useParams();
  const postQuery = usePost({ postId });

  if (postQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!postQuery.data) {
    return null;
  }

  return (
    <ContentLayout title="">
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl p-7">
        <PostView post={postQuery.data} />
      </div>
    </ContentLayout>
  );
};
