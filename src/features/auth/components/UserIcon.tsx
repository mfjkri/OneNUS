type UserIconProps = {
  username: string;
  userId: number;
  className?: string;
  gender?: string;
};

export const UserIcon = ({
  username,
  gender = "male",
  className = "w-4 h-4",
}: UserIconProps) => {
  return (
    <img
      src={`https://avatars.dicebear.com/api/${gender}/${username}.svg`}
      className={className}
    />
  );
};
