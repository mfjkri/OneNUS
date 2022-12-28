import { Route, Routes } from "react-router-dom";

import { NotFound } from "features/misc";

import { PostsThread } from "./PostsThread";
import { PostThread } from "./PostThread";
import { NewPost } from "./New";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewPost />} />
      <Route path=":postId" element={<PostThread />} />
      <Route path="" element={<PostsThread />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
