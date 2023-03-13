import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "components/Elements";
import { MainLayout } from "components/Layout";
import { lazyImport } from "utils/lazyImport";

const { Overview } = lazyImport(() => import("features/misc"), "Overview");

const { PostsRoutes } = lazyImport(
  () => import("features/posts"),
  "PostsRoutes"
);

const { UsersRoutes } = lazyImport(
  () => import("features/users"),
  "UsersRoutes"
);

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "posts/*", element: <PostsRoutes /> },
      { path: "users/*", element: <UsersRoutes /> },
      { path: "", element: <Overview /> },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
