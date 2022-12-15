import { useRoutes } from "react-router-dom";

import { Landing, NotFound } from "features/misc";
import { useAuth } from "lib/auth";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

/*
Routes are separated into either public or protected
Protected routes require User authentication to access (handled by AuthProvider)

For both protected and public routes, this global routes only 
route to feature root subdirectory:
    e.g.    {...}.com/some-feature

Further sub-routing are managed by the feature itself:
    e.g.    /src/features/some-feature/routes/
*/

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: "/", element: <Landing /> }];
  const fallbackRoute = [{ path: "*", element: <NotFound /> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes, ...fallbackRoute]);

  return <>{element}</>;
};
