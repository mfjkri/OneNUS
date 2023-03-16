import { AuthRoutes } from "features/auth";
import { Landing } from "features/misc";
import { RSVPForm } from "features/rsvp";

export const publicRoutes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "/mhm",
    element: <RSVPForm />,
  },
];
