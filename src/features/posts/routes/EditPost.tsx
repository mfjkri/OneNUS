import { useNavigate, useParams } from "react-router-dom";

import { ContentLayout } from "components/Layout";
import { EditPostForm } from "../components/EditPostForm";

export const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  return (
    <ContentLayout title="">
      <h2 className="text-center text-3xl font-extrabold">Editing Post</h2>
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary mt-8 shadow rounded-3xl p-7">
        <EditPostForm
          postId={postId}
          onSuccess={() => {
            navigate("/app/posts");
          }}
        />
      </div>
    </ContentLayout>
  );
};
