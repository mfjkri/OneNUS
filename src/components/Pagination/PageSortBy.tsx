import { Tooltip } from "@material-tailwind/react";

export type PageSortByProps = {
  activeSortOption: string;
  sortOptions: [string, string, string][];
  setSortOption: (newSortOption: string) => void;
};

/*
Adds sorting functionality. Allows user to apply sorting option.

Attributes:
  - sortOptions: [string, string, string][]
    Sort options available.
    [
      [sortOptionKey, displayed text, tooltip message on hover],
      ...
    ]
  
  - setSortOption: function [(newSortOption: string) => void]
    Callback function that is used to sort by the newSortOption.
  
  - activeSortOption: string
    Current sort option.
*/
export const PageSortBy = ({
  activeSortOption,
  sortOptions,
  setSortOption,
}: PageSortByProps) => {
  return (
    <div className="flex justify-center mt-1">
      <p className="mr-2 font-black">Sort by:</p>
      {sortOptions.map(([sortOption, sortText, sortDesc]) => (
        <Tooltip content={sortDesc} className="text-secondary" key={sortOption}>
          <p
            className={`mx-2 text-accent2 ${
              sortOption !== activeSortOption
                ? "hover:underline hover:text-secondary hover:cursor-pointer"
                : "underline font-bold hover:cursor-not-allowed"
            }`}
            onClick={() => setSortOption(sortOption)}
          >
            {sortText}
          </p>
        </Tooltip>
      ))}
    </div>
  );
};
