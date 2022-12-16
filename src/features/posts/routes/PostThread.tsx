import { useParams } from "react-router-dom";

import { ContentLayout } from "components/Layout";

import { PostView } from "../components/PostView";

export const PostThread = () => {
  const { postId } = useParams();
  if (!postId) {
    return null;
  }

  return (
    <ContentLayout title="">
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl p-7">
        <PostView postId={postId} />
      </div>
    </ContentLayout>
  );
};
