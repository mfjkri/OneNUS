import { Route, Routes } from "react-router-dom";

import { NotFound } from "features/misc";

import { User } from "./User";

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path=":userId" element={<User />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
