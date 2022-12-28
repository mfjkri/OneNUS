import { Route, Routes } from "react-router-dom";

import { NotFound } from "features/misc";

import { UserHomepage } from "./UserHomepage";

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path=":userId" element={<UserHomepage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
