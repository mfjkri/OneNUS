import { StarIcon } from "@heroicons/react/24/outline";

export const StarPost = ({ starsCount }: { starsCount: number }) => {
  return (
    <div className="flex flex-col">
      <StarIcon className="h-6 w-auto hover:fill-orange-400 hover:cursor-pointer" />
      <p className="text-center text-[12px]">{starsCount}</p>
    </div>
  );
};
