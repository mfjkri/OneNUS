import { AuthRoutes } from "features/auth";
import { Landing } from "features/misc";

export const publicRoutes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
