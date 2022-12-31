import clsx from "clsx";
import { StarIcon } from "@heroicons/react/24/outline";

import { useDisclosure } from "hooks/useDisclosure";

export type StarPostProps = {
  starsCount: number;
};

export const StarPost = ({ starsCount }: StarPostProps) => {
  const { isOpen: isStarred, toggle } = useDisclosure(false);

  return (
    <div className="flex flex-col" onClick={toggle}>
      <StarIcon
        className={clsx(
          "h-6 w-auto hover:fill-orange-400 hover:cursor-pointer",
          isStarred && "fill-orange-400"
        )}
      />
      <p className="text-center text-[12px]">
        {isStarred ? starsCount + 1 : starsCount}
      </p>
    </div>
  );
};
