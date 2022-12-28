import { ContentLayout } from "components/Layout";

import { Posts } from "../components/Posts";

export const PostsThread = () => {
  return (
    <ContentLayout title="">
      <Posts filterUserId={0} />
    </ContentLayout>
  );
};
