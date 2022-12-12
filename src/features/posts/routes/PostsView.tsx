import { PlusIcon } from "@heroicons/react/24/solid";

import { Button } from "components/Elements";
import { ContentLayout } from "components/Layout";

import { PostsList } from "../components/PostsList";

export const PostsView = () => {
  return (
    <ContentLayout title="">
      <Button
        className="mb-3"
        startIcon={<PlusIcon className="h-6 w-6" aria-hidden="true" />}
      >
        New Post
      </Button>
      <PostsList />
    </ContentLayout>
  );
};
