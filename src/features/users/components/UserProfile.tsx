import { useAuth } from "lib/auth";
import { useAppDispatch } from "hooks/typedRedux";
import { Posts, resetState } from "features/posts";
import { NotFound } from "features/misc";
import { ContentLayout } from "components/Layout";
import { BackButton, SpinnerWithBackground } from "components/Elements";
import { Timestamps } from "components/ThreadDrawer";

import { UserIcon } from "./UserIcon";
import { useUser } from "../api/getUser";

export type UserProfileProps = {
  userId: number;
};

export const UserProfile = ({ userId }: UserProfileProps) => {
  const dispatch = useAppDispatch();
  const userQuery = useUser({ userId: userId });
  const authUser = useAuth();

  if (userQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!userQuery.data || !authUser.user) return <NotFound />;

  const targetUser = userQuery.data;
  dispatch(resetState());

  return (
    <ContentLayout title="">
      <BackButton />
      <div className="bg-secondary dark:bg-primary text-primary dark:text-secondary shadow rounded-3xl p-8">
        <div className="flex flex-row h-fit">
          <UserIcon
            className="w-20 md:w-40 h-auto"
            userId={targetUser.id}
            username={targetUser.username}
          />
          <div className="ml-2 text-lg w-full">
            <p className="text-xl">Username: {targetUser.username}</p>
            <p className="mt-1">Role: {targetUser.role}</p>
            <p className="mt-1">Bio: {targetUser.bio}</p>
            <p className="mt-1">Forum posts: {targetUser.postsCount}</p>
            <p className="mt-1">Forum comments: {targetUser.commentsCount}</p>
          </div>
        </div>
        <Timestamps createdAt={targetUser.createdAt} createdText="joined" />
      </div>
      <div className="px-0 md:px-8">
        <div className="h-[1px] mt-12 mb-4 bg-secondary"></div>
        <p className="mx-2 mb-4 text-3xl">
          Viewing{" "}
          {authUser.user.username === targetUser.username ? (
            "your"
          ) : (
            <b>{targetUser.username}'s</b>
          )}{" "}
          posts ({targetUser.postsCount}
          ):
        </p>

        <div>
          <Posts
            filterUserId={userId}
            disableControls={targetUser.postsCount === 0}
          />
        </div>
      </div>
    </ContentLayout>
  );
};
