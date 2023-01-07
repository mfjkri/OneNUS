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
import { ProfilePreview, Timestamps } from "components/ThreadDrawer";

import { UpdateBioForm } from "../components/UpdateBioForm";
import { DeleteUser } from "../components/DeleteUser";
import { useUser } from "../api/getUser";

type UserStatisticsProps = {
  statValue: any;
  statTitle?: string;
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
    <div className={clsx("mt-1 flex flex-row", className)}>
      <p>
        {statTitle && `${statTitle}: `}
        {statValue}
      </p>
      <div className="float-right">{statInfoTooltip && statInfoTooltip}</div>
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
          <ProfilePreview
            username={targetUser.username}
            userTitle={targetUser.role}
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
                  <div className="flex flex_row">
                    <p className="mr-2">Status: </p>
                    <div
                      className={clsx(
                        "flex flex-row bg-secondary2 dark:bg-primary2 rounded-lg pl-2",
                        !isOwnProfile && "pr-2"
                      )}
                    >
                      <p className="whitespace-normal break-all italic">
                        {targetUser.bio}
                      </p>
                      {isOwnProfile && (
                        <InfoTooltip
                          infoText="Edit bio"
                          customDisplay={
                            <IconButton
                              onClick={toggleEditMode}
                              icon={<PencilIcon className="w-full h-full" />}
                              className="w-5 h-5 ml-2 my-auto"
                              variant="text"
                              tooltip="Edit bio"
                            />
                          }
                          placement="right-end"
                        />
                      )}
                    </div>
                  </div>

                  <br />

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

                {/* Only show Delete Control for own profile */}
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
