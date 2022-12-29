import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ContentLayout } from "components/Layout";
import { useAppDispatch } from "hooks/typedRedux";

import { CreatePostForm } from "../components/crud/CreatePostForm";
import { resetState } from "../slice";

export const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSuccess = useCallback(() => {
    dispatch(resetState());
    navigate("/app/posts");
  }, [navigate, dispatch]);

  return (
    <ContentLayout title="">
      <h2 className="text-center text-3xl font-extrabold">New Post</h2>
      <div className="bg-secondary dark:bg-primary mt-8 py-8 shadow rounded-3xl px-10">
        <CreatePostForm onSuccess={onSuccess} />
      </div>
    </ContentLayout>
  );
};
