import { useParams } from "react-router-dom";

import { NotFound } from "features/misc";

import { UserProfile } from "../components/UserProfile";

export const UserHomepage = () => {
  const { userId } = useParams();
  const parsedUserId = userId ? parseInt(userId) : 0;
  // Check for any invalid postIds
  const targetUserId = parsedUserId && parsedUserId > 0 ? parsedUserId : -1;

  return (
    <>
      {targetUserId === -1 ? (
        <NotFound />
      ) : (
        <UserProfile userId={targetUserId} />
      )}
    </>
  );
};
