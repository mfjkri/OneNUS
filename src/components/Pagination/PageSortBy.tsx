import { Tooltip } from "@material-tailwind/react";
import { Button } from "components/Elements";

type PageSortByProps = {
  sortOptions: [string, string, string][];
  setSortOption: Function;
  activeSortOption: string;
};

export const PageSortBy = ({
  sortOptions,
  setSortOption,
  activeSortOption,
}: PageSortByProps) => {
  return (
    <div className="flex justify-center mb-1">
      <p className="mr-2 font-black">Sort by:</p>
      {sortOptions.map(([sortOption, sortText, sortDesc]) => (
        <Tooltip content={sortDesc} className="text-secondary">
          <p
            className={`mx-2 text-accent2 ${
              sortOption !== activeSortOption
                ? "hover:underline hover:text-secondary hover:cursor-pointer"
                : "underline font-bold hover:cursor-not-allowed"
            }`}
            key={sortOption}
            onClick={() => setSortOption(sortOption)}
          >
            {sortText}
          </p>
        </Tooltip>
      ))}
    </div>
  );
};
