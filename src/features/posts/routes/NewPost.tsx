import { useNavigate } from "react-router-dom";

import { ContentLayout } from "components/Layout";
import { NewPostForm } from "../components/NewPostForm";

export const NewPost = () => {
  const nagivate = useNavigate();

  return (
    <ContentLayout title="">
      <h2 className="text-center text-3xl font-extrabold">New Post</h2>
      <div className="bg-secondary mt-8 py-8 shadow rounded-lg px-10">
        <NewPostForm
          onSuccess={() => {
            nagivate("/app/posts");
          }}
        />
      </div>
    </ContentLayout>
  );
};
