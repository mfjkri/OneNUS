type UserIconProps = {
  username: string;
  className?: string;
};

export const UserIcon = ({
  username,
  className = "w-4 h-4",
}: UserIconProps) => {
  return (
    <img
      src={`https://avatars.dicebear.com/api/micah/${username}.svg`}
      alt=""
      className={className}
    />
  );
};
