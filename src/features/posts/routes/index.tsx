import { Route, Routes } from "react-router-dom";

import { NotFound } from "features/misc";

import { PostsView } from "./PostsView";
import { NewPost } from "./NewPost";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewPost />} />
      <Route path="" element={<PostsView />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
