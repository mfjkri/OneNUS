import { User } from "../types";
import { InfoTooltip } from "components/Elements/InfoTooltip";

export type UserStatisticsProps = {
  targetUser: User;
};

export const UserStatistics = ({ targetUser }: UserStatisticsProps) => {
  return (
    <div className="ml-2 text-lg w-full">
      <p className="text-xl">Username: {targetUser.username}</p>
      <p className="mt-1">Role: {targetUser.role}</p>
      <p className="mt-1">Bio: {targetUser.bio}</p>
      <div className="mt-1 flex flex-row">
        <p>Forum posts: {targetUser.postsCount}</p>
        <InfoTooltip
          infoText="Deleted posts are included in this count."
          tooltipPlacement="right-end"
        />
      </div>
      <p className="mt-1"></p>
      <div className="mt-1 flex flex-row">
        <p>Forum comments: {targetUser.commentsCount}</p>
        <InfoTooltip
          infoText="Deleted comments are included in this count."
          tooltipPlacement="right-end"
        />
      </div>
    </div>
  );
};
