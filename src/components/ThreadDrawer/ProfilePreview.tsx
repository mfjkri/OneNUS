import { Link } from "components/Elements";

import { UserIcon } from "features/users";

export type ProfilePreviewProps = {
  username: string;
  userTitle?: string;
  userId?: number;
  showProfileLink?: boolean;
  responsiveHide?: boolean;
  actionText?: string;
};

export const ProfilePreview = ({
  username,
  userTitle,
  userId,
  showProfileLink = false,
  responsiveHide = false,
}: ProfilePreviewProps) => {
  return (
    <div
      className={
        responsiveHide
          ? "max-w-0 md:min-w-[124px] invisible md:visible flex flex-col mr-0 md:mr-4"
          : "min-w-[124px] flex flex-col mr-4"
      }
    >
      <UserIcon className="w-auto h-auto" username={username} />
      <p className=" break-all text-center">{username}</p>
      {userTitle && (
        <p className="text-[10px] text-center font-bold text-green-600 dark:text-green-600">
          {userTitle}
        </p>
      )}
      {showProfileLink && (
        <Link to={`/app/users/${userId}`} className="text-sm mx-auto mt-1">
          View profile
        </Link>
      )}
    </div>
  );
};

export const InlineProfilePreview = ({
  userId,
  username,
  userTitle,
  actionText = "Action by",
}: ProfilePreviewProps) => {
  return (
    <div className="visible md:invisible h-fit md:h-0 flex flex-row">
      <p className="text-primary2 dark:text-secondary2">
        {actionText} <Link to={`/app/users/${userId}`}>{username}</Link>
      </p>
      {userTitle && (
        <p className="text-[14px] ml-2 text-green-600 dark:text-green-600">
          ({userTitle})
        </p>
      )}
    </div>
  );
};
