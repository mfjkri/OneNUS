import clsx from "clsx";
import { StarIcon } from "@heroicons/react/24/outline";

import { useAppSelector } from "hooks/typedRedux";

import { Post } from "../../types";

export type StarPostProps = {
  post: Post;
};

export const StarPost = ({ post }: StarPostProps) => {
  // const { isOpen: isStarred, toggle } = useDisclosure(false);
  const starredPosts = useAppSelector((state) => state.users.starredPosts);
  const isStarred = starredPosts.includes(post.id);

  return (
    <div className="flex flex-col" onClick={() => {}}>
      <StarIcon
        className={clsx(
          "h-6 w-auto hover:fill-orange-400 hover:cursor-pointer",
          isStarred && "fill-orange-400"
        )}
      />
      <p className="text-center text-[12px]">{post.starsCount}</p>
    </div>
  );
};
