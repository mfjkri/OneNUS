import { useParams } from "react-router-dom";

import { useAuth } from "lib/auth";
import { useAppDispatch } from "hooks/typedRedux";
import { useDisclosure } from "hooks/useDisclosure";
import { PostsList, resetState } from "features/posts";
import { NotFound } from "features/misc";
import { ContentLayout } from "components/Layout";
import { BackButton, Button, SpinnerWithBackground } from "components/Elements";
import { Timestamps } from "components/ThreadDrawer";

import { UserIcon } from "../components/UserIcon";
import { UpdateBioForm } from "../components/UpdateBioForm";
import { DeleteUser } from "../components/DeleteUser";
import { useUser } from "../api/getUser";
import { UserStatistics } from "../components/UserStatistics";

export const User = () => {
  const { userId } = useParams();
  const targetUserId = parseInt(userId || "");

  const dispatch = useAppDispatch();
  const userQuery = useUser({ userId: targetUserId });
  const authUser = useAuth();
  const { isOpen: isEditMode, toggle: toggleEditMode } = useDisclosure(false);

  if (userQuery.isLoading) {
    return <SpinnerWithBackground size="lg" />;
  }

  if (!userQuery.data || !authUser.user) return <NotFound />;

  const targetUser = userQuery.data;
  const isOwnProfile = targetUser.id === authUser.user.id;

  // Reset PostsState (we want to reset pageNumber back to 1)
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

          <div className="grow">
            {isEditMode ? (
              <UpdateBioForm
                currentBio={targetUser.bio}
                onSuccess={toggleEditMode}
                onCancel={toggleEditMode}
              />
            ) : (
              <div>
                <UserStatistics targetUser={targetUser} />

                {/* Only show User controls if they are viewing their own profile */}
                {isOwnProfile && (
                  <div className="flex flex-row mt-4">
                    <Button className="ml-2" onClick={toggleEditMode}>
                      Update Bio
                    </Button>

                    <DeleteUser />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Timestamps createdAt={targetUser.createdAt} createdText="joined" />
      </div>

      <div className="px-0 md:px-8">
        <div className="h-[1px] mt-12 mb-4 bg-secondary"></div>
        <p className="mx-2 mb-4 text-3xl">
          Viewing {isOwnProfile ? "your" : <b>{targetUser.username}'s</b>} posts
          ({targetUser.postsCount}
          ):
        </p>

        <div>
          <PostsList
            filterUserId={targetUserId}
            disableControls={targetUser.postsCount === 0}
          />
        </div>
      </div>
    </ContentLayout>
  );
};
