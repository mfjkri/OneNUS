import { Route, Routes } from "react-router-dom";

import { NotFound } from "features/misc";

import { PostsView } from "./PostsView";

export const PostsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PostsView />} />
      {/* <Route path=":discussionId" element={<Discussion />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
