import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { PencilIcon } from "@heroicons/react/24/solid";

import { useAuth } from "lib/auth";
import { useAppDispatch } from "hooks/typedRedux";
import { useDisclosure } from "hooks/useDisclosure";
import { PostsList, resetState } from "features/posts";
import { NotFound } from "features/misc";
import { ContentLayout } from "components/Layout";
import {
  BackButton,
  IconButton,
  SpinnerWithBackground,
} from "components/Elements";
import { InfoTooltip } from "components/Elements";
import { Timestamps } from "components/ThreadDrawer";

import { UserIcon } from "../components/UserIcon";
import { UpdateBioForm } from "../components/UpdateBioForm";
import { DeleteUser } from "../components/DeleteUser";
import { useUser } from "../api/getUser";

type UserStatisticsProps = {
  statTitle: string;
  statValue: any;
  statInfoTooltip?: ReactNode;
  className?: string;
};

const UserStatistics = ({
  statTitle,
  statValue,
  statInfoTooltip,
  className = "",
}: UserStatisticsProps) => {
  return (
    <div className="flex flex-row">
      <p className={clsx("mt-1", className)}>
        {statTitle}: {statValue}
      </p>
      {statInfoTooltip && statInfoTooltip}
    </div>
  );
};

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

          <>
            {isEditMode ? (
              <div className="grow">
                <UpdateBioForm
                  currentBio={targetUser.bio}
                  onSuccess={toggleEditMode}
                  onCancel={toggleEditMode}
                />
              </div>
            ) : (
              <div className="w-fit">
                <div className="ml-2 text-lg w-full">
                  <UserStatistics
                    statTitle="Username"
                    statValue={targetUser.username}
                    className={"text-xl"}
                  />
                  <UserStatistics
                    statTitle="Role"
                    statValue={targetUser.role}
                  />
                  <UserStatistics
                    statTitle="Bio"
                    statValue={targetUser.bio}
                    statInfoTooltip={
                      isOwnProfile && (
                        <InfoTooltip
                          infoText="Edit bio"
                          customDisplay={
                            <IconButton
                              onClick={toggleEditMode}
                              icon={
                                <PencilIcon className="w-full h-full text-blue-700" />
                              }
                              className="w-5 h-5 ml-1"
                              variant="text"
                              toolTip="Edit bio"
                            />
                          }
                          placement="right-end"
                        />
                      )
                    }
                    className={"whitespace-normal break-all"}
                  />
                  <UserStatistics
                    statTitle="Forum posts"
                    statValue={targetUser.postsCount}
                    statInfoTooltip={
                      <InfoTooltip
                        infoText="Deleted posts are included in this count."
                        placement="right-end"
                      />
                    }
                  />
                  <UserStatistics
                    statTitle="Forum comments"
                    statValue={targetUser.commentsCount}
                    statInfoTooltip={
                      <InfoTooltip
                        infoText="Deleted comments are included in this count."
                        placement="right-end"
                      />
                    }
                  />
                </div>

                {/* Only show User controls if they are viewing their own profile */}
                {isOwnProfile && (
                  <div className="mt-4">
                    <DeleteUser />
                  </div>
                )}
              </div>
            )}
          </>
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
