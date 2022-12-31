import { ContentLayout } from "components/Layout";

import { PostsList } from "../components/Posts/PostsList";

export const Posts = () => {
  return (
    <ContentLayout title="">
      <PostsList filterUserId={0} />
    </ContentLayout>
  );
};
