import { useNavigate } from "react-router-dom";

import { ContentLayout } from "components/Layout";
import { useAppDispatch } from "hooks/typedRedux";

import { CreatePostForm } from "../components/crud/CreatePostForm";
import { resetState } from "../slices";

export const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <ContentLayout title="">
      <h2 className="text-center text-3xl font-extrabold">New Post</h2>
      <div className="bg-secondary dark:bg-primary mt-8 py-8 shadow rounded-3xl px-10">
        <CreatePostForm
          onSuccess={() => {
            dispatch(resetState());
            navigate("/app/posts");
          }}
        />
      </div>
    </ContentLayout>
  );
};
