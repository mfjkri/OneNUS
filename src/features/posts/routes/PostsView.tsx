import { ContentLayout } from "components/Layout";

import { PostsList } from "../components/PostsList";

export const PostsView = () => {
  return (
    <ContentLayout title="Forum Posts:">
      <PostsList />
    </ContentLayout>
  );
};
