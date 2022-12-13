import { PlusIcon } from "@heroicons/react/24/solid";

import { Button } from "components/Elements";
import { ContentLayout } from "components/Layout";

import { PostsList } from "../components/PostsList";

export const PostsView = () => {
  return (
    <ContentLayout title="">
      <div className="float-right">
        <Button
          className="mb-3 text-sm"
          startIcon={<PlusIcon className="h-4 w-4" aria-hidden="true" />}
        >
          New Post
        </Button>
      </div>
      <div className="clear-both">
        <PostsList perPage={10} pageNumber={1} sortBy="byHot" filterTag="-" />
      </div>
    </ContentLayout>
  );
};
