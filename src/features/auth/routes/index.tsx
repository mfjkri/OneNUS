import { Route, Routes } from "react-router-dom";

import { NotFound } from "features/misc";

import { Login } from "./Login";
import { Register } from "./Register";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
