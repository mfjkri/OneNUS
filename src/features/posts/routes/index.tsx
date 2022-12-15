import { Route, Routes } from "react-router-dom";

import { NotFound } from "features/misc";

import { Posts } from "./Posts";
import { PostThread } from "./PostThread";
import { NewPost } from "./NewPost";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<NewPost />} />
      <Route path=":postId" element={<PostThread />} />
      <Route path="" element={<Posts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
