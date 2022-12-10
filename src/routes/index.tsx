import { useRoutes } from "react-router-dom";

import { Landing, NotFound } from "features/misc";
import { useAuth } from "lib/auth";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: "/", element: <Landing /> }];
  const fallbackRoute = [{ path: "*", element: <NotFound /> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes, ...fallbackRoute]);

  return <>{element}</>;
};
